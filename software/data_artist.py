##############################################################################
#DESCRIPTION
##############################################################################

#Program loads the current xml database and creates a smaller database only with entries corresponding to a given artist

##############################################################################
#INPUT VARIABLES THAT MAY BE MODIFIED
##############################################################################

#Write the name of the artist here
artist_name="Lister";

#Relative paths to folders with data and archived data
path_data = 'data/data.xml';

##############################################################################
#LIBRARIES
##############################################################################

#Dealing with folder structure
import os
import os.path
#Operating on XML files
from lxml import etree

##############################################################################
#CODE
##############################################################################

#Get the database from XML file to variable 'data'
parser = etree.XMLParser(remove_blank_text=True);
data = etree.parse(os.path.join('..',path_data),parser);

#Create a new sub-database for a given artist
outputFile = open(artist_name+".xml", 'w');

#Remove all elements that do not fit the pattern
for element in data.getiterator("graffiti"):   
    for child in element:
        if child.tag=="artist":
            if child.text!=artist_name:
                element.getparent().remove(element); 

#Write the new database (with only graffitis corresponding to a given artist) to a new file				
data.write(outputFile, pretty_print=True)