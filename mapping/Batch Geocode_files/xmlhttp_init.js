<!--
/* All code copyright David B. Zwiefelhofer. All rights reserved. No parts may be used without explicit written consent. */

	function create_xmlhttp(){
		
   //	Create a boolean variable to check for a valid Internet Explorer instance.
		var xmlhttp = false;
	//	Check if we are using IE.
		try {
	//	If the javascript version is greater than 5.
			xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
	//	If not, then use the older active x object.
			try {
	//	If we are using IE.
				xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (E) {
	//	Else we must be using a non-IE browser.
				xmlhttp = false;
			}
		}
		
	//	If we are using a non-IE browser, create a javascript instance of the object.
		if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
			xmlhttp = new XMLHttpRequest();
		}
		
		return xmlhttp;
	}
	

	//Function to process an XMLHttpRequest.
	function processajax (obj, serverPage){
		//Get an XMLHttpRequest object for use.
	//	alert("in processajax");
		var theimg;
		xmlhttp = create_xmlhttp ();
		xmlhttp.open("GET", serverPage);
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				document.getElementById(obj).innerHTML = xmlhttp.responseText;
			}
		}
		xmlhttp.send(null);
	}
	
//	-->