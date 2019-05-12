var all_markers=[];
var marker_count=0;
var current_marker;
var indicator_marker;
var first_time_select=0;

var current_graffiti;		
var number_of_images=0;
var current_image_ids=[];
		
var map_event = new Event('refresh_map');
		
function load_map_simple(gps_lat,gps_lon,gps_zoom) {
	var myLatlng = new google.maps.LatLng(gps_lat,gps_lon); 
	var map_canvas = document.getElementById("map_canvas");
	var map_options = { 
		center: myLatlng, 
		zoom: gps_zoom, 
		gestureHandling: 'greedy', 
		mapTypeId: google.maps.MapTypeId.ROADMAP 
	}			
	var map = new google.maps.Map(map_canvas, map_options);			
					  
	if (first_time_select==0) {
		indicator_marker=new google.maps.Marker({ position: new google.maps.LatLng(10,10),map:map,zIndex: google.maps.Marker.MAX_ZINDEX + 1});
		indicator_marker.setIcon('graphics/big_blue.png');
		indicator_marker.setVisible(false);
	}
	else {
		map.setCenter(myLatlng);
		indicator_marker=new google.maps.Marker({ position: current_position,map:map,zIndex: google.maps.Marker.MAX_ZINDEX + 1});
		indicator_marker.setIcon('graphics/big_blue.png');
		indicator_marker.setVisible(true);
	}	
	loadMarkers();
    google.maps.event.addDomListener(window,'refresh_map',function(){google.maps.event.trigger(map, 'resize');});   
    
	function loadMarkers() {
		var data=data_xml.responseXML;
		var graffitis=data.getElementsByTagName("graffiti");
		previous_id="something_very_strange";
		image_ids=[];
		for (i = 0; i < graffitis.length; i++) {
			
			id=graffitis[i].getAttribute("id");
			
			if ( checkIfTheSameSpot(id,previous_id) ){
				image_ids.push(id);
			} 
			else {
				if (i>0) {
					addMarkerToMap(lat,lon,previous_id,image_ids);
				}
				previous_id=id;
				lat=graffitis[i].getElementsByTagName("gps_lat")[0].childNodes[0].nodeValue;
				lon=graffitis[i].getElementsByTagName("gps_lon")[0].childNodes[0].nodeValue;
				image_ids=[id];
			}	
		}
		addMarkerToMap(lat,lon,previous_id,image_ids);
	}

	function checkIfTheSameSpot(current,previous) {
		sameSpot=false;
		var splitCurrent = current.split("_");
		var splitPrevious = previous.split("_");
		if ((splitCurrent[0]==splitPrevious[0])&&(splitCurrent[1]==splitPrevious[1]))
			{
				sameSpot=true;
			}
		return sameSpot;
	}

	function addMarkerToMap(latit, longit, graffiti_id,image_ids){ 
		all_markers.push(new google.maps.Marker({ position: new google.maps.LatLng(latit, longit),map:map}));
		all_markers[all_markers.length-1].setIcon('graphics/small_red.png');
		current_marker=all_markers[all_markers.length-1];
		marker_count++; 	
		
        google.maps.event.addListener(current_marker, 'click', (function(marker, marker_count) { 
			return function() { 
                
                for (j=1;j<=current_image_ids.length;j++) {
                	document.getElementById(current_image_ids[j-1]).classList.remove("selected");
                }				
                
				indicator_marker.setPosition(new google.maps.LatLng(latit, longit));
				indicator_marker.setVisible(true);
                current_graffiti=graffiti_id;
                current_image_ids=image_ids;

				document.getElementById(current_graffiti).scrollIntoView();
                if (window.innerWidth<601) {window.scrollBy(0,-1.1*document.getElementById('menu_canvas').offsetHeight);}
                else {window.scrollBy(0,-1.1*document.getElementById('menu_canvas').offsetHeight-document.getElementById('logo').offsetHeight);}

				for (j=1;j<=image_ids.length;j++) {
					document.getElementById(image_ids[j-1]).classList.add("selected");
                }				
			} 
			})(current_marker, marker_count));
		
	}
}