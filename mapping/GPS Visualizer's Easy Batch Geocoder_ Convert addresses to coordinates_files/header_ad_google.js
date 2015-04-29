var random_number = Math.random();
if (random_number > 1) {
	// Google Adsense ads
	if (document.getElementById('header_ad')) {
		document.getElementById('header_ad').style.margin = '0px';
		document.getElementById('header_ad').style.height = '15px';
		document.getElementById('header_ad').style.backgroundColor = '#EEFFDD';
		document.getElementById('header_ad').style.borderTop = '1px solid #66CC66';
		document.getElementById('header_ad').style.borderBottom = '1px solid #66CC66';
	}
	document.writeln('<script type="text/javascript"><!--');
	document.writeln('google_ad_client = "pub-7605458219863413";');
	document.writeln('google_ad_width = 728;');
	document.writeln('google_ad_height = 15;');
	document.writeln('google_ad_format = "728x15_0ads_al_s";');
	document.writeln('google_ad_channel = "4924498378"; // 2007-07-04: gv-header-text-links');
	document.writeln('google_color_border = "EEFFDD";');
	document.writeln('google_color_bg = "EEFFDD";');
	document.writeln('google_color_link = "0000CC";');
	document.writeln('google_color_url = "004400";');
	document.writeln('google_color_text = "333333";');
	document.writeln('//--><'+'/'+'script>');
	document.writeln('<script type="text/javascript" src="http://pagead2.googlesyndication.com/pagead/show_ads.js"><'+'/'+'script>');
} else {
	// Google Adsense ads, 2010
	if (document.getElementById('header_ad')) {
		document.getElementById('header_ad').style.margin = '0px';
		document.getElementById('header_ad').style.height = '15px';
		document.getElementById('header_ad').style.backgroundColor = '#EEFFDD';
		document.getElementById('header_ad').style.borderTop = '1px solid #66CC66';
		document.getElementById('header_ad').style.borderBottom = '1px solid #66CC66';
	}
	/*
	document.writeln('<script type="text/javascript"><!--');
	document.writeln('google_ad_client = "pub-0538542711751001";');
	document.writeln('google_ad_width = 728;');
	document.writeln('google_ad_height = 15;');
	document.writeln('google_ad_format = "728x15_0ads_al_s";');
	document.writeln('google_ad_channel = "7152118699";');
	document.writeln('google_color_border = "EEFFDD";');
	document.writeln('google_color_bg = "EEFFDD";');
	document.writeln('google_color_link = "0000CC";');
	document.writeln('google_color_url = "004400";');
	document.writeln('google_color_text = "333333";');
	document.writeln('//--><'+'/'+'script>');
	document.writeln('<script type="text/javascript" src="http://pagead2.googlesyndication.com/pagead/show_ads.js"><'+'/'+'script>');
	*/
	document.writeln('<script type="text/javascript"><!--');
	document.writeln('google_ad_client = "pub-0538542711751001";');
	document.writeln('google_ad_width = 728;');
	document.writeln('google_ad_height = 15;');
	document.writeln('google_ad_slot = "8692341970";');
	document.writeln('//--><'+'/'+'script>');
	document.writeln('<script type="text/javascript" src="http://pagead2.googlesyndication.com/pagead/show_ads.js"><'+'/'+'script>');
}
