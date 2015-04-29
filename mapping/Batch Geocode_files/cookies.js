<!-- hide scripting from old browsers
/* All code copyright David B. Zwiefelhofer. All rights reserved. No parts may be used without explicit written consent. */


function getCookieVal (offset) {
  var endstr = document.cookie.indexOf (";", offset);
  if (endstr == -1)
    endstr = document.cookie.length;
  return unescape(document.cookie.substring(offset, endstr));
}

//
function FixCookieDate (date) {
  var base = new Date(0);
  var skew = base.getTime(); // dawn of (Unix) time - should be 0
  if (skew > 0)  // Except on the Mac - ahead of its time
    date.setTime (date.getTime() - skew);
}

//
function GetCookie (name) {
  var arg = name + "=";
  var alen = arg.length;
  var clen = document.cookie.length;
  var i = 0;
  while (i < clen) {
    var j = i + alen;
    if (document.cookie.substring(i, j) == arg)
      return getCookieVal (j);
	i = document.cookie.indexOf(" ", i) + 1;
    if (i == 0) break; 
  }
  return "";
}

//
function SetCookie (name,value,expires,path,domain,secure) {
  document.cookie = name + "=" + escape (value) +
    ((expires) ? "; expires=" + expires.toGMTString() : "") +
    ((path) ? "; path=" + path : "") +
    ((domain) ? "; domain=" + domain : "") +
    ((secure) ? "; secure" : "");
}

function DeleteCookie (name,path,domain) {
  if (GetCookie(name)) {
	//alert("in DeleteCookie");
    document.cookie = name + "=" +
      ((path) ? "; path=" + path : "") +
      ((domain) ? "; domain=" + domain : "") +
      "; expires=Thu, 01-Jan-70 00:00:01 GMT";
  }
}

// Add strAdd to the comma delimited cookie.
function add_to_cookie(strAdd, cookie_name) {
	if (strAdd != ",-,") {
			strAdd = "," + strAdd + ","			// Add commas to strAdd
		//	alert("Just added " + strAdd + ".")
	}
	strCookie = GetCookie(cookie_name); 	// Get the cookie string
	if (strCookie) {
		//alert(strCookie);
		if (strCookie.indexOf(strAdd) >= 0){ 	// See if strAdd already exists in cookie
			//alert("ID already exists.");
			return
		} else {									// Add strAdd
		// if cookie is empty, replace it with the new ID
			if (strCookie.indexOf(",-,") >= 0) {
				//alert("About to replace ,-, with " + strAdd + ".")
				//alert("index of ,-, is " + strCookie.indexOf(",-,") + ".")
				//alert("strCookie.length - 3 is " + parseInt(strCookie.length - 3) + ".")
				strCookie = strCookie.substr(strCookie.indexOf(",-,") + 2, strCookie.length - 2)
				//alert(strCookie)
				//strCookie.replace(",-,", strAdd)
				if (strCookie.length > 0) {
				//	remove trailing comma from ID to add
					strAdd = strAdd.substr(0, strAdd.length - 1)
				}
				strCookie = strAdd + strCookie
				//alert(strCookie)
				//strCookie = strAdd;
			} else {	// cookie not empty
			
			//	remove trailing comma from ID to add
				strAdd = strAdd.substr(0, strAdd.length - 1)
				
			//	add new ID to beginning of cookie
				strCookie = strAdd + strCookie;				
			}
		
		//	Save the cookie!
			var expdate = new Date();
			FixCookieDate(expdate);
			expdate.setTime(expdate.getTime() + (365*24*60*60*1000)); // expire in one year
			SetCookie(cookie_name, strCookie, expdate);
			
			//alert("New cookie after adding is " + strCookie);
			return;
		}
	}			// end of (strCookie)
	else { 	// need to make cookie
		strCookie = strAdd;
		var expdate = new Date();
		FixCookieDate(expdate);
		expdate.setTime(expdate.getTime() + (365*24*60*60*1000)); // expire in one year
		SetCookie(cookie_name, strCookie, expdate);
		//alert("Just made new cookie: " + strCookie);
		return;
	}
}

// Remove strRmv from the comma delimited cookie.
function remove_from_cookie(strRmv, cookie_name) {
	strRmv = "," + strRmv + ","				// Add commas to strRmv.
	strCookie = GetCookie(cookie_name); 	// Get the cookie string.
	if (strCookie) {							// See if cookie exists.
		if (strCookie.indexOf(strRmv) >= 0){ 	// See if strRmv exists in cookie.
			//alert(strCookie);
		// remove leading comma from remove string
			strRmv = strRmv.substr(1, strRmv.length - 1)
		// strip off trailing garbage from cookie
		//	strCookie = strCookie.substring(0, strCookie.indexOf(";"));
		// remove the ID
			strCookie = strCookie.substr(0, strCookie.indexOf(strRmv)) + strCookie.substr(strCookie.indexOf(strRmv) + strRmv.length, strCookie.length - (strCookie.indexOf(strRmv) + strRmv.length));
			//alert(strCookie);
			if (strCookie.length < 2) {	// Empty cookie
				strCookie = ",-," 		// our designation for no IDs
			}
			var expdate = new Date();
			FixCookieDate(expdate);
			expdate.setTime(expdate.getTime() + (365*24*60*60*1000)); // expire in one year
			SetCookie(cookie_name, strCookie, expdate);
			return;
		}
		else
			return
	} 
	else
		return
}
//-->
