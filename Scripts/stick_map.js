function stick_map(){
	if (document.getElementById('full_page').scrollTop > document.getElementById('logo').offsetHeight+document.getElementById('description_canvas').offsetHeight) {
		document.getElementById('map_frame').classList.add('sticky_map');
		
	}

	if (document.getElementById('full_page').scrollTop < document.getElementById('logo').offsetHeight+document.getElementById('description_canvas').offsetHeight) {
		document.getElementById('map_frame').classList.remove('sticky_map');
	}
};
