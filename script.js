/**
 * Wikimedia Coding Exercise Script.js  
 */
/*globals console, Node */

$(function(){
	'use strict';
	
	$(".section").hide();
	
	// build fixed ToC
	$('h2').each(function(){
		var id = this.id,
				navList = $('#TopNav>ul'),
				text = $(this).contents()
					.filter(function() {
						return this.nodeType === Node.TEXT_NODE;
					}).text();
		if (id) {
				$('<li><a href="#'+id+'" class="toc-link">' + text + '</a></li>').appendTo(navList);
		}
	});
	// expand section when navigated to
	$('a.toc-link').click(function(){
		var id = $(this).attr('href'),
				heading = $(id),
				section = heading.next('.section');
		if (section.css('display') === 'none') {
			section.prev('h2').children('button').click();
		}
	});
	
	// highlight active nav item
	$(window).bind('hashchange', function(){
		var fragment = location.hash;
		$('#TopNav>ul>li').removeClass('active');
		$('#TopNav>ul>li>a[href$="'+fragment+'"]').parent().addClass('active');
	});
	$('#TopNav>ul>li>a').click(function(){
		$(window).trigger('hashchange');
	});
	
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
	
	$(window).trigger('hashchange');
});
