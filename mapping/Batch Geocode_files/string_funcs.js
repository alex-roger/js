// JavaScript Document

	function truncate_string(str, len, appd){
		return (str.length > len) ? str.substr(0, len)+appd : str;
	}

	function trim(str){
		return (str.length) ? str.replace(/^\s\s*/, '').replace(/\s\s*$/, '') : "";
	}

	function strip_non_alpha(str){
		return (str.length) ? str.replace(/[^a-zA-Z]+/g,'') : "";
	}