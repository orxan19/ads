jQuery(document).ready(function($){
	"use strict";

	// Initialize navgoco with default options
	$(".canvas-menu").navgoco({
		caretHtml: '<span class="icon-arrow"></span>',
		accordion: false,
		openClass: 'open',
		save: true,
		cookie: {
			name: 'navgoco',
			expires: false,
			path: '/'
		},
		slide: {
			duration: 300,
			easing: 'swing'
		}
	});

	var container = $('body');
	$('.off-canvas-btn, #off-canvas-close, .iw-overlay').click(function () {
		if(container.hasClass('canvas-menu-open')){
			container.removeClass('canvas-menu-open');
		}else{
			container.addClass('canvas-menu-open');
		}
	});
});