/* All code copyright David B. Zwiefelhofer. All rights reserved. No parts may be used without explicit written consent. */
	
	var num_processed = 0;
	var start_time = 0;
	var elapsed_time = 0;
	var num_unthrottled = 0;
	var timeout = null;
	
	function decrease_delay(){
		if ((num_unthrottled > 3) && (delay > delay_min)) {
			delay = 0.75*delay;
			delay = (delay < delay_min) ? delay_min : delay;
			num_unthrottled = 0;
			write_debugging("debugging", "delay decreased to "+delay+" ms<br />\n", 1);
		}
	}
	
	function initialize_accuracy_display(){
		var i = 0;
		while ($('#acc'+i+' .value_short') && (i<0)) {
			$('#acc'+i+' .value_short').text(0);
			i++;	
		}
	}

	function convert_lat(lat, type){
		switch(type){
			case 0: // degrees decimal
			//	lat = lat;
				break;
			case 1: // degrees minutes decimal
				lat = Encoder.htmlDecode(dec_to_DMD_lat(lat));
				break;
			case 2: // degrees minutes seconds decimal
				lat = Encoder.htmlDecode(dec_to_HMS_lat(lat));
				break;
			default:
			//	lat = lat;
				break;
		}
		return lat;
	}

	function convert_lon(lon, type){
		switch(type){
			case 0: // degrees decimal
			//	lon = lon;
				break;
			case 1: // degrees minutes decimal
				lon = Encoder.htmlDecode(dec_to_DMD_lon(lon));
				break;
			case 2: // degrees minutes seconds decimal
				lon = Encoder.htmlDecode(dec_to_HMS_lon(lon));
				break;
			default:
			//	lon = lon;
				break;
		}
		return lon;
	}

	var expdate = new Date();
	FixCookieDate(expdate);
	expdate.setTime(expdate.getTime() + (365*24*60*60*1000)); // expire in one year
	
	var geocoder = new google.maps.Geocoder();

	var add_in_fld = null;
	var add_out_fld = null;
	var lat_lon_in_fld = null;
	var lat_fld = null;
	var lon_fld = null;
	var accuracy_fld = null;
	var status_fld = null;
	var include_failed = null;
	var include_header = null;
//	var play_sound = null;
	
	var delay_min = 60;
	var delay = delay_min;
	var attempts = 0;
	var gdex = 0;
	var lout = "";
	
	var fld_dl = "";
	var rec_dl = "\r\n";
	var cdata = true;

	function add_result(results, status){
		timeout = null;

		var quote = (fld_dl == ",") ? "\"" : "";
		if (status == google.maps.GeocoderStatus.OK) {
			if (results[0]){
				lout += (add_in_fld) ? quote+trim(input_array[gdex])+quote : "";
				lout += (add_in_fld) ? fld_dl : "";
				lout += (add_out_fld) ? quote+results[0].formatted_address+quote : "";
				lout += (add_out_fld) ? fld_dl : "";
				
				if ((lat_fld) || (lon_fld)){
				// set the type of encoding to numerical entities e.g & instead of &
					Encoder.EncodeType = "numerical";
				}
				
				if (lat_fld) {
					var lat = 0;
					lat = convert_lat(Math.round(results[0].geometry.location.lat()*1000000)/1000000, parseInt(format));
					lout += lat;
					lout += fld_dl;
				}
				
				
				if (lon_fld) {
					var lon = 0;
					lon = convert_lon(Math.round(results[0].geometry.location.lng()*1000000)/1000000, parseInt(format));
					lout += lon;
					lout += fld_dl;
				}
				
				
				lout += (accuracy_fld) ? return_accuracy(results[0].geometry.location_type) : "";
				lout += (accuracy_fld) ? fld_dl : "";
				lout += (status_fld) ? fetch_status(status) : "";
				lout += (status_fld) ? fld_dl : "";
				
			//	fld_dl can be more than one character long
				lout = (lout.substr(lout.length-fld_dl.length) == fld_dl) ? lout.substr(0, lout.length - fld_dl.length) : lout;
			//	lout = (lout.charAt(lout.length-1) == fld_dl) ? lout.substr(0, lout.length-1) : lout;
				
				
				lout += (add_in_fld || add_out_fld || lat_fld || lon_fld || accuracy_fld || status_fld) ? rec_dl : "";
			//	op_el.innerHTML += lout;
				op_el.value += lout;
				lout = "";
				
				attempts = 0;
				gdex++;
			//	accuracy[results[0].geometry.location_type][0] += 1;
			//	write_accuracy(response.Placemark[0].AddressDetails.Accuracy, accuracy[response.Placemark[0].AddressDetails.Accuracy][0]);
				write_accuracy(results[0].geometry.location_type);
				num_processed++;
				write_report_row("processed", "Processed", num_processed);
				num_unthrottled++;
				decrease_delay();
			}
		} else if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
			attempts += 1;
			num_unthrottled = 0;
			write_debugging("debugging", "attempts: "+attempts+"<br />\n", 1);
			if (attempts > 20){
				write_debugging("debugging", "attempts ("+attempts+") exceeded limit, bailing on this record ("+gdex+")<br />\n", 1);
				
				if (include_failed) {
					lout += (add_in_fld) ? quote+trim(input_array[gdex])+quote : "";
					lout += (add_in_fld) ? fld_dl : "";
					lout += (add_out_fld) ? quote+quote : "";
					lout += (add_out_fld) ? fld_dl : "";
					lout += (lat_fld) ? fld_dl : "";
					lout += (lon_fld) ? fld_dl : "";
					lout += (accuracy_fld) ? fld_dl : "";
					lout += (status_fld) ? fetch_status(status) : "";
					lout += (status_fld) ? fld_dl : "";
					lout = (lout.substr(lout.length-fld_dl.length) == fld_dl) ? lout.substr(0, lout.length - fld_dl.length) : lout;
				//	lout = (lout.charAt(lout.length-1) == fld_dl) ? lout.substr(0, lout.length-1) : lout;
					lout += (add_in_fld || add_out_fld || lat_fld || lon_fld || accuracy_fld || status_fld) ? rec_dl : "";
				//	op_el.innerHTML += lout;
					op_el.value += lout;
					lout = "";
				}
//				op_el.innerHTML += (include_failed) ? "\""+response.name+"\",\"\",,,,status: "+response.Status.code+"<br />\n" : "";
				
				gdex++;
				attempts = 0;
			//	accuracy[0][0] += 1;
			//	write_accuracy(0, accuracy[0][0]);
				write_accuracy(results[0].geometry.location_type);
				num_processed++;
				write_report_row("processed", "Processed", num_processed);
			} else {
				delay = 2*delay;
				write_debugging("debugging", "delay increased to "+delay+" ms<br />\n", 1);
			}
		} else {
			if (include_failed) {
				lout += (add_in_fld) ? quote+trim(input_array[gdex])+quote : "";
				lout += (add_in_fld) ? fld_dl : "";
				lout += (add_out_fld) ? quote+quote : "";
				lout += (add_out_fld) ? fld_dl : "";
				lout += (lat_fld) ? fld_dl : "";
				lout += (lon_fld) ? fld_dl : "";
				lout += (accuracy_fld) ? fld_dl : "";
				lout += (status_fld) ? fetch_status(status) : "";
				lout += (status_fld) ? fld_dl : "";
				lout = (lout.substr(lout.length-fld_dl.length) == fld_dl) ? lout.substr(0, lout.length - fld_dl.length) : lout;
			//	lout = (lout.charAt(lout.length-1) == fld_dl) ? lout.substr(0, lout.length-1) : lout;
				lout += (add_in_fld || add_out_fld || lat_fld || lon_fld || accuracy_fld || status_fld) ? rec_dl : "";
			//	op_el.innerHTML += lout;
				op_el.value += lout;
				lout = "";
			}
		//	op_el.innerHTML += (include_failed) ? "\""+response.name+"\",\"\",,,,status: "+response.Status.code+"<br />\n" : "";
			gdex++;
			attempts = 0;
		//	accuracy[0][0] += 1;
		//	write_accuracy(0, accuracy[0][0]);
			write_accuracy('FAIL');
			num_processed++;
			write_report_row("processed", "Processed", num_processed);
			write_debugging("debugging", "geocode failed on index "+gdex+"<br />\n", 1);
			num_unthrottled++;
			decrease_delay();
		}
		write_time();
		geocode_one_record();
	}
	
	var input_array = new Array();
	var op_el;
	
	function preprocess(){
		add_in_fld = document.form1.add_in_fld.checked;
		add_out_fld = document.form1.add_out_fld.checked;
		lat_fld = document.form1.lat_fld.checked;
		lon_fld = document.form1.lon_fld.checked;
		accuracy_fld = document.form1.accuracy_fld.checked;
		status_fld = document.form1.status_fld.checked;
		include_failed = document.form1.include_failed.checked;
		include_header = document.form1.include_header.checked;
	//	play_sound = document.form1.play_sound.checked;
		input_array = document.form1.batch_in.value.split("\n");
		num_processed = 0;
		var d = new Date();
		start_time = d.getTime();
		elapsed_time = 0;
		var quote = (fld_dl == ",") ? "\"" : "";
		op_el.value = "";
		if (include_header){
			if (add_in_fld) {
				op_el.value += (op_el.value.length) ? fld_dl : "";
				op_el.value += quote+"original address"+quote;
			}
			if (add_out_fld) {
				op_el.value += (op_el.value.length) ? fld_dl : "";
				op_el.value += quote+"returned address"+quote;
			}
			if (lat_fld) {
				op_el.value += (op_el.value.length) ? fld_dl : "";
				op_el.value += "latitude";
			}
			if (lon_fld) {
				op_el.value += (op_el.value.length) ? fld_dl : "";
				op_el.value += "longitude";
			}
			if (accuracy_fld) {
				op_el.value += (op_el.value.length) ? fld_dl : "";
				op_el.value += "accuracy";
			}
			if (status_fld) {
				op_el.value += (op_el.value.length) ? fld_dl : "";
				op_el.value += "status code";
			}
			op_el.value += (op_el.value.length) ? rec_dl : "";
		}
	}
	
	function geocode_one_record(){
		while ((gdex < input_array.length) && (input_array[gdex].length==0)){
			gdex++;
		}
		if (!pause) {
			if (gdex < input_array.length) {
				if (!timeout) {
					timeout = setTimeout("geocoder.geocode({'address':trim(input_array[gdex])}, add_result)", delay);
				}
			} else {
	
			//	insert record keeping here
				write_debugging("debugging", "elapsed_time: "+elapsed_time+"<br />\n", 1);
				if (!document.getElementById("debugging")){
					record_run();
				}
				$('#geocode_btn').val('geocode');
				set_indicator('complete');
			}
		}
	}
	
	function do_geocode(){
		initialize_accuracy_display();
		op_el = document.form1.batch_out;
		sp = 0;
		preprocess();
		if (input_array.length) {
			gdex = 0;
			geocode_one_record();
		}
	}
	

	function add_reverse_result(results, status){
		timeout = null;
		var coords_in;
		var quote = (fld_dl == ",") ? "\"" : "";
		if (status == google.maps.GeocoderStatus.OK) {
			if (results[0]) {
				
	/*			lout += (lat_lon_in_fld) ? response.name.replace(",", fld_dl) : "";
				lout += (lat_lon_in_fld) ? fld_dl : "";*/
				if (lat_lon_in_fld){
				//	coords_in = response.name.split(",");
				
				//	lout += convert_lat(Math.round(input_array[gdex][0]*1000000)/1000000, parseInt(format));
					lout += convert_lat(input_array[gdex][0], parseInt(format));
					lout += (lat_lon_in_fld) ? fld_dl : "";
					
				//	lout += convert_lon(Math.round(input_array[gdex][1]*1000000)/1000000, parseInt(format));
					lout += convert_lon(input_array[gdex][1], parseInt(format));
					lout += (lat_lon_in_fld) ? fld_dl : "";
				}
				
				
				lout += (add_out_fld) ? quote+results[0].formatted_address+quote : "";
				lout += (add_out_fld) ? fld_dl : "";
				
				if ((lat_fld) || (lon_fld)){
				// set the type of encoding to numerical entities e.g & instead of &
					Encoder.EncodeType = "numerical";
				}
				
				if (lat_fld) {
					var lat = 0;
					lat = convert_lat(Math.round(results[0].geometry.location.lat()*1000000)/1000000, parseInt(format));
					lout += lat;
					lout += fld_dl;
				}
				
				
				if (lon_fld) {
					var lon = 0;
					lon = convert_lon(Math.round(results[0].geometry.location.lng()*1000000)/1000000, parseInt(format));
					lout += lon;
					lout += fld_dl;
				}
				
				
				lout += (accuracy_fld) ? return_accuracy(results[0].geometry.location_type) : "";
				lout += (accuracy_fld) ? fld_dl : "";
				lout += (status_fld) ? fetch_status(status) : "";
				lout += (status_fld) ? fld_dl : "";
				
			//	fld_dl can be more than one character long
				lout = (lout.substr(lout.length-fld_dl.length) == fld_dl) ? lout.substr(0, lout.length - fld_dl.length) : lout;
			//	lout = (lout.charAt(lout.length-1) == fld_dl) ? lout.substr(0, lout.length-1) : lout;
				
				
				lout += (lat_lon_in_fld || add_out_fld || lat_fld || lon_fld || accuracy_fld || status_fld) ? rec_dl : "";
			//	op_el.innerHTML += lout;
				op_el.value += lout;
				lout = "";
				
				attempts = 0;
				gdex++;
				write_accuracy(results[0].geometry.location_type);
				num_processed++;
				write_report_row("processed", "Processed", num_processed);
				num_unthrottled++;
				decrease_delay();
			}
		} else if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
			attempts += 1;
			num_unthrottled = 0;
			write_debugging("debugging", "attempts: "+attempts+"<br />\n", 1);
			if (attempts > 20){
				write_debugging("debugging", "attempts ("+attempts+") exceeded limit, bailing on this record ("+gdex+")<br />\n", 1);
				
				if (include_failed) {
/*					lout += (lat_lon_in_fld) ? response.name.replace(",", fld_dl) : "";
					lout += (lat_lon_in_fld) ? fld_dl : "";*/
					if (lat_lon_in_fld){
						lout += convert_lat(Math.round(input_array[gdex][0]*1000000)/1000000, parseInt(format));
						lout += (lat_lon_in_fld) ? fld_dl : "";
						
						lout += convert_lon(Math.round(input_array[gdex][1]*1000000)/1000000, parseInt(format));
						lout += (lat_lon_in_fld) ? fld_dl : "";
					}

					lout += (add_out_fld) ? quote+quote : "";
					lout += (add_out_fld) ? fld_dl : "";
					lout += (lat_fld) ? fld_dl : "";
					lout += (lon_fld) ? fld_dl : "";
					lout += (accuracy_fld) ? fld_dl : "";
					lout += (status_fld) ? fetch_status(status) : "";
					lout += (status_fld) ? fld_dl : "";
					lout = (lout.substr(lout.length-fld_dl.length) == fld_dl) ? lout.substr(0, lout.length - fld_dl.length) : lout;
				//	lout = (lout.charAt(lout.length-1) == fld_dl) ? lout.substr(0, lout.length-1) : lout;
					lout += (lat_lon_in_fld || add_out_fld || lat_fld || lon_fld || accuracy_fld || status_fld) ? rec_dl : "";
				//	op_el.innerHTML += lout;
					op_el.value += lout;
					lout = "";
				}
//				op_el.innerHTML += (include_failed) ? "\""+response.name+"\",\"\",,,,status: "+response.Status.code+"<br />\n" : "";
				
				gdex++;
				attempts = 0;
				write_accuracy(results[0].geometry.location_type);
				num_processed++;
				write_report_row("processed", "Processed", num_processed);
			} else {
				delay = 2*delay;
				write_debugging("debugging", "delay increased to "+delay+" ms<br />\n", 1);
			}
		} else {
			if (include_failed) {
			//	lout += (lat_lon_in_fld) ? response.name.replace(",", fld_dl) : "";
				if (lat_lon_in_fld){
					lout += convert_lat(Math.round(input_array[gdex][0]*1000000)/1000000, parseInt(format));
					lout += (lat_lon_in_fld) ? fld_dl : "";
					
					lout += convert_lon(Math.round(input_array[gdex][1]*1000000)/1000000, parseInt(format));
					lout += (lat_lon_in_fld) ? fld_dl : "";
				}
			//	lout += (lat_lon_in_fld) ? quote+response.name+quote : "";
				lout += (lat_lon_in_fld) ? fld_dl : "";
				lout += (add_out_fld) ? quote+quote : "";
				lout += (add_out_fld) ? fld_dl : "";
				lout += (lat_fld) ? fld_dl : "";
				lout += (lon_fld) ? fld_dl : "";
				lout += (accuracy_fld) ? fld_dl : "";
				lout += (status_fld) ? fetch_status(status) : "";
				lout += (status_fld) ? fld_dl : "";
				lout = (lout.substr(lout.length-fld_dl.length) == fld_dl) ? lout.substr(0, lout.length - fld_dl.length) : lout;
			//	lout = (lout.charAt(lout.length-1) == fld_dl) ? lout.substr(0, lout.length-1) : lout;
				lout += (lat_lon_in_fld || add_out_fld || lat_fld || lon_fld || accuracy_fld || status_fld) ? rec_dl : "";
			//	op_el.innerHTML += lout;
				op_el.value += lout;
				lout = "";
			}
		//	op_el.innerHTML += (include_failed) ? "\""+response.name+"\",\"\",,,,status: "+response.Status.code+"<br />\n" : "";
			gdex++;
			attempts = 0;
			write_accuracy(results[0].geometry.location_type);
			num_processed++;
			write_report_row("processed", "Processed", num_processed);
			write_debugging("debugging", "geocode failed on index "+gdex+"<br />\n", 1);
			num_unthrottled++;
			decrease_delay();
		}
		write_time();
		reverse_geocode_one_record();
	}

	function preprocess_reverse(){
		lat_lon_in_fld = document.form1.lat_lon_in_fld.checked;
		add_out_fld = document.form1.add_out_fld.checked;
		lat_fld = document.form1.lat_fld.checked;
		lon_fld = document.form1.lon_fld.checked;
		accuracy_fld = document.form1.accuracy_fld.checked;
		status_fld = document.form1.status_fld.checked;
		include_failed = document.form1.include_failed.checked;
		include_header = document.form1.include_header.checked;
	//	play_sound = document.form1.play_sound.checked;
		input_array = document.form1.batch_in.value.split("\n");
		for (i=0; i<input_array.length; i++){
			input_array[i] = input_array[i].split(",");
		}
		num_processed = 0;
		var d = new Date();
		start_time = d.getTime();
		elapsed_time = 0;
		var quote = (fld_dl == ",") ? "\"" : "";
		op_el.value = "";
		if (include_header){
			if (lat_lon_in_fld) {
				op_el.value += (op_el.value.length) ? fld_dl : "";
				op_el.value += "original latitude";
				op_el.value += (op_el.value.length) ? fld_dl : "";
				op_el.value += "original longitude";
			}
			if (add_out_fld) {
				op_el.value += (op_el.value.length) ? fld_dl : "";
				op_el.value += quote+"returned address"+quote;
			}
			if (lat_fld) {
				op_el.value += (op_el.value.length) ? fld_dl : "";
				op_el.value += "returned latitude";
			}
			if (lon_fld) {
				op_el.value += (op_el.value.length) ? fld_dl : "";
				op_el.value += "returned longitude";
			}
			if (accuracy_fld) {
				op_el.value += (op_el.value.length) ? fld_dl : "";
				op_el.value += "accuracy";
			}
			if (status_fld) {
				op_el.value += (op_el.value.length) ? fld_dl : "";
				op_el.value += "status code";
			}
			op_el.value += (op_el.value.length) ? rec_dl : "";
		}
	}
	
	var latlng = null;
	
	function reverse_geocode_one_record(){
		write_debugging("debugging", gdex, true);
		while ((gdex < input_array.length) && ( (typeof input_array[gdex] == 'undefined') || (typeof input_array[gdex][0] == 'undefined') || (typeof input_array[gdex][1] == 'undefined') || (input_array[gdex].length == 0) || (input_array[gdex][0].length==0) || (input_array[gdex][1].length==0) )){
			gdex++;
		}
		if (!pause) {
			if (gdex < input_array.length) {
				write_debugging("debugging", input_array[gdex], true);
				if (input_array[gdex][0].length && input_array[gdex][1].length) {
					latlng = new google.maps.LatLng(parse_lat_lon(trim(input_array[gdex][0])), parse_lat_lon(trim(input_array[gdex][1])));
					if (!timeout) {
						timeout = setTimeout("geocoder.geocode({'latLng' : latlng}, add_reverse_result)", delay);
					}
				} else {
					alert("bad formatting");
				}
			} else {
	
			//	insert record keeping here
				write_debugging("debugging", "elapsed_time: "+elapsed_time+"<br />\n", 1);
				if (!document.getElementById("debugging")){
					record_reverse_run();
				}

				$('#geocode_btn').val('geocode');
				set_indicator('complete');
			}
		}
	}
	
	function do_reverse_geocode(){
		initialize_accuracy_display();
		op_el = document.form1.batch_out;
		sp = 0;
		preprocess_reverse();
		if (input_array.length) {
			gdex = 0;
			reverse_geocode_one_record();
		}
	}
	
	function set_cookie_cval(cb){
		var val = (cb.checked) ? 1 : 0;
		SetCookie(cb.name,val,expdate);
	}
	
	function set_cookie_sval(sel){
		SetCookie(sel.name,sel.options[sel.selectedIndex].value,expdate);
		write_debugging("debugging", "sel.name: "+sel.name+"<br />\n", 1);
	}
	
	function set_delimiter(val){
		switch(parseInt(val)){
			case 0:
				fld_dl = ",";
				break;
			case 1:
				fld_dl = "|";
				break;
			case 2:
				fld_dl = "\t";
				break;
			default:
				fld_dl = ",";
				break;
		}
		write_debugging("debugging", "delimiter: "+document.form1.delimiter.options[document.form1.delimiter.selectedIndex].value+"<br />\n", 1);
	}

	function onDelimiterChange(sel){
		set_cookie_sval(sel);
		set_delimiter(sel.options[sel.selectedIndex].value);
	}

	function onFormatChange(sel){
		set_cookie_sval(sel);
		format = sel.options[sel.selectedIndex].value;
		write_debugging("debugging", "format: "+format+"<br />\n", 1);
	}

	function write_report_row(id, label, value){
		var el = document.getElementById(id);
		el.innerHTML = "<span class=\"label_short\">"+label+":</span><span class=\"value_short\">"+value+"</span>";
	}

	function write_accuracy_o(index, acc){
		write_report_row("acc"+index, "Accuracy "+index, acc);
	}
	
	function increment_val(selector) {
		$(selector).text(parseInt($(selector).text())+1);
	}
	
	function write_accuracy(val) {
		switch(val) {
			case 'ROOFTOP':
				increment_val('#acc0 .value_short');
				break;	
			case 'RANGE_INTERPOLATED':
				increment_val('#acc1 .value_short');
				break;	
			case 'GEOMETRIC_CENTER':
				increment_val('#acc2 .value_short');
				break;	
			case 'APPROXIMATE':
				increment_val('#acc3 .value_short');
				break;	
			case 'FAIL':
				increment_val('#acc4 .value_short');
				break;	
		}
	}

	function write_time(){
		var d = new Date();
		var t = (d.getTime()-start_time);
		elapsed_time = t;
		t = t/1000;
		t = (t < 1.0) ? t.toFixed(3) : t.toPrecision(4);
		write_report_row("time", "Time", t+" s");
	}

	function record_run(){
		var xmlhttp = create_xmlhttp();
		var d = new Date();
		serverPage = "http://"+host+"/processors/record-run.php?num="+num_processed+"&elapsed="+elapsed_time+"&sescod="+sescod+"&time="+d.getTime();
		xmlhttp.open("GET", serverPage, true); // asynch param set to false for synch requests, true for asynch
		
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				var response = xmlhttp.responseText;
			} else if (xmlhttp.readyState == 4 && xmlhttp.status != 200){
			}
		}

		xmlhttp.send(null);
	}
	
	function record_reverse_run(){
		var xmlhttp = create_xmlhttp();
		var d = new Date();
		serverPage = "http://"+host+"/processors/record-reverse-run.php?num="+num_processed+"&elapsed="+elapsed_time+"&sescod="+sescod+"&time="+d.getTime();
		xmlhttp.open("GET", serverPage, true); // asynch param set to false for synch requests, true for asynch
		
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				var response = xmlhttp.responseText;
			} else if (xmlhttp.readyState == 4 && xmlhttp.status != 200){
			}
		}

		xmlhttp.send(null);
	}

	function return_accuracy(val) {
		switch(val) {
			case 'ROOFTOP':
				return 9;	
			case 'RANGE_INTERPOLATED':
				return 8;	
			case 'GEOMETRIC_CENTER':
				return 5;
				break;	
			case 'APPROXIMATE':
				return 3;
				break;	
			case 'FAIL':
				return 0;	
		}
	}

	function set_indicator(state) {
		switch(state) {
			case('running'):
				$('#indicator').attr('src', 'http://'+host+'/images/waiting-16.gif');
				break;
			case('paused'):
				$('#indicator').attr('src', 'http://'+host+'/images/pause-16x16.gif');
				break;
			case('complete'):
				$('#indicator').attr('src', 'http://'+host+'/images/good-16x16.gif');
				break;
			default:
				$('#indicator').attr('src', 'http://'+host+'/images/pix.gif');
				break;
		}
	}