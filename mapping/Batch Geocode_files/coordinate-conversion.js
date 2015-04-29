/* All code copyright David B. Zwiefelhofer. All rights reserved. No parts may be used without explicit written consent. */

	function dec_to_DMD(dec_val){
		var sign = (dec_val+0>=0) ? "" : "-";
		dec_val = Math.abs(dec_val);
		var dec_part = Math.floor(dec_val);
		var frac_part = dec_val - dec_part;
		var min_part = frac_part*60;
		min_part = Math.round(min_part*1000000)/1000000;
		return sign+dec_part+"&deg;&nbsp;"+min_part+"&#39;";
	}	

	function dec_to_DMD_lon(dec_val){
		var temp = dec_to_DMD(dec_val);
		if (temp.charAt(0) == '-'){
			temp = "W "+temp.substr(1, temp.length-1);
		} else {
			temp = "E "+temp;
		}
		return temp;
	}
	
	function dec_to_DMD_lat(dec_val){
		var temp = dec_to_DMD(dec_val);
		if (temp.charAt(0) == '-'){
			temp = "S "+temp.substr(1, temp.length-1);
		} else {
			temp = "N "+temp;
		}
		return temp;
	}
	
	function dec_to_HMS(dec_val){
		var sign = (dec_val+0>=0) ? "" : "-";
		dec_val = Math.abs(dec_val);
		var dec_part = Math.floor(dec_val);
		var frac_part = dec_val - dec_part;
		var min_part = Math.floor(frac_part*60);
		var sec_part = Math.round((((frac_part*60) - min_part) * 60)*10000)/10000;
		return sign+dec_part+"&deg;&nbsp;"+min_part+"&#39;&nbsp;"+sec_part+"&quot;";
	}
	
	function dec_to_HMS_lon(dec_val){
		var temp = dec_to_HMS(dec_val);
		if (temp.charAt(0) == '-'){
			temp = "W "+temp.substr(1, temp.length-1);
		} else {
			temp = "E "+temp;
		}
		return temp;
	}
	
	function dec_to_HMS_lat(dec_val){
		var temp = dec_to_HMS(dec_val);
		if (temp.charAt(0) == '-'){
			temp = "S "+temp.substr(1, temp.length-1);
		} else {
			temp = "N "+temp;
		}
		return temp;
	}

//	returns index of first non-numeric character or -1 if none found
	function indexOfNonNumeric(input){
		i = 0;
		while(('0123456789.'.indexOf(input.charAt(i)) != -1)&&(i<input.length)){
			i++;
		}
		return (i<input.length) ? i : -1;
	}
	
	function parse_lat_lon(val){
		var sign = "";
		var degs = "";
		var mins = "";
		var secs = "";
		var temp = trim(val);
//		write_debugging("debugging", "val: "+val+", temp: "+temp+"<br />\n", 1);


	//	acquire sign from beginning of coordinate
	//	strip off and save anything preceding first number
		var pre = "";
		i=0;
		while ((i<temp.length) && ('0123456789'.indexOf(temp.charAt(i)) == -1)){
			pre += temp.charAt(i);
			i++;
		}
		temp = temp.substr(pre.length);
		
		if (pre.length){
			pre = trim(pre);
			pre = pre.substr(0,1);
			sign = ((pre.toLowerCase() == 'w')||(pre.toLowerCase() == 's')||(pre == '-')) ? "-" : "";
		}
		
		temp = trim(temp);
		
	//	if we didn't get the sign from the beginning of the coordinate, try the end
		if (!(sign.length)){
		//	acquire sign from end of coordinate
		//	strip off and save anything following last number
			var post = "";
			i=temp.length-1;
			while ((i>=0) && ('0123456789'.indexOf(temp.charAt(i)) == -1)){
				post = temp.charAt(i)+post;
				i--;
			}
			temp = temp.substr(0, temp.length-post.length);
			
			if (post.length){
				post = trim(post);
				var post_temp = "";
				i=0;
				while (i<post.length) {
					if ('-+abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(post.charAt(i))>=0) {
						post_temp += post.charAt(i);
					}
					i++;
				}
				post = post_temp.substr(0,1);
				sign = ((post.toLowerCase() == 'w')||(post.toLowerCase() == 's')||(post == '-')) ? "-" : "";
			}
			
			temp = trim(temp);
		}
		
		var spos = indexOfNonNumeric(temp);
		if (spos > -1){
		//	coord has non-numeric in it so it must be DMS, not decimal

		//	get degrees
			degs = temp.substr(0, spos);
			temp = trim(temp.substr(degs.length));
			degs = (degs.length) ? degs : 0;
			
		//	trim off leading non-numeric
			while((temp.length) && ('0123456789'.indexOf(temp.charAt(0)) == -1)){
				temp = temp.substr(1);
			}

		//	get minutes
			spos = indexOfNonNumeric(temp);
			if (spos > -1) {
				mins = temp.substr(0, spos);
			} else {
				mins = temp;
			}
			temp = trim(temp.substr(mins.length));
			mins = (mins.length) ? mins : 0;
			
		//	trim off leading non-numeric
			while((temp.length) && ('0123456789'.indexOf(temp.charAt(0)) == -1)){
				temp = temp.substr(1);
			}
						
			secs = temp;
		//	trim off trailing non-numeric
			i = secs.length-1;
			while(('0123456789'.indexOf(secs.charAt(i)) == -1) && (i >= 0)){
				secs = secs.substr(0, secs.length-1);
				i--;
			}
			secs = (secs.length) ? secs : 0;
			
			temp = parseInt(degs) + (mins/60) + (secs/3600);
			temp = sign+temp;	
		} else {
		//	lon is decimal
			temp = sign+temp;
		}
		
		write_debugging("debugging", "temp: "+temp+"<br />\n", 1);

		return temp;
	}
