function group() {
	all_markers=[];
	marker_count=0;
	current_position=indicator_marker.getPosition();
	current_center=map.getCenter();
	current_zoom=map.getZoom();
	if (group_markers==1) {
		group_markers=0;
		document.getElementById('group_button').innerHTML="Group locations";
		initMap();
	}
	else {
		group_markers=1;
		document.getElementById('group_button').innerHTML="Ungroup locations";
		initMap();
	}
	map.setCenter(current_center);
	map.setZoom(current_zoom);
}