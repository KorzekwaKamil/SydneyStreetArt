function next_image() {
	current_image++;
    if (current_image>number_of_images) {current_image=1;}
    load_picture(current_graffiti,current_image);
}
		
function previous_image() {
	current_image=current_image-1;
	if (current_image==0) {current_image=number_of_images;}
    load_picture(current_graffiti,current_image);	
}

function load_picture(graffiti_index,picture_number) {
    image_handle=document.getElementById('graffiti');
    image_handle.style.WebkitFilter="blur(10px)";
    
    var data_xml=parent.data_xml.responseXML;
	var graffitis=data_xml.getElementsByTagName("graffiti");
	var id=graffiti_index+picture_number-1;
    
    path=graffitis[id].getElementsByTagName("full_path")[0].childNodes[0].nodeValue;
    image_handle.src = path;

    graffiti_status=graffitis[id].getElementsByTagName("status")[0].childNodes;
    if (graffiti_status.length>0) {
        if (graffiti_status[0].nodeValue=="Removed") {
            exists=0;
        }
        else {exists=1;}
    }
    else {exists=1;}
    
    image_handle.onclick=function () {
        var location_window=window.open('graffiti.html?id='+id,"","");   
        return false; 
    };
    
}

