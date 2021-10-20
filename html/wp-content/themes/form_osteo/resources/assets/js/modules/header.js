var header = {

	ui: {},

	init: function() {
		console.log('header');

		this.bindUI();
		this.bindEvents();
		this.headerFixed();
	},

	bindUI: function() {
		this.ui.$body = $('body');
		this.ui.$window = $(window);
		this.ui.$header = $('.js-header');

	},

	bindEvents: function() {
		this.ui.$window.on('scroll', this.headerFixed.bind(this));
	},

	headerFixed: function() {
		console.log('scroll')
		console.log(window.scrollY)
		if (window.scrollY > 10) {
			this.ui.$header.addClass('is-fixed')
		} else {
			this.ui.$header.removeClass('is-fixed')
		}
	},


};

module.exports = header;
