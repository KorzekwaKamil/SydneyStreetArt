var data_xml = new XMLHttpRequest();

data_xml.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		load_gallery();
        load_map_simple();
	}
}
function load_data(path){
	data_xml.open("GET", path, true);
	data_xml.send();
}