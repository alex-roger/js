/* All code copyright David B. Zwiefelhofer. All rights reserved. No parts may be used without explicit written consent. */

	function write_debugging(debugging_div_id, msg, conserve){
		var el = document.getElementById(debugging_div_id);
		if (el){
			el.innerHTML = (conserve) ? msg+"<br />\n"+el.innerHTML : msg;
		}
	}
