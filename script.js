/**
 * Wikimedia Coding Exercise Script.js  
 */
/*globals console */

$(function(){
	'use strict';
	$('.toggle>button').click(function(event){
		var section = $(this).parent().next('.section'),
				buttonText;
		event.stopPropagation(); // don't need an infinite loop
		section.toggle();
		buttonText = section.css('display') == 'none'? 'show' : 'hide';
		$(this).text(buttonText);
	});
	
	$('.toggle').click(function(){
		$('button', this).click();
	});
});
