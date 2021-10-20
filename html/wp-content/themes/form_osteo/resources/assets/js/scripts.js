// Import jQuery
import jQuery from "jquery";
// export for others scripts to use
window.$ = window.jQuery = jQuery;

// Require modules
import header from './modules/header.js';

// Import Slick
//import 'slick-carousel';

$(function(){

	$("html").removeClass("no-js");

	header.init();

	if ($(".materialForm").length) {

	}
	
});
