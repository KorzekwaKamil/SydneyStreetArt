function stick_menu(canvas_after_menu){
	if ((document.getElementById('full_page').scrollTop > document.getElementById('logo').offsetHeight)&&(window.innerWidth<601)) {
		document.getElementById('menu_canvas').classList.add('sticky');
		        
		if (document.getElementById('top_menu_expanded').className.indexOf("w3-show") == -1) {
			document.getElementById(canvas_after_menu).style.paddingTop="48px";
		}
		else {
			document.getElementById(canvas_after_menu).style.paddingTop="300px";
		}
	}

	if ((document.getElementById('full_page').scrollTop < document.getElementById('logo').offsetHeight)&&(window.innerWidth<601)) {
		document.getElementById('menu_canvas').classList.remove('sticky');
		document.getElementById(canvas_after_menu).style.paddingTop="0px";
        
	}
	if (window.innerWidth>600) {
		document.getElementById('menu_canvas').classList.remove('sticky');
		document.getElementById(canvas_after_menu).style.paddingTop="140px";
        
	}
};

function expand_menu() {
	var x = document.getElementById("top_menu_expanded");
		if (x.className.indexOf("w3-show") == -1) {
			x.className += " w3-show";
			document.getElementById("top_menu").classList.remove('w3-bottombar');
			document.getElementById("top_menu").classList.add('w3-border-bottom');
	} else { 
		x.className = x.className.replace(" w3-show", "");
		document.getElementById("top_menu").classList.add('w3-bottombar');
		document.getElementById("top_menu").classList.remove('w3-border-bottom');
	}
}

function back_to_top() {
	document.getElementById('full_page').scrollTop=0;
}