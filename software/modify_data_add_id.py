##############################################################################
#DESCRIPTION
##############################################################################

#Program loads the current xml database and adds an id to every field based on the filename and the field name.

##############################################################################
#INPUT VARIABLES THAT MAY BE MODIFIED
##############################################################################

#Relative paths to folders with data and archived data
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

#For every graffiti in the database:
for element in data.getiterator("graffiti"):   
    id_var=element[0].text[:-4]; #ID of the current 'graffiti' to be given by its filename with extension '.jpg' removed
    element.set("id",id_var); #Set the id for the current 'graffiti'
    for child in element: #Set the id for all children nodes the current 'graffiti'
	    child.set("id",id_var+"_"+child.tag);
       
#Write the final database to the file specified by path_data      
outFile = open(os.path.join('..',path_data), 'w')
data.write(outFile, pretty_print=True)


