function load_gallery(){
	spinner.stop()
	var data=data_xml.responseXML;
	var graffitis=data.getElementsByTagName("graffiti");

	
	for (i = 0; i < graffitis.length; i++) {
		path=graffitis[i].getElementsByTagName("full_path")[0].childNodes[0].nodeValue;
		graffiti=graffitis[i].getElementsByTagName("file_name")[0].childNodes[0].nodeValue;
		graffiti_id=graffiti.substring(0,graffiti.length-4);
		
		temp=graffitis[i].getElementsByTagName("artist")[0].childNodes;
        if (temp.length>0) {artist=temp[0].nodeValue;}
        else {artist="Unknown";}
                


        // First display only horizontal pictures 1024 x 576, then horizontal 1024 x 768, then vertical 576 x 1024, finally vertical 768 x 1024	
		if ((graffitis[i].getElementsByTagName("width")[0].childNodes[0].nodeValue=="1024")&&(graffitis[i].getElementsByTagName("height")[0].childNodes[0].nodeValue=="576")) {	
			document.getElementById("gallery_canvas_hor_1").innerHTML+='<div class="w3-col m4 l3 w3-margin-bottom"><img id="'+graffiti_id+'" title="'+graffiti_id+' by '+artist+
			'" alt="'+graffiti_id+' by '+artist+'" src="'+path+'" style="width:100%" onclick="window.open('+"'graffiti.html?id="+graffiti_id+"','','')"+'"></div>\n';			
		}
        if ((graffitis[i].getElementsByTagName("width")[0].childNodes[0].nodeValue=="1024")&&(graffitis[i].getElementsByTagName("height")[0].childNodes[0].nodeValue=="768")) {	
			document.getElementById("gallery_canvas_hor_2").innerHTML+='<div class="w3-col m4 l3 w3-margin-bottom"><img id="'+graffiti_id+'" title="'+graffiti_id+' by '+artist+
			'" alt="'+graffiti_id+' by '+artist+'" src="'+path+'" style="width:100%" onclick="window.open('+"'graffiti.html?id="+graffiti_id+"','','')"+'"></div>\n';			
		}
        if ((graffitis[i].getElementsByTagName("width")[0].childNodes[0].nodeValue=="576")&&(graffitis[i].getElementsByTagName("height")[0].childNodes[0].nodeValue=="1024")) {	
			document.getElementById("gallery_canvas_ver_1").innerHTML+='<div class="w3-col m3 l2 w3-margin-bottom"><img id="'+graffiti_id+'" title="'+graffiti_id+' by '+artist+
			'" alt="'+graffiti_id+' by '+artist+'" src="'+path+'" style="width:100%" onclick="window.open('+"'graffiti.html?id="+graffiti_id+"','','')"+'"></div>\n';			
		}
        if ((graffitis[i].getElementsByTagName("width")[0].childNodes[0].nodeValue=="768")&&(graffitis[i].getElementsByTagName("height")[0].childNodes[0].nodeValue=="1024")) {	
			document.getElementById("gallery_canvas_ver_2").innerHTML+='<div class="w3-col m3 l2 w3-margin-bottom"><img id="'+graffiti_id+'" title="'+graffiti_id+' by '+artist+
			'" alt="'+graffiti_id+' by '+artist+'" src="'+path+'" style="width:100%" onclick="window.open('+"'graffiti.html?id="+graffiti_id+"','','')"+'"></div>\n';			
		}
        
        // If graffiti is removed - apply sepia filter
		graffiti_status=graffitis[i].getElementsByTagName("status")[0].childNodes;
		if (graffiti_status.length>0) {
			if (graffiti_status[0].nodeValue=="Removed") {
				document.getElementById(graffiti_id).style="width:100%;-webkit-filter:sepia(100%)";
			}
		}
	}    	  
}