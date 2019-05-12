##############################################################################
#DESCRIPTION
##############################################################################

#Program loads the current xml database and counts the number of graffitis for each artist and suburb; writes the result to summary.txt

##############################################################################
#INPUT VARIABLES THAT MAY BE MODIFIED
##############################################################################

#Relative paths to folder with data
path_data = 'data/data.xml';

##############################################################################
#LIBRARIES
##############################################################################

#Dealing with folder structure
import os
import os.path
#Operating on XML files
from lxml import etree
#Using dictionary variables
import json

##############################################################################
#CODE
##############################################################################

#Get the database from XML file to variable 'data'
parser = etree.XMLParser(remove_blank_text=True);
data = etree.parse(os.path.join('..',path_data),parser);

#Store list of suburbs and artists
suburbs={};
artists={};

#Go over all graffitis in the database and count the number of graffitis with the same artist and suburb
for element in data.getiterator("graffiti"):   
    for child in element:
        if child.tag=="suburb":
            if child.text in suburbs:
                suburbs[child.text]=suburbs[child.text]+1;
            else:
                suburbs[child.text]=1;
        if child.tag=="artist":
            if child.text in artists:
                artists[child.text]=artists[child.text]+1;
            else:
                artists[child.text]=1;

#Write the summary to file                
output = open("summary.txt", "w")

output.write("ARTISTS:\n\n");
for artist in sorted(artists, key=artists.get, reverse=True):
    output.write(str(artist) + ': '+ str(artists[artist]) + '\n')

output.write("\nSUBURBS:\n\n");
for suburb in sorted(suburbs, key=suburbs.get, reverse=True):
    output.write(str(suburb) + ': '+ str(suburbs[suburb]) + '\n')

output.close()