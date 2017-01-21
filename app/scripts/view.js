class View {
	constructor(template, data) {
		this.searchbox = $('#query');
		this.renderBoard = $('[data-app]');

		this.renderContent(template, data);
	}

	template(template, data) {
		switch (template) {
			case 'start':
				return MovieSearch.templates.start();
				
			// case 'test':
			// 	return MovieSearch.templates.test(data);

			case 'results':
				return MovieSearch.templates.results(data);

			case 'preloader':
				return MovieSearch.templates.preloader();
				
		}
	}

	renderContent(template, data) {
		var d = data ? data : {};
		this.renderBoard.html(this.template(template, data));
	}

	addContent(template, data) {
		var d = data ? data : {};
		this.renderBoard.append(this.template(template, data));
	}

	recalcGrid() {
		var movieElements = $('.movie-element');

		var width = movieElements.innerWidth();
		var height = width * 1.333;
		
		movieElements.css('height', height);

		var i = 1;
		while (i <= movieElements.length) {
			$('.movie-element:nth-child('+ i +')').addClass('col-md-offset-1');
			i += 5;
		}
	}

	addPreloader() {
		var preloader = $('#preloader');
		if (preloader.length === 0) {
			this.addContent('preloader');
		}
	}

	removePreloader() {
		$('#preloader').remove();
	}
}