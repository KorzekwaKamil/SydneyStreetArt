function loadMarkers() {
	var data_xml=parent.data_xml.responseXML;
	var graffitis=data_xml.getElementsByTagName("graffiti");
	previous_path="something_very_strange";
	image_number=0;
	for (i = 0; i < graffitis.length; i++) {
		
		path=graffitis[i].getElementsByTagName("full_path")[0].childNodes[0].nodeValue;
		
		if ( path.substr(0,path.length-7) == previous_path.substr(0,previous_path.length-4)) {
            image_number++;
		} 
		else {
			if (i>0) {
				addMarkerToMap(lat,lon,previous_path,i-image_number,image_number);
			}
			previous_path=path;
			lat=graffitis[i].getElementsByTagName("gps_lat")[0].childNodes[0].nodeValue;
			lon=graffitis[i].getElementsByTagName("gps_lon")[0].childNodes[0].nodeValue;
			image_number=1;
		}	
	}
    if (image_number>1) {addMarkerToMap(lat,lon,previous_path,graffitis.length-1-image_number,image_number);}
}

function addMarkerToMap(latit, longit, image_name,graffiti_index,image_number){ 
	all_markers.push(new google.maps.Marker({ position: new google.maps.LatLng(latit, longit),map:map}));
	all_markers[all_markers.length-1].setIcon('graphics/small_red.png');
	current_marker=all_markers[all_markers.length-1];
	marker_count++; 	
	google.maps.event.addListener(current_marker, 'click', (function(marker, marker_count) { 
		return function() { 
			if (first_time_select==0) {
				first_time_select=1;
                document.getElementById('info_text').style.visibility="hidden";
			}
			document.getElementById('graffiti').style.WebkitFilter="blur(10px)";
			
			indicator_marker.setPosition(new google.maps.LatLng(latit, longit));
			indicator_marker.setVisible(true);
					
			current_image=1;
			number_of_images=image_number;
			current_graffiti=graffiti_index;
			if (number_of_images>1) {
				document.getElementById('next_button').style.visibility="visible";
				document.getElementById('previous_button').style.visibility="visible";
			}
			else {
				document.getElementById('next_button').style.visibility="hidden";
				document.getElementById('previous_button').style.visibility="hidden";
			}
			load_picture(current_graffiti,current_image);
		} 
		})(current_marker, marker_count));
}