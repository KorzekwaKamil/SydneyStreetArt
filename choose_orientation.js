function choose_orientation() {
				
	if (window.innerHeight > 0.85*window.innerWidth) {
										
		document.getElementById("left_margin").className="empty_margin";
		document.getElementById("right_margin").className="empty_margin";	
		document.getElementById("middle_margin").style.display="none";
		
		document.getElementById("footer_left").style.width="32%";
		document.getElementById("footer_separator1").style.width="10%";
		document.getElementById("footer_middle").style.width="28.5%";
		document.getElementById("footer_separator2").style.width="1%";
		document.getElementById("footer_right").style.width="28.5%";
		
		document.getElementById("graffiti_canvas").className="graffiti_canvas_vertical";			
		document.getElementById("map_canvas").className="map_canvas_vertical";
		document.getElementById("info_text_canvas").style.fontSize="4.5vw";
		
		google.maps.event.trigger(map, 'resize');
	}
	else {

		document.getElementById("right_margin").className="external_margin";				
		document.getElementById("right_margin").style.float="right";
		
		document.getElementById("graffiti_canvas").className="graffiti_canvas_horizontal";

		document.getElementById("middle_margin").style.display="block";
		document.getElementById("middle_margin").style.float="right";

		document.getElementById("map_canvas").className="map_canvas_horizontal";
		document.getElementById("info_text_canvas").style.fontSize="2.5vw";
					
		document.getElementById("left_margin").className="external_margin";
		document.getElementById("left_margin").style.float="right";
					
		document.getElementById("footer_left").style.width="42%";
		document.getElementById("footer_separator1").style.width="0%";
		document.getElementById("footer_middle").style.width="28%";
		document.getElementById("footer_separator2").style.width="1%";
		document.getElementById("footer_right").style.width="28%";	
					
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
