function choose_orientation() {
				
	if (window.innerHeight > 0.85*window.innerWidth) {
										
		document.getElementById("left_margin").className="empty_margin";
		document.getElementById("right_margin").className="empty_margin";	
		document.getElementById("middle_margin").className="middle_margin_vertical";
	
		document.getElementById("graffiti_canvas").className="graffiti_canvas_vertical";			
		document.getElementById("map_container").className="map_container_vertical";
		document.getElementById("info_text").style.fontSize="4.5vw";
		document.getElementById("info_text").style.lineHeight="4.5vw";
        
		google.maps.event.trigger(map, 'resize');
	}
	else {

		document.getElementById("right_margin").className="external_margin";				
		document.getElementById("right_margin").style.float="right";
		
		document.getElementById("graffiti_canvas").className="graffiti_canvas_horizontal";

		document.getElementById("middle_margin").className="middle_margin_horizontal";

		document.getElementById("map_container").className="map_container_horizontal";


		document.getElementById("info_text").style.fontSize="2.5vw";        
		document.getElementById("info_text").style.lineHeight="2.5vw";
					
		google.maps.event.trigger(map, 'resize');			
	}
}

function choose_orientation_about() {
				
	if (window.innerHeight > 0.85*window.innerWidth) {
										
							
		document.getElementById("about_text_canvas").className="about_text_canvas_vertical";			
		document.getElementById("about_photo_canvas").className="about_photo_canvas_vertical";
		
		document.getElementById("left_margin").style.display="none";
		document.getElementById("right_margin").style.display="none";
		document.getElementById("middle_margin").style.display="none";

		
	}
	else {
				
		document.getElementById("about_text_canvas").className="about_text_canvas_horizontal";
		document.getElementById("about_photo_canvas").className="about_photo_canvas_horizontal";
					
		document.getElementById("left_margin").style.display="block";
		document.getElementById("right_margin").style.display="block";
		document.getElementById("middle_margin").style.display="block";
	}
}
