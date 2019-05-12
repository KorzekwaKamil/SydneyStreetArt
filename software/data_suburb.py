##############################################################################
#DESCRIPTION
##############################################################################

#Program loads the current xml database and creates a smaller database only with entries corresponding to a given suburb

##############################################################################
#INPUT VARIABLES THAT MAY BE MODIFIED
##############################################################################

#Write the name of the suburb here and set variable 'others' to 0
#Alternatively one can make a database for all suburbs not in the main_suburbs list by setting the variable 'others' to 1
suburb_name="Surry Hills";
others=0;
main_suburbs=["Newtown","Bondi","St Peters","Surry Hills","Enmore","Glebe","Redfern","Marrickville","Camperdown","Chippendale","Annandale","Rozelle","Darlinghurst","Potts Point","Woolloomooloo"];

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
outputFile = open(suburb_name+".xml", 'w');

#Create a new sub-database for a given suburb (or all "other" suburbs)
if others==0:
    outputFile = open(suburb_name+".xml", 'w');
else:
    outputFile = open("Others.xml", 'w');

#Remove all elements that do not fit the pattern
for element in data.getiterator("graffiti"):   
    for child in element:
        if child.tag=="suburb":
            if others==0:
                if child.text!=suburb_name:
                    element.getparent().remove(element); 
            if others==1:
                if child.text in main_suburbs:
                    element.getparent().remove(element);

#Write the new database (with only graffitis corresponding to a given suburb) to a new file		
data.write(outputFile, pretty_print=True)

