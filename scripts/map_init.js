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
			
	if (group_markers==1){var markerCluster = new MarkerClusterer(map, all_markers,{imagePath: 'graphics/m'});}
	  
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
}