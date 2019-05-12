##############################################################################
#DESCRIPTION
##############################################################################

#Program loads the current xml database and modifies all filename fields according to patern Suburb_LocationNumber_GraffitiNumber

##############################################################################
#INPUT VARIABLES THAT MAY BE MODIFIED
##############################################################################

#Relative paths to folders with photos, data and archived data
path_data = 'data/data.xml';
path_archive ='data/archive';

##############################################################################
#LIBRARIES
##############################################################################

#Operating on images
import PIL.Image
#Dealing with folder structure
import os
import os.path
#Operating on XML files
from lxml import etree
#Getting current date and time
import time

##############################################################################
#CODE
##############################################################################

#Get the database from XML file to variable 'data'
parser = etree.XMLParser(remove_blank_text=True);
data = etree.parse(os.path.join('..',path_data),parser);

#Before any modifications make a copy of the current version of database in the folder specified by path_archive
archiveFile = open(os.path.join('..',path_archive+'/date_'+time.strftime("%Y_%m_%d_time_%H_%M_%S")+'.xml'), 'w');
data.write(archiveFile, pretty_print=True)

#Get the root element (graffiti_list) of the xml database
graffiti_list_xml = data.getroot();

last_suburb="";

#For every graffiti in the database:
for element in data.getiterator("graffiti"):  
    current_suburb=element.findtext("suburb"); #Get the suburb of the current 'graffiti'
    current_file_name=element.findtext("file_name"); #Get the filename of the current 'graffiti'
    current_full_path=element.findtext("full_path"); #Get the full path of the current 'graffiti'
    
    image_no_text="";	
    if current_file_name[-7]=="_": #If the graffiti belongs to a set of graffitis with the same location number
        image_no_text=current_file_name[-7:-4]; #Then get the image number for this location 
	
	#Take care of proper numbering of locations and images, and the names of the suburbs
    if current_suburb==last_suburb:
        if image_no_text=="":
	        place_no=place_no+1;
    else:
        place_no=1;
        last_suburb=current_suburb;
    if place_no<10:
        place_no_text='_00'+str(place_no);
    elif place_no<100:
        place_no_text='_0'+str(place_no);
    else:
        place_no_text='_'+str(place_no);
   
    new_file_name=current_suburb+place_no_text+image_no_text+".jpg"; #New filename according to the pattern
    new_full_path=current_full_path[:-len(current_file_name)]+new_file_name;
	
    id_var=new_file_name[:-4];
    element.set("id",id_var); #Also set the ids that correspond to the new filenames
    for child in element:
        child.set("id",id_var+"_"+child.tag);
        if child.tag=="file_name":
            child.text=new_file_name;
        if child.tag=="full_path":
            child.text=new_full_path;
       
#Write the final database to the file specified by path_data      
outFile = open(os.path.join('..',path_data), 'w')
data.write(outFile, pretty_print=True)

