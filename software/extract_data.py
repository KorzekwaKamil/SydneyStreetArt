import PIL.Image
import my_exif
import os
import os.path
from lxml import etree
import time

#Auxilliary function to check if a given file_name appears in a database (so it is not overwritten)
def check_if_exists(data_xml,file_name):
    exists=0;
    for element in data_xml.getiterator("graffiti"):
        if element.findtext("file_name")==file_name:
            exists=element;
    return exists;


path = 'photos';
photographer="KK";

parser = etree.XMLParser(remove_blank_text=True);
data = etree.parse(os.path.join('..','Data/data.xml'),parser);

#Before any modifications make a copy of the current version of database
archiveFile = open(os.path.join('..','Data/Archive/date_'+time.strftime("%Y_%m_%d_time_%H_%M_%S")+'.xml'), 'w');
data.write(archiveFile, pretty_print=True)

graffiti_list_xml = data.getroot();

#List of jpg files in the folder specified by path
list_of_images={};

#Add new fields from pictures that are not in the database

for dir_path, dir_names, file_names in os.walk(os.path.join('..',path)):
    for file_name in [f for f in file_names if f.endswith(".jpg")]:
        list_of_images[file_name]=0;
        if check_if_exists(data,file_name)==0:
            full_path=os.path.join(dir_path, file_name);
            suburb=dir_path[len(path)+4:len(dir_path)];
            image = PIL.Image.open(full_path); # load an image through PIL's Image object
            
            exif_data = my_exif.get_exif_data(image);
            lat=str(my_exif.get_lat_lon(exif_data)[0]);
            lon=str(my_exif.get_lat_lon(exif_data)[1]);
            
            date_time=my_exif.get_exif_tag(exif_data,"DateTimeOriginal");
            date=date_time[8:10]+'.'+date_time[5:7]+'.'+date_time[0:4];
            time=date_time[11:16];
            
            graffiti_xml=etree.SubElement(graffiti_list_xml,"graffiti");
            
            file_name_xml=etree.SubElement(graffiti_xml,"file_name");
            file_name_xml.text=file_name;
            
            full_path_xml=etree.SubElement(graffiti_xml,"full_path");
            full_path_xml.text=full_path[3:len(full_path)];
            
            suburb_xml=etree.SubElement(graffiti_xml,"suburb");
            suburb_xml.text=suburb;
            
            date_xml=etree.SubElement(graffiti_xml,"date");
            date_xml.text=date;
            
            time_xml=etree.SubElement(graffiti_xml,"time");
            time_xml.text=time;
            
            gps_lat_xml=etree.SubElement(graffiti_xml,"gps_lat");
            gps_lat_xml.text=lat;
            
            gps_lon_xml=etree.SubElement(graffiti_xml,"gps_lon");
            gps_lon_xml.text=lon;

            photographer_xml=etree.SubElement(graffiti_xml,"photographer");
            photographer_xml.text=photographer;

            status_xml=etree.SubElement(graffiti_xml,"status");

            title_xml=etree.SubElement(graffiti_xml,"title");

            artist_xml=etree.SubElement(graffiti_xml,"artist");

            description_xml=etree.SubElement(graffiti_xml,"description");

#Remove data of pictures that are no longer in the Photos folder

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
      
outFile = open(os.path.join('..','Data/data.xml'), 'w')
data.write(outFile, pretty_print=True)

