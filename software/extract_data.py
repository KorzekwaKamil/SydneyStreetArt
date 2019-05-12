##############################################################################
#DESCRIPTION
##############################################################################

#Program loads the current xml database (may be empty) and runs over all pictures in the indicated folder. Each picture that does not belong to the database is subsequently added to it, and each element of the database for which the picture no longer exists is removed from the database 
#The added info includes: filename, full path, suburb (taken from the subfolder name), GPS coordinates, date and time the photo was taken, photographer, height and width of the photo. 
#Moreover it adds empty fields that may be modified manually: title, artist, link to artist's website, status, description


##############################################################################
#INPUT VARIABLES THAT MAY BE MODIFIED
##############################################################################

#Relative paths to folders with photos, data and archived data
path_photos = 'photos';
path_data = 'data/data.xml';
path_archive ='data/archive';
#Setting the default photographer
photographer="KK";

##############################################################################
#LIBRARIES
##############################################################################

#Operating on images
import PIL.Image
#Extracting EXIF information from a .jpg file
import my_exif
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

#Auxilliary function to check if a given graffiti (file_name) already appears in a database (so to avoid overwriting data)
def check_if_exists(data_xml,file_name):
    exists=0;
    for element in data_xml.getiterator("graffiti"):
        if element.findtext("file_name")==file_name:
            exists=element;
    return exists;

#Get the database from XML file to variable 'data'
parser = etree.XMLParser(remove_blank_text=True);
data = etree.parse(os.path.join('..',path_data),parser);

#Before any modifications make a copy of the current version of database in the folder specified by path_archive
archiveFile = open(os.path.join('..',path_archive+'/date_'+time.strftime("%Y_%m_%d_time_%H_%M_%S")+'.xml'), 'w');
data.write(archiveFile, pretty_print=True)

#Get the root element (graffiti_list) of the xml database
graffiti_list_xml = data.getroot();

#List of jpg files in the folder specified by path_photos
list_of_images={};

#Add new fields to variable 'data' from pictures that are not yet in the database
#First loop over all .jpg files within the folder specified by path_photos
for dir_path, dir_names, file_names in os.walk(os.path.join('..',path_photos)):
    for file_name in [f for f in file_names if f.endswith(".jpg")]:
        #Add every image found to the list in the variable 'list_of_images'
        list_of_images[file_name]=0;
        #If the image is not yet in the database then:
        if check_if_exists(data,file_name)==0:
            full_path=os.path.join(dir_path, file_name); #Get full path of the image file
            suburb=dir_path[len(path_photos)+4:len(dir_path)]; #Extract info about the suburb from the subfolder
            image = PIL.Image.open(full_path); # Load the photo into 'image' variable through PIL's Image object
            
            exif_data = my_exif.get_exif_data(image); #Use my_exif library to extract EXIF data
            lat=str(my_exif.get_lat_lon(exif_data)[0]);	#Get GPS latitude
            lon=str(my_exif.get_lat_lon(exif_data)[1]); #Get GPS longitude
            
            date_time=my_exif.get_exif_tag(exif_data,"DateTimeOriginal"); #Get date and time when the photo was taken
            date=date_time[8:10]+'.'+date_time[5:7]+'.'+date_time[0:4]; #Fix proper format
            time=date_time[11:16]; #Fix proper format
            
            width, height = image.size; #Get the width and height of the image
            
            graffiti_xml=etree.SubElement(graffiti_list_xml,"graffiti"); #Add new 'graffiti' element to the 'graffiti_list'
            
            file_name_xml=etree.SubElement(graffiti_xml,"file_name"); #Add info about file name for 'graffiti'
            file_name_xml.text=file_name;
            
            full_path_xml=etree.SubElement(graffiti_xml,"full_path"); #Add info about full path for 'graffiti'
            full_path_xml.text=full_path[3:len(full_path)];
            
            suburb_xml=etree.SubElement(graffiti_xml,"suburb"); #Add info about suburb for 'graffiti'
            suburb_xml.text=suburb;
            
            date_xml=etree.SubElement(graffiti_xml,"date"); #Add info about date the photo was taken for 'graffiti'
            date_xml.text=date;
            
            time_xml=etree.SubElement(graffiti_xml,"time"); #Add info about time the photo was taken for 'graffiti'
            time_xml.text=time;
            
            gps_lat_xml=etree.SubElement(graffiti_xml,"gps_lat"); #Add info about GPS latitude for 'graffiti'
            gps_lat_xml.text=lat;
            
            gps_lon_xml=etree.SubElement(graffiti_xml,"gps_lon"); #Add info about GPS longitude for 'graffiti'
            gps_lon_xml.text=lon;

            photographer_xml=etree.SubElement(graffiti_xml,"photographer"); #Add info about photographer for 'graffiti'
            photographer_xml.text=photographer;

            status_xml=etree.SubElement(graffiti_xml,"status"); #Add the field status for 'graffiti' (to be filled manually)

            title_xml=etree.SubElement(graffiti_xml,"title"); #Add the field title for 'graffiti' (to be filled manually)

            artist_xml=etree.SubElement(graffiti_xml,"artist"); #Add the field artist for 'graffiti' (to be filled manually)
            
            artist_link_xml=etree.SubElement(graffiti_xml,"artist_link_1"); #Add the field artist_link_1 for 'graffiti' (to be filled manually)

            description_xml=etree.SubElement(graffiti_xml,"description"); #Add the field description for 'graffiti' (to be filled manually)
            
            height_xml=etree.SubElement(graffiti_xml,"height"); #Add info about height and width for 'graffiti'
            width_xml=etree.SubElement(graffiti_xml,"width");
            height_xml.text=str(height);
            width_xml.text=str(width);
            
#Remove data of pictures that are no longer in the folder specified by path_photos
for element in data.getiterator("graffiti"):            
    exists=0;
    for image in list_of_images:
        if element.findtext("file_name")==image:
            exists=1;
    if exists==0:
        graffiti_list_xml.remove(element);
       
#Sort by suburb
suburb_dict = [];
for element in graffiti_list_xml: 
    key = element.findtext("full_path");
    suburb_dict.append((key, element));
suburb_dict.sort();
graffiti_list_xml[:] = [item[1] for item in suburb_dict];

#Write the final database to the file specified by path_data      
outFile = open(os.path.join('..',path_data), 'w')
data.write(outFile, pretty_print=True)

