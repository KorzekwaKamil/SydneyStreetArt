var exists=1;

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

function show_description() {
    document.getElementById("graffiti_description").style.visibility="visible";
}

function hide_description() {
    document.getElementById("graffiti_description").style.visibility="hidden";
}

function load_picture(graffiti_index,picture_number) {
    image_handle=document.getElementById('graffiti');
    desc_handle=document.getElementById('graffiti_description');
    
    image_handle.style.WebkitFilter="blur(10px)";
    
    var data=data_xml.responseXML;
	var graffitis=data.getElementsByTagName("graffiti");
	var id=graffiti_index+picture_number-1;
    
    path=graffitis[id].getElementsByTagName("full_path")[0].childNodes[0].nodeValue;
    image_handle.src = path;

    var full_id=graffitis[id].getElementsByTagName("file_name")[0].childNodes[0].nodeValue;
    full_id=full_id.substring(0,full_id.length-4);

    graffiti_status=get_tag("status","OK");
    if (graffiti_status=="Removed") {exists=0;}
    else {exists=1;}
    
    title=get_tag("title",full_id);
    artist=get_tag("artist","Unknown");
    desc_handle.innerHTML=title+"<br/>by "+artist+"<br/>Click to get full info";
    
    image_handle.onclick=function () {
        var location_window=window.open('graffiti.html?id='+full_id,"","");   
        return false; 
    };
    desc_handle.onclick=function () {
        var location_window=window.open('graffiti.html?id='+full_id,"","");   
        return false; 
    };
    
    function get_tag(tag_name,what_if_no_tag) {
        temp=graffitis[id].getElementsByTagName(tag_name)[0].childNodes;
        if (temp.length>0) {answer=temp[0].nodeValue;}
        else {answer=what_if_no_tag;}
        return(answer);
    }
    
}

function reset_filter() {
	if (exists==1) {document.getElementById('graffiti').style.WebkitFilter="";}
	else {document.getElementById('graffiti').style.WebkitFilter="sepia(100%)";}
	document.getElementById('graffiti_description').style.width=document.getElementById('graffiti').width+"px";           
}


