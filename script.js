/**
 * Wikimedia Coding Exercise Script.js  
 */
/*globals console */

$(function(){
	'use strict';
	// toggle section expand/collapse
	$('.toggle>button').click(function(event){
		var section = $(this).parent().next('.section'),
				buttonText;
		event.stopPropagation(); // don't need an infinite loop
		section.toggle();
		buttonText = section.css('display') === 'none'? 'show' : 'hide';
		$(this).text(buttonText);
	});
	$('.toggle').click(function(){
		$('button', this).click();
	});
	
	// highlight active nav item
	$(window).bind('hashchange', function() {
		var fragment = location.hash;
		console.log(fragment);
		$('#TopNav>ul>li>a').removeClass('active');
		$('#TopNav>ul>li>a[href$="'+fragment+'"]').addClass('active');
	});

});
