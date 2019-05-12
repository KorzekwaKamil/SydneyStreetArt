var desc_xml = new XMLHttpRequest();
var data_xml = new XMLHttpRequest();

function load_description(description_path,data_path,target_div) {
    
    var desc_name,desc_text,gps_lat,gps_lon,gps_zoom,website;
    desc_xml.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var desc=desc_xml.responseXML;
            desc_name=desc.getElementsByTagName("name")[0].childNodes[0].nodeValue;
            desc_text=desc.getElementsByTagName("description")[0].childNodes[0].nodeValue;
            gps_lat=desc.getElementsByTagName("gps_lat")[0].childNodes[0].nodeValue;
            gps_lon=desc.getElementsByTagName("gps_lon")[0].childNodes[0].nodeValue;
            gps_zoom=desc.getElementsByTagName("gps_zoom")[0].childNodes[0].nodeValue;
            document.getElementById(target_div).innerHTML+="<h3>"+desc_name+"</h3>";
            
            var i=1;
            while (desc.getElementsByTagName("artist_link_"+i.toString()).length > 0 ) {
                website=desc.getElementsByTagName("artist_link_"+i.toString())[0].childNodes[0].nodeValue;
                document.getElementById(target_div).innerHTML+='<a href='+website+' target="_blank">'+website+'</a><br>';
                i=i+1;
            }
           
            document.getElementById(target_div).innerHTML+='<br>'+desc_text;
            data_xml.open("GET", data_path, true);
            data_xml.send();
        }
	}
    
    data_xml.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            load_gallery();
            load_map_simple(gps_lat,gps_lon,parseInt(gps_zoom));
        }
    }
    
    desc_xml.open("GET", description_path, true);
	desc_xml.send();
}
