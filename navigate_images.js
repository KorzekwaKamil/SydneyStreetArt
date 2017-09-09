function next_image() {
	var fileNameWithOutExt = current_image_name.substring(0,current_image_name.lastIndexOf('.'));
	if (current_image==number_of_images) {
		current_image=1;
		document.getElementById('graffiti').src = "Photos\\"+current_image_name;
	}
	else if (current_image<9) {
		current_image=current_image+1;
		document.getElementById('graffiti').src = "Photos\\"+fileNameWithOutExt+"_0"+current_image+".jpg";
	}
	else {
		current_image=current_image+1;
		document.getElementById('graffiti').src = "Photos\\"+fileNameWithOutExt+"_"+current_image+".jpg";
	}
}
		
function previous_image() {
	var fileNameWithOutExt = current_image_name.substring(0,current_image_name.lastIndexOf('.'));
	current_image=current_image-1;
	if (current_image==0) {current_image=number_of_images;}
	if (current_image==1) {
		document.getElementById('graffiti').src = "Photos\\"+fileNameWithOutExt+".jpg";
	}
	else if (current_image<10) {
		document.getElementById('graffiti').src = "Photos\\"+fileNameWithOutExt+"_0"+current_image+".jpg";
	}
	else {
		document.getElementById('graffiti').src = "Photos\\"+fileNameWithOutExt+"_"+current_image+".jpg";
	}
}
