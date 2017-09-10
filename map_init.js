var all_markers=[];
var marker_count=0;
var current_marker;
var indicator_marker;
var group_markers=1;
var first_time_select=0;
		
var number_of_images=0;
var current_image=0;
var current_image_name="";
		
var current_zoom=12;
var current_center=new google.maps.LatLng(-33.8955111419,151.179684587);
		
var map;	
function initMap() {
	var myLatlng = new google.maps.LatLng(-33.8955111419,151.179684587); 
	var map_canvas = document.getElementById("map_canvas");
	var map_options = { 
		center: myLatlng, 
		zoom: current_zoom, 
		mapTypeId: google.maps.MapTypeId.ROADMAP 
	}			
	map = new google.maps.Map(map_canvas, map_options);			
					
	loadMarkers();
			
	if (group_markers==1){var markerCluster = new MarkerClusterer(map, all_markers,{imagePath: 'Markers/m'});}
	  
	if (first_time_select==0) {
		indicator_marker=new google.maps.Marker({ position: new google.maps.LatLng(10,10),map:map,zIndex: google.maps.Marker.MAX_ZINDEX + 1});
		indicator_marker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');
		indicator_marker.setVisible(false);
	}
	else {
		map.setCenter(current_center);
		indicator_marker=new google.maps.Marker({ position: current_position,map:map,zIndex: google.maps.Marker.MAX_ZINDEX + 1});
		indicator_marker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');
		indicator.setVisible(true);
	}	
}

		
function addMarkerToMap(latit, longit, image_name,image_number){ 
	all_markers.push(new google.maps.Marker({ position: new google.maps.LatLng(latit, longit),map:map}));
	all_markers[all_markers.length-1].setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
	current_marker=all_markers[all_markers.length-1];
	marker_count++; 	
	google.maps.event.addListener(current_marker, 'click', (function(marker, marker_count) { 
		return function() { 
			if (first_time_select==0) {
				document.getElementById('graffiti_canvas').innerHTML = '<img id="graffiti" src="" style="cursor:pointer" height="100%" width="100%" onclick="open_new_tab()" onload="reset_filter()">';
				first_time_select=1;
			}
			document.getElementById('graffiti').style.WebkitFilter="blur(10px)";
			indicator_marker.setPosition(new google.maps.LatLng(latit, longit));
			indicator_marker.setVisible(true);
					
			current_image=1;
			number_of_images=image_number;
			current_image_name=image_name;
			if (number_of_images>1) {
				document.getElementById('next_button').style.display="block";
				document.getElementById('previous_button').style.display="block";
			}
			else {
				document.getElementById('next_button').style.display="none";
				document.getElementById('previous_button').style.display="none";
			}
			document.getElementById('graffiti').src = "Photos\\"+image_name;
		} 
		})(current_marker, marker_count));
}
