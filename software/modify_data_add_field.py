##############################################################################
#DESCRIPTION
##############################################################################

#Program loads the current xml database and adds a new field to every graffiti. To specify what field to add, modify the loop at line 50.

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

#!!!!!!!!!!!!!!!!!
#The interior of the following loop should be modified if one wants to add a new field. Currently it is adding width and height
#!!!!!!!!!!!!!!!!!
#For every graffiti in the database:
for element in data.getiterator("graffiti"):            
    full_path=os.path.join('..',element.findtext("full_path")); #Get full path of the image file
    image = PIL.Image.open(full_path); # Load the photo into 'image' variable through PIL's Image object
    width, height = image.size;	#Get width and height of the image
    
    height_xml=etree.SubElement(element,"height"); #Create a new field 'height' for current 'graffiti'
    width_xml=etree.SubElement(element,"width"); #Create a new field 'width' for current 'graffiti'
    height_xml.text=str(height); #Set the value of height
    width_xml.text=str(width); #Set the value for width
       
#Write the final database to the file specified by path_data      
outFile = open(os.path.join('..',path_data), 'w')
data.write(outFile, pretty_print=True)


