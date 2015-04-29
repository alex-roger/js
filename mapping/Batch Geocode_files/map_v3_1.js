/* All code copyright David B. Zwiefelhofer. All rights reserved. No parts may be used without explicit written consent. */

	function init_map() {
		var image = {
			url: "http://"+host+"/images/blue-circle.png",
			size: new google.maps.Size(34, 34),
			origin: new google.maps.Point(0,0),
			anchor: new google.maps.Point(15,15),
			scaledSize: new google.maps.Size(34, 34)
		};
		var image_shadow = {
			url: "http://"+host+"/images/blue-circle-shadow.png",
			size: new google.maps.Size(34, 34),
			origin: new google.maps.Point(0,0),
			anchor: new google.maps.Point(15,15),
			scaledSize: new google.maps.Size(34, 34)
		};
		
		var mapOptions = {
		  zoom: zoom,
		  center: init_latlng,
		  draggableCursor:'crosshair',
		  anchorPoint:new google.maps.Point(15, 15),
		  mapTypeId: eval("google.maps.MapTypeId."+map_type),
		  scaleControl: true,
		  overviewMapControl: true,
		  overviewMapControlOptions:{opened:true}
		}
		map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
		
		marker = new google.maps.Marker({
			position: init_latlng,
			icon: image,
			shadow: image_shadow
		});
		
		geocoder = new google.maps.Geocoder();
		
		// To add the marker to the map, call setMap();
		marker.setMap(map);

		google.maps.event.addListener(map, 'mouseout', function(event) {
			document.getElementById("dyn_lat_HMS").innerHTML = "<span class=\"label\">Latitude:</span><span class=\"value\">cursor off map</span>";
			document.getElementById("dyn_lon_HMS").innerHTML = "<span class=\"label\">Longitude:</span><span class=\"value\">cursor off map</span>";
			document.getElementById("dyn_lat_DMD").innerHTML = "<span class=\"label\">Latitude:</span><span class=\"value\"></span>";
			document.getElementById("dyn_lon_DMD").innerHTML = "<span class=\"label\">Longitude:</span><span class=\"value\"></span>";
			document.getElementById("dyn_lat").innerHTML = "<span class=\"label\">Latitude:</span><span class=\"value\"></span>";
			document.getElementById("dyn_lon").innerHTML = "<span class=\"label\">Longitude:</span><span class=\"value\"></span>";
		});

		google.maps.event.addListener(map, 'mousemove', function(event) {
			document.getElementById("dyn_lat_HMS").innerHTML = "<span class=\"label\">Latitude:</span><span class=\"value redbrown\">"+dec_to_HMS_lat(event.latLng.lat())+"</span>";
			document.getElementById("dyn_lon_HMS").innerHTML = "<span class=\"label\">Longitude:</span><span class=\"value redbrown\">"+dec_to_HMS_lon(event.latLng.lng())+"</span>";
			document.getElementById("dyn_lat_DMD").innerHTML = "<span class=\"label\">Latitude:</span><span class=\"value olive\">"+dec_to_DMD_lat(event.latLng.lat())+"</span>";
			document.getElementById("dyn_lon_DMD").innerHTML = "<span class=\"label\">Longitude:</span><span class=\"value olive\">"+dec_to_DMD_lon(event.latLng.lng())+"</span>";
			
		//	document.getElementById("dyn_lat").innerHTML = "<span class=\"label\">Latitude:</span><span class=\"value\">" + (Math.round(event.latLng.lat()*1000000)/1000000)+ "&deg;</span>";
			var dyn_lat = "<span class=\"label\">Latitude:</span><span class=\"value\">";
			dyn_lat += (Math.round(event.latLng.lat()*1000000)/1000000);
			dyn_lat += "&deg;</span>";
			document.getElementById("dyn_lat").innerHTML = dyn_lat;
			
		//	document.getElementById("dyn_lon").innerHTML = "<span class=\"label\">Longitude:</span><span class=\"value\">"+(Math.round(event.latLng.lng()*1000000)/1000000)+"&deg;</span>";
			var dyn_lon = "<span class=\"label\">Longitude:</span><span class=\"value\">";
			dyn_lon += (Math.round(event.latLng.lng()*1000000)/1000000);
			dyn_lon += "&deg;</span>";
			document.getElementById("dyn_lon").innerHTML = dyn_lon;
		});

		google.maps.event.addListener(map, 'click', function(event){ 
			get_address(event.latLng);
		});

		google.maps.event.addListener(map, 'zoom_changed', function(oldZoomLevel, newZoomLevel) {
			var newZoomLevel = map.getZoom();
			element = document.getElementById("zoom_display");
			element.innerHTML = "<span class=\"label\">Zoom:</span><span class=\"value\">"+newZoomLevel+"</span>";
			SetCookie("map1_zoom", newZoomLevel, exp);
			update_current_link();;
		});

		google.maps.event.addListener(map, 'maptypeid_changed', function() {
			var map_type_name = map.getMapTypeId();
			document.getElementById("map_type_span").innerHTML = "<span class=\"label\">Type:</span><span class=\"value\">"+map_type_name+"</span>";	
			save_map_type();
			update_current_link();
		});

	}

	function init_reverse_map() {
		var image = {
			url: "http://"+host+"/images/blue-circle.png",
			size: new google.maps.Size(34, 34),
			origin: new google.maps.Point(0,0),
			anchor: new google.maps.Point(15,15),
			scaledSize: new google.maps.Size(34, 34)
		};
		var image_shadow = {
			url: "http://"+host+"/images/blue-circle-shadow.png",
			size: new google.maps.Size(34, 34),
			origin: new google.maps.Point(0,0),
			anchor: new google.maps.Point(15,15),
			scaledSize: new google.maps.Size(34, 34)
		};
		
		var mapOptions = {
		  zoom: zoom,
		  center: init_latlng,
		  draggableCursor:'crosshair',
		  anchorPoint:new google.maps.Point(15, 15),
		  mapTypeId: eval("google.maps.MapTypeId."+map_type),
		  scaleControl: true,
		  overviewMapControl: true,
		  overviewMapControlOptions:{opened:true}
		}
		map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
		
		marker = new google.maps.Marker({
			position: init_latlng,
			icon: image,
			shadow: image_shadow
		});
		
		geocoder = new google.maps.Geocoder();
		
		
		// To add the marker to the map, call setMap();
		marker.setMap(map);


		google.maps.event.addListener(map, 'click', function(event){ get_address_rev(event.latLng); });

		google.maps.event.addListener(map, 'zoom_changed', function(oldZoomLevel, newZoomLevel) {
			var newZoomLevel = map.getZoom();
			SetCookie("map1_zoom", newZoomLevel, exp);
		});

		google.maps.event.addListener(map, 'maptypeid_changed', function() {
			save_map_type();
		});

	}

	function init_search_map() {
		var image = {
			url: "http://"+host+"/images/blue-circle.png",
			size: new google.maps.Size(34, 34),
			origin: new google.maps.Point(0,0),
			anchor: new google.maps.Point(15,15),
			scaledSize: new google.maps.Size(34, 34)
		};
		var image_shadow = {
			url: "http://"+host+"/images/blue-circle-shadow.png",
			size: new google.maps.Size(34, 34),
			origin: new google.maps.Point(0,0),
			anchor: new google.maps.Point(15,15),
			scaledSize: new google.maps.Size(34, 34)
		};
		
		var mapOptions = {
		  zoom: zoom,
		  center: init_latlng,
		  draggableCursor:'crosshair',
		  anchorPoint:new google.maps.Point(15, 15),
		  mapTypeId: eval("google.maps.MapTypeId."+map_type),
		  scaleControl: true,
		  overviewMapControl: true,
		  overviewMapControlOptions:{opened:true}
		}
		map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
		
		marker = new google.maps.Marker({
			position: init_latlng,
			icon: image,
			shadow: image_shadow
		});
		
		geocoder = new google.maps.Geocoder();
		
		
		// To add the marker to the map, call setMap();
		marker.setMap(map);

		google.maps.event.addListener(map, 'click', function(event){ 
			get_address(event.latLng);
		//	set_address_db(event.latlng)
		//	set_point(event.latLng);
		});

		google.maps.event.addListener(map, 'zoom_changed', function(oldZoomLevel, newZoomLevel) {
			var newZoomLevel = map.getZoom();
			SetCookie("map1_zoom", newZoomLevel, exp);
		});

		google.maps.event.addListener(map, 'maptypeid_changed', function() {
			save_map_type();
		});

	}

	function fetch_accuracy(str) {
		var accuracy = 0;
		switch (str) {
			case 'ROOFTOP':
				accuracy = 9;
				break;
			
			case 'RANGE_INTERPOLATED':
				accuracy = 8;
				break;
			
			case 'GEOMETRIC_CENTER':
				accuracy = 6;
				break;
			
			case 'APPROXIMATE':
				accuracy = 5;
				break;
			
			default:
				accuracy = 0;
				break;	
		}
		return accuracy;
	}

	function fetch_status(str){
		switch (str) {
			case 'OK':
				status = 200;
				break;
			
			case 'INVALID_REQUEST':
				status = 601;
				break;
			
			case 'ZERO_RESULTS':
				status = 602;
				break;
			
			case 'OVER_QUERY_LIMIT':
				status = 620;
				break;
			
			case 'REQUEST_DENIED':
				status = 610;
				break;
			
			default:
				status = 404;
				break;	
		}
		return status;
	}

	function update_current_link(){
		if (document.getElementById("current_link_span")) {
		//	var lat = GetCookie("map1_lat");
			var lat = Math.round(GetCookie("map1_lat")*1000000)/1000000;
		//	var lon = GetCookie("map1_lon");
			var lon = Math.round(GetCookie("map1_lon")*1000000)/1000000;
			var zoom = GetCookie("map1_zoom");
			var map_type = GetCookie("map1_map_type");
			var linkstr = "<a href=\"http://"+host+"/?lat="+lat+"&lon="+lon+"&zoom="+zoom+"&map_type="+map_type+"\">link</a>";
			document.getElementById("current_link_span").innerHTML = "<span class=\"label\">current link:</span><span class=\"value\">"+linkstr+"</span>";
		}
	}
	
	function get_geocode_status_text(code){
		var code_text = "";
		switch(code){
			case 200:
				code_text = "Successful geocode.";
				break;
			case 400:
				code_text = "Bad request.";
				break;
			case 500:
				code_text = "Geocode failed. Reason unknown.";
				break;
			case 601:
				code_text = "Geocode failed. Location empty.";
				break;
			case 602:
				code_text = "Geocode failed. Unknown location.";
				break;
			case 603:
				code_text = "Geocode denied due to legal constraints.";
				break;
			case 604:
				code_text = "Geocode failed. Unknown directions.";
				break;
			case 610:
				code_text = "Geocode failed. Invalid API key.";
				break;
			case 620:
				code_text = "Geocode failed. Request limit exceeded.";
				break;
			default:
				code_text = "";
				break;
		}
		return code_text;
	}
	
	function get_geocode_accuracy_text(code){
		var code_text = "";
		switch(code){
			case 0:
				code_text = "Unknown location.";
				break;
			case 1:
				code_text = "Country level.";
				break;
			case 2:
				code_text = "Region (state, province, etc.) level.";
				break;
			case 3:
				code_text = "Sub-region (county, municipality, etc.) level.";
				break;
			case 4:
				code_text = "Town (city, village) level.";
				break;
			case 5:
				code_text = "Post code level.";
				break;
			case 6:
				code_text = "Street level.";
				break;
			case 7:
				code_text = "Intersection level.";
				break;
			case 8:
				code_text = "Address level.";
				break;
			case 9:
				code_text = "Premise (building name, property name, etc.) level.";
				break;
			default:
				code_text = "";
				break;
		}
		return code_text;
	}
	
	function good_lat(lat){
		if (is_num(lat)){
			return ((lat > 90) || (lat < -90)) ? false : true;
		} else {
			return false;
		}
	}
	
	function good_lon(lon){
		if (is_num(lon)){
			return ((lon > 180) || (lon < -180)) ? false : true;
		} else {
			return false;
		}
	}
	
	function load_latitude_longitude(lat, lon){
		var point = new google.maps.LatLng(lat, lon);
		map.setCenter(point);
		SetCookie("map1_lat", lat, exp);
		SetCookie("map1_lon", lon, exp);
		document.getElementById("lat_HMS").innerHTML = "<span class=\"label\">Latitude:</span><span class=\"value redbrown\">"+dec_to_HMS_lat(lat)+"</span>";	
		document.getElementById("lon_HMS").innerHTML = "<span class=\"label\">Longitude:</span><span class=\"value redbrown\">"+dec_to_HMS_lon(lon)+"</span>";	
		document.getElementById("lat_DMD").innerHTML = "<span class=\"label\">Latitude:</span><span class=\"value olive\">"+dec_to_DMD(lat)+"</span>";	
		document.getElementById("lon_DMD").innerHTML = "<span class=\"label\">Longitude:</span><span class=\"value olive\">"+dec_to_DMD(lon)+"</span>";	
		document.getElementById("lat_dec").innerHTML = "<span class=\"label\">Latitude:</span><span class=\"value\">"+lat+"&deg;</span>";	
		document.getElementById("lon_dec").innerHTML = "<span class=\"label\">Longitude:</span><span class=\"value\">"+lon+"&deg;</span>";	

	//	move the marker
		marker.setPosition(point);

		update_current_link();
	}
	
/*	First geocode the address, then if we have a valid result, load the resulting lat lon. */	
	function load_address(address){
		if (address.length){
			var xmlhttp = create_xmlhttp();
			var d = new Date();

			document.getElementById("load_address_button").src = "http://"+host+"/images/waiting-16.gif";
			serverPage = "http://"+host+"/processors/geocode-address-tweet-v3.php?loc="+address+"&time="+d.getTime();
		//	serverPage = "http://"+host+"/processors/geocode-address.php?loc="+address+"&time="+d.getTime();
			
			if (debugging) {
				document.getElementById("debugging").innerHTML = serverPage+"<br />"+document.getElementById("debugging").innerHTML;
			}
			
			xmlhttp.open("GET", serverPage, true); // asynch param set to false for synch requests, true for asynch
		
			document.getElementById("load_rep").innerHTML = "";
			
		//	the following is executed when fetch-zip-lat-lon.php returns
			xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					var response = xmlhttp.responseText;
					if (response.length > 0){
						if (debugging){
							document.getElementById("debugging").innerHTML = response +"<br />"+document.getElementById("debugging").innerHTML;
						}
						eval(response);
					//	document.getElementById("load_rep").innerHTML = "Location successfully loaded.";
					} else {
						document.getElementById("load_rep").innerHTML = "Location geocode failed!";
					}
					//document.load_location.load_address_button.src = "http://"+host+"/images/load-button.png";
					document.getElementById("load_address_button").src = "http://"+host+"/images/load-button.png";
				} else if (xmlhttp.readyState == 4 && xmlhttp.status != 200){
					document.getElementById("load_rep").innerHTML = "Error geocoding, status: "+xmlhttp.status;
				//	document.load_location.load_address_button.src = "http://"+host+"/images/load-button.png";
					document.getElementById("load_address_button").src = "http://"+host+"/images/load-button.png";
				}
			}
	
			xmlhttp.send(null);
		} else {
			alert("Please provide an address, city or other parameter in the \"Location\" field.");
		}
	}

	function load_latlon(lat, lon, store_geocode_in){
		var lat_result = good_lat(lat);
		var lon_result = good_lon(lon);
		if (lat_result && lon_result){
			store_geocode = store_geocode_in; //  we only want to save geocodes from explicit lat/lon queries, not clicks, etc.
			get_address(new google.maps.LatLng(lat, lon));
			SetCookie("map1_lat", lat, exp);
			SetCookie("map1_lon", lon, exp);
			if (document.getElementById("load_rep")) {
				document.getElementById("load_rep").innerHTML = "Latitude and longitude loaded.";
			}
		} else {
			var msg = "";
			if (!lat_result){
				msg += "The latitude must not be less than -90 nor greater than 90. ";
			}
			if (!lon_result){
				msg += "The longitude must not be less than -180 nor greater than 180. ";
			}
			alert("Please enter decimal values for the latitude and longitude. "+msg);
		}
	}
	
	function dispatch_main_form() {
		var fm = document.load_location;
		if (fm.address.hasFocus) {
			load_address(fm.address.value);
		} else if (fm.zipcode.hasFocus) {
			load_zipcode(fm.zipcode.value);
		} else {
			load_latlon_parse(fm.lat.value, fm.lon.value);
		}
	}
	
	function load_latlon_parse(lat, lon){
		var arr = lat.split(",");
		
		if (arr.length == 2){
			lat = parse_lat_lon(trim(arr[0]));
			lon = parse_lat_lon(trim(arr[1]));
		} else {
			lat = parse_lat_lon(lat);
			lon = parse_lat_lon(lon);
		}

		load_latlon(lat, lon, true);
	}
	
/*  */
	function load_zipcode(zip){
		if (zip.length){
			var xmlhttp = create_xmlhttp();
			var d = new Date();
			document.getElementById("load_zipcode_button").src = "http://"+host+"/images/waiting-16.gif";
			serverPage = "http://"+host+"/processors/fetch-zip-lat-lon.php?zip="+zip+"&time="+d.getTime();
			xmlhttp.open("GET", serverPage, true); // asynch param set to false for synch requests, true for asynch
		
			document.getElementById("load_rep").innerHTML = "";
			
		//	the following is executed when fetch-zip-lat-lon.php returns
			xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					var response = xmlhttp.responseText;
					if (response.length > 0){
						eval(response);
						document.getElementById("load_rep").innerHTML = "Postal code loaded.";
						update_current_link();
					} else {
						document.getElementById("load_rep").innerHTML = "Postal code not found!";
					}
					document.getElementById("load_zipcode_button").src = "http://"+host+"/images/load-button.png";
				} else if (xmlhttp.readyState == 4 && xmlhttp.status != 200){
					document.getElementById("load_rep").innerHTML = "Error loading zip, status: "+xmlhttp.status;
					document.getElementById("load_zipcode_button").src = "http://"+host+"/images/load-button.png";
				}
			}
	
			xmlhttp.send(null);
		} else {
			alert("Please provide a zip code.");
		}
	}

	var exp = new Date();
	var oneYearFromNow = exp.getTime() + (365 * 24 * 60 * 60 * 1000);
	exp.setTime(oneYearFromNow);

	function showAddress(results, status) {
		var address = "";
		var lat_address = "";
		var lon_address = "";
		var lat_lon = "";
		var accuracy = "";
		var lat = lon = 0;
		if ((results) && (typeof results[0] != 'undefined')) {
			address = results[0].formatted_address;
			lat_address = (Math.round(results[0].geometry.location.lat()*1000000)/1000000)+"&deg;";
			lon_address = (Math.round(results[0].geometry.location.lng()*1000000)/1000000)+"&deg;";
			lat = results[0].geometry.location.lat();
			lon = results[0].geometry.location.lng();
			lat_lon = lat_address+", "+lon_address;
			accuracy = results[0].types;
		}
		var address_el = document.getElementById("address");
		if (address_el) {
			address_el.innerHTML = "<span class=\"label\">Address:</span><span class=\"value\">"+address+"</span>";	
		}
		var lat_address_el = document.getElementById("lat_address");
		if (lat_address_el) {
			lat_address_el.innerHTML = "<span class=\"label\">Latitude:</span><span class=\"value\">"+lat_address+"</span>";	
		}
		var lon_address_el = document.getElementById("lon_address");
		if (lon_address_el) {
			lon_address_el.innerHTML = "<span class=\"label\">Longitude:</span><span class=\"value\">"+lon_address+"</span>";	
		}
		var lat_lon_el = document.getElementById("lat_lon");
		if (lat_lon_el) {
			lat_lon_el.innerHTML = "<span class=\"label\">Lat, Lng:</span><span class=\"value\">"+lat_lon+"</span>";	
		}
		var accuracy_el = document.getElementById("accuracy");
		if (accuracy_el) {
		//	accuracy_el.innerHTML = "<span class=\"label\">Accuracy:</span><span class=\"value\">"+fetch_accuracy(accuracy)+"</span>";	
			accuracy_el.innerHTML = "<span class=\"label\">Accuracy:</span><span class=\"value\">"+accuracy+"</span>";	
		}
		var status_code_el = document.getElementById("status_code");
		if (status_code_el) {
			status_code_el.innerHTML = "<span class=\"label\">Status:</span><span class=\"value\">"+fetch_status(status)+"</span>";	
		}
		
		var when = "";
		var when_el = document.getElementById("when");
		if (when_el) {
			when_el.innerHTML = (when.length) ? "<span class=\"label\">When:</span><span class=\"value\">"+when+"</span>" : "";	
		}

		var IP = "";
		var IP_el = document.getElementById("IP");
		if (IP_el) {
			IP_el.innerHTML = (IP.length) ? "<span class=\"label\">IP:</span><span class=\"value\">"+IP+"</span>" : "";	
		}

		var host = "";
		var host_el = document.getElementById("host");
		if (host_el) {
			host_el.innerHTML = (host.length) ? "<span class=\"label\">Host:</span><span class=\"value\">"+host+"</span>" : "";	
		}

	//	update map coordinates report
		if (document.getElementById("lat_dec_out")) {
			document.getElementById("lat_dec_out").innerHTML = "<span class=\"label\">Latitude:</span><span class=\"value\">"+(Math.round(lat*1000000)/1000000)+"&deg;</span>";	
			document.getElementById("lon_dec_out").innerHTML = "<span class=\"label\">Longitude:</span><span class=\"value\">"+(Math.round(lon*1000000)/1000000)+"&deg;</span>";	
			document.getElementById("lat_HMS_out").innerHTML = "<span class=\"label\">Latitude:</span><span class=\"value redbrown\">"+dec_to_HMS_lat(lat)+"</span>";	
			document.getElementById("lon_HMS_out").innerHTML = "<span class=\"label\">Longitude:</span><span class=\"value redbrown\">"+dec_to_HMS_lon(lon)+"</span>";
			document.getElementById("lat_DMD_out").innerHTML = "<span class=\"label\">Latitude:</span><span class=\"value olive\">"+dec_to_DMD_lat(lat)+"</span>";	
			document.getElementById("lon_DMD_out").innerHTML = "<span class=\"label\">Longitude:</span><span class=\"value olive\">"+dec_to_DMD_lon(lon)+"</span>";
		}
	}
	
	
//	checks result of reverse geocode (response) and stores if successful, then calls showAddress to display result.
	function showAndStoreAddress(results, status){
		if (status == 'OK' && store_geocode) {
		//	alert(status);
			store_geocode = false; // clear the flag so we don't save for just any query
			if (debugging){
				document.getElementById("debugging").innerHTML = "In showAndStoreAddress."+"<br />"+document.getElementById("debugging").innerHTML;
			}
			var xmlhttp = create_xmlhttp();
			var d = new Date();
			if (document.getElementById("working")) {
				document.getElementById("working").src = "http://"+host+"/images/waiting-16.gif";
			}
/*
results[]: {
 types[]: string,
 formatted_address: string,
 address_components[]: {
   short_name: string,
   long_name: string,
   types[]: string
 },
 geometry: {
   location: LatLng,
   location_type: GeocoderLocationType
   viewport: LatLngBounds,
   bounds: LatLngBounds
 }
}
*/
		//	alert(results[0]);
		//	alert(results[0].formatted_address+", "+results[0].geometry.location.lat()+", "+results[0].geometry.location.lng())
			
			serverPage = "http://"+host+"/processors/store-reverse-geocode.php?lat_in="+document.load_location.lat.value+"&lon_in="+document.load_location.lon.value+"&lat_out="+results[0].geometry.location.lat()+"&lon_out="+results[0].geometry.location.lng()+"&accuracy="+fetch_accuracy(results[0].geometry.location_type)+"&sescod="+document.load_location.sescod.value+"&status="+fetch_status(status)+"&address="+escape(results[0].formatted_address)+"&time="+d.getTime();
		//	alert(serverPage);
			if (debugging){
				document.getElementById("debugging").innerHTML = "serverPage: "+serverPage+"<br />"+document.getElementById("debugging").innerHTML;
				serverPage = serverPage+"&debugging=1"
			}
			xmlhttp.open("GET", serverPage, true); // asynch param set to false for synch requests, true for asynch
		
		//	document.getElementById("load_rep").innerHTML = "";
			
		//	the following is executed when fetch-zip-lat-lon.php returns
			xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					if (xmlhttp.responseText.length > 0){
						if (debugging){
							document.getElementById("debugging").innerHTML = xmlhttp.responseText+"<br />"+document.getElementById("debugging").innerHTML;
						}
						eval(xmlhttp.responseText);
			//			document.getElementById("load_rep").innerHTML = "Location successfully loaded.";
					} else {
			//			document.getElementById("load_rep").innerHTML = "Location geocode failed!";
					}
					if (debugging){
						document.getElementById("debugging").innerHTML = "xmlhttp.responseText: "+xmlhttp.responseText+"<br />"+document.getElementById("debugging").innerHTML;
					}
				} else if (xmlhttp.readyState == 4 && xmlhttp.status != 200){
				//	document.getElementById("load_rep").innerHTML = "Error geocoding, status: "+xmlhttp.status;
				//	document.load_location.load_address_button.src = "http://"+host+"/images/load-button.png";
					if (debugging){
						document.getElementById("debugging").innerHTML = "xmlhttp.status: "+xmlhttp.status+"<br />"+document.getElementById("debugging").innerHTML;
					}
				}
				if (document.getElementById("working")) {
					document.getElementById("working").src = "http://"+host+"/images/pix.gif";
					document.getElementById("working").width = 16;
					document.getElementById("working").height = 16;
				}
			}
	
			xmlhttp.send(null);
		}

		showAddress(results, status);
	}
	
//	returns true if specified latlng has already been reverse geocoded and stored in db
//	also sets the location display info if true, else returns false
	function set_address_db(latlng){
		if (debugging){
			document.getElementById("debugging").innerHTML = "In set_address_db(latlng)."+"<br />"+document.getElementById("debugging").innerHTML;
		}
		var xmlhttp = create_xmlhttp();
		var d = new Date();
		var result = false;
		if (document.getElementById("working")) {
			document.getElementById("working").src = "http://"+host+"/images/waiting-16.gif";
		}
		serverPage = "http://"+host+"/processors/get-reverse-geocode.php?lat_in="+latlng.lat()+"&lon_in="+latlng.lng()+"&time="+d.getTime();
		if (debugging){
			document.getElementById("debugging").innerHTML = "serverPage: "+serverPage+"<br />"+document.getElementById("debugging").innerHTML;
		}
		xmlhttp.open("GET", serverPage, true); // asynch param set to false for synch requests, true for asynch
	
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				if (xmlhttp.responseText.length > 0){
					if (debugging){
						document.getElementById("debugging").innerHTML = xmlhttp.responseText+"<br />"+document.getElementById("debugging").innerHTML;
					}
					eval(xmlhttp.responseText);
				} else {
					result = false;
				}
			} else if (xmlhttp.readyState == 4 && xmlhttp.status != 200){
				if (debugging){
					document.getElementById("debugging").innerHTML = "xmlhttp.status: "+xmlhttp.status+"<br />"+document.getElementById("debugging").innerHTML;
				}
				result = false;
			}
			if (document.getElementById("working")) {
				document.getElementById("working").src = "http://"+host+"/images/pix.gif";
				document.getElementById("working").width = 16;
				document.getElementById("working").height = 16;
			}
		//	if we don't have it stored, geocode it.
			if (!result){
				geocoder.geocode({'latLng': latlng}, showAndStoreAddress);
			}
			update_current_link();
		}

		xmlhttp.send(null);
		return result;
	}
	
	function set_point(latLng) {
		map.setCenter(latLng);
		
	//	move the marker
		marker.setPosition(latLng);
	
		if (debugging) {
			document.getElementById("debugging").innerHTML = "lat: "+latLng.lat()+"<br />lon:"+latLng.lng()+"<br />"+document.getElementById("debugging").innerHTML;
		}
	}
	
	function get_address(latLng) {
	//	center map on click point
		map.setCenter(latLng);
	
	//	save point to cookie
		SetCookie("map1_lat", latLng.lat(), exp);
		SetCookie("map1_lon", latLng.lng(), exp);
	
	//	update map coordinates report
		if (document.getElementById("lat_dec")) {
			document.getElementById("lat_dec").innerHTML = "<span class=\"label\">Latitude:</span><span class=\"value\">"+(Math.round(latLng.lat()*1000000)/1000000)+"&deg;</span>";	
			document.getElementById("lon_dec").innerHTML = "<span class=\"label\">Longitude:</span><span class=\"value\">"+(Math.round(latLng.lng()*1000000)/1000000)+"&deg;</span>";	
			document.getElementById("lat_HMS").innerHTML = "<span class=\"label\">Latitude:</span><span class=\"value redbrown\">"+dec_to_HMS_lat(latLng.lat())+"</span>";	
			document.getElementById("lon_HMS").innerHTML = "<span class=\"label\">Longitude:</span><span class=\"value redbrown\">"+dec_to_HMS_lon(latLng.lng())+"</span>";
			document.getElementById("lat_DMD").innerHTML = "<span class=\"label\">Latitude:</span><span class=\"value olive\">"+dec_to_DMD_lat(latLng.lat())+"</span>";	
			document.getElementById("lon_DMD").innerHTML = "<span class=\"label\">Longitude:</span><span class=\"value olive\">"+dec_to_DMD_lon(latLng.lng())+"</span>";
		}
	
	//	move the marker
		marker.setPosition(latLng);
			
	//	check if we've already reverse geocoded this, if yes return stored result, if not store new result
		set_address_db(latLng); // will call getLocations and update_current_link if necessary
	}
	
	
//	sets latitude and longitude fields on find-address-from-latitude-and-longitude.php then calls get_address
	function get_address_rev(latLng){
		if ((document.load_location) && (document.load_location.lat)) {
			document.load_location.lat.value = latLng.lat();
			document.load_location.lon.value = latLng.lng();
		}
		get_address(latLng);
	}


	function reset_map(){
		document.getElementById("reset_map_button").src = "http://"+host+"/images/waiting-16.gif";
		DeleteCookie("map1_lat");
		DeleteCookie("map1_lon");
		DeleteCookie("map1_zoom");
		DeleteCookie("map1_map_type");

		location.href = self;
	}

	function change_map_height(delta) {
		var el = document.getElementById("map_canvas");
		var ht_o = parseInt(el.style.height.substr(0, el.style.height.length-2));
		var ht_n = ht_o + delta;
		ht_n = (ht_n >= 200) ? ht_n : ht_o;
		el.style.height = ht_n+"px";
		update_dim_display();

		var expdate = new Date();
		FixCookieDate(expdate);
		expdate.setTime(expdate.getTime() + (365*24*60*60*1000)); // expire in one year

		SetCookie("y", ht_n, expdate);
	}
	
	function update_dim_display() {
		var el = document.getElementById("map_dims");
		var m_el = document.getElementById("map_canvas");
		if ( (el) && (m_el) )
			el.innerHTML = (m_el.offsetWidth-2) + " x " + (m_el.offsetHeight-2) + " pixels";
	}
	
	window.onresize = function() {
		update_dim_display();
	//	window.onresize = update_dim_display();
	}

	function save_map_type() {
		var map_type_name = map.getMapTypeId();

		switch (map_type_name){
			case 'map':
				map_type = 'ROADMAP';
				break;
			case 'satellite':
				map_type = 'SATELLITE';
				break;
			case 'hybrid':
				map_type = 'HYBRID';
				break;
			case 'terrain':
				map_type = 'TERRAIN';
				break;
			default:
				map_type = 'ROADMAP';
				break;
		}
		SetCookie("map1_map_type", map_type, exp);
	}