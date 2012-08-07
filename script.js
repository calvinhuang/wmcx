/**
 * Wikimedia Coding Exercise Script.js  
 */

/*jslint plusplus:true */
/*globals console, Node, escape */

$(function(){
	'use strict';
	
	var citeCounter = 0;
	
	function toggleSection(id) {
		var heading = $(id),
				section = heading.next('.section');
		if (section.css('display') === 'none') {
			section.prev('h2').children('button').click();
		}
	}
	
	// build fixed ToC
	$('#content>h2').each(function(){
		var id = this.id,
				navList = $('#TopNav>ul'),
				text = $(this).contents()
					.filter(function() {
						return this.nodeType === Node.TEXT_NODE;
					}).text();
		if (id) {
			$('<li><a href="#' + escape(id) + '" class="toc-link">no-XSS</a></li>')
				.appendTo(navList).find('a.toc-link').text(text);
		}
	});
	
	// highlight active nav item
	$(window).bind('hashchange', function(){
		var fragment = location.hash;
		$('#TopNav>ul>li').removeClass('active');
		$('#TopNav>ul>li>a[href$="'+fragment+'"]').parent().addClass('active');
		toggleSection(fragment);
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
	
	// easy citation
	$('sup.missing:contains("citation needed")').each(function(){
		$(this).html('<a href="#" class="citation">citation needed</a>');
	});
	$('a.citation').each(function(){
		$(this).attr('data-cite-id', citeCounter++);
	});
	
	$('body').on('click', 'a.citation', function(){
		
		return false;
	});
	
	// initialize UI state
	$('.section').hide();
	$('.toggle>button').text('show');
	$(window).trigger('hashchange');
});
