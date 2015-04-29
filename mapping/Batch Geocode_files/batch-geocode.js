// JavaScript Document

var pause = false;

$(document).ready(function(){

	initialize_accuracy_display();
	set_delimiter(delimiter);
	
	$('#geocode_btn').click(function(){
		
		if ($(this).val() == 'geocode') {
			$(this).val('pause');
			pause = false;
			set_indicator('running');
			do_geocode();
		} else if ($(this).val() == 'pause') {
			$(this).val('resume');
			set_indicator('paused');
			pause = true;
		} else if ($(this).val() == 'resume') {
			$(this).val('pause');
			pause = false;
			set_indicator('running');
			geocode_one_record();
		}
	
	});
	
	
});


