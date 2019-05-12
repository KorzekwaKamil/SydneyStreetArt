var all_markers=[];
var marker_count=0;
var current_marker;
var indicator_marker;
var group_markers=0;
var first_time_select=0;

var current_graffiti=0;		
var number_of_images=0;
var current_image=0;
		
var current_zoom=12;
var current_center={lat: -33.8955111419, lng: 151.179684587};

var map_event = new Event('refresh_map');
		
function load_map() {
	var myLatlng = new google.maps.LatLng(-33.8955111419,151.179684587); 
	var map_canvas = document.getElementById("map_canvas");
	var map_options = { 
		center: myLatlng, 
		zoom: current_zoom, 
		gestureHandling: 'greedy', 
		mapTypeId: google.maps.MapTypeId.ROADMAP 
	}			
	var map = new google.maps.Map(map_canvas, map_options);			
					
	
    //document.getElementById("map_group_button").onclick=group;
    
	//if (group_markers==1){var markerCluster = new MarkerClusterer(map, all_markers,{imagePath: 'graphics/m'});}
	  
	if (first_time_select==0) {
		indicator_marker=new google.maps.Marker({ position: new google.maps.LatLng(10,10),map:map,zIndex: google.maps.Marker.MAX_ZINDEX + 1});
		indicator_marker.setIcon('graphics/big_blue.png');
		indicator_marker.setVisible(false);
	}
	else {
		map.setCenter(current_center);
		indicator_marker=new google.maps.Marker({ position: current_position,map:map,zIndex: google.maps.Marker.MAX_ZINDEX + 1});
		indicator_marker.setIcon('graphics/big_blue.png');
		indicator_marker.setVisible(true);
	}	
	loadMarkers();
    google.maps.event.addDomListener(window,'refresh_map',function(){google.maps.event.trigger(map, 'resize');});   
    
	function loadMarkers() {
		var data=data_xml.responseXML;
		var graffitis=data.getElementsByTagName("graffiti");
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
     function group() {
        all_markers=[];
        marker_count=0;
        current_position=indicator_marker.getPosition();
        current_center=map.getCenter();
        current_zoom=map.getZoom();
        if (group_markers==1) {
            group_markers=0;
            document.getElementById('map_group_button').innerHTML="&nbsp Group &nbsp";
            load_map();
        }
        else {
            group_markers=1;
            document.getElementById('map_group_button').innerHTML="Ungroup";
            load_map();
        }
        map.setCenter(current_center);
        map.setZoom(current_zoom);
    }
}