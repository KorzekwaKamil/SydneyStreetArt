function next_image() {
	var fileNameWithOutExt = current_image_name.substring(0,current_image_name.lastIndexOf('.'));
	var image_handle=document.getElementById('graffiti');
	image_handle.style.WebkitFilter="blur(10px)";
	if (current_image==number_of_images) {
		current_image=1;
		image_handle.src = "Photos\\"+current_image_name;
	}
	else if (current_image<9) {
		current_image=current_image+1;
		image_handle.src = "Photos\\"+fileNameWithOutExt+"_0"+current_image+".jpg";
	}
	else {
		current_image=current_image+1;
		image_handle.src = "Photos\\"+fileNameWithOutExt+"_"+current_image+".jpg";
	}
}
		
function previous_image() {
	var fileNameWithOutExt = current_image_name.substring(0,current_image_name.lastIndexOf('.'));
	var image_handle=document.getElementById('graffiti');
	image_handle.style.WebkitFilter="blur(10px)";
	current_image=current_image-1;
	if (current_image==0) {current_image=number_of_images;}
	if (current_image==1) {
		image_handle.src = "Photos\\"+fileNameWithOutExt+".jpg";
	}
	else if (current_image<10) {
		image_handle.src = "Photos\\"+fileNameWithOutExt+"_0"+current_image+".jpg";
	}
	else {
		image_handle.src = "Photos\\"+fileNameWithOutExt+"_"+current_image+".jpg";
	}
}