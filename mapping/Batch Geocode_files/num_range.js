<!-- hide scripting from old browsers
/* All code copyright David B. Zwiefelhofer. All rights reserved. No parts may be used without explicit written consent. */


function is_num(inputValue) {
	if (isNaN(parseFloat(inputValue)))
		return false
	else
		return true
}

function numeric_chars_only(inputValue) {
	var inputStr = inputValue.toString();
	for (var i = 0; i < inputStr.length;) {
		var oneChar = inputStr.charAt(i);
		if (oneChar == ".") {
			//alert("Got a period.");
			inputStr = inputStr.substring(0, i);
			return inputStr; //i = 0;
		} else if (oneChar < "0" || oneChar > "9") {
			inputStr = inputStr.substring(0, i) + inputStr.substring(i + 1, inputStr.length);
			//alert("New string is " + inputStr + ".");
		} else {
			i++;
		}
	}
	return inputStr;
}

// Returns true if only numerals and decimal
function legal_number_chars(inputValue) {
	var inputStr = inputValue.toString();
	var num_periods = 0;
	var oneChar, i;
	for (var i = 0; i < inputStr.length; i++) {
		oneChar = inputStr.charAt(i);
		if (oneChar == ".") {
			num_periods = num_periods + 1;
			if (num_periods > 1) {
				return false;
			}
		} else if (oneChar < "0" || oneChar > "9") {
			return false;
		}
	}
	return true;
}


function good_num(inputValue) {
	if (is_num(inputValue)) {
		return true;
	} else {
		return false;
	}
}

function check_int(mValue, mStr) {
	if (!good_num(mValue)) {
		alert("Please enter only whole numeric values in the \"" + mStr + "\" field. (No text, decimal points or fractional numbers please).");
		return false;
	} else {
		var testLength = mValue.toString().length;
		mValue = numeric_chars_only(mValue);
		if (testLength > mValue.toString().length)
			alert("Illegal characters have been removed from the \"" + mStr + "\" field.");			
		return mValue;
	}
}

function max_value(mValue) {
	if (mValue > 9999999999999)
		mValue = 9999999999999;
	else if (mValue < 0)
		mValue = 0;
	return mValue;
}

function max_long_int_value(mValue) {
	if (mValue > 2147483647)
		mValue = 2147483647;
	else if (mValue < 0)
		mValue = 0;
	return mValue;
}

function int_range(mValue){
	if (mValue > 32767)
		mValue = 32767;
	else if (mValue < -32768)
		mValue = -32768;
	return mValue;
}


// end hide scripting -->
