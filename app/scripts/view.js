class View {
	constructor() {
		this.searchbox = $('#query');
		this.renderBoard = $('[data-app]');
	}

	renderContent(template, data) {
		var d = data ? data : {};
		this.renderBoard.html(this.template(template, d));
	}

	addContent(template, data) {
		var d = data ? data : {};
		this.renderBoard.append(this.template(template, d));
	}

	clearPrevContent() {
		this.renderBoard.html('');
	}
}

class ViewHome extends View{
	constructor() {
		super();
		this.renderContent(this.template());
	}

	template(data) {
		return MovieSearch.templates.start(data);
	}
}

class ViewSearch extends View{
	constructor() {
		super();
		this.clearPrevContent();
	}

	template(template, data) {
		return MovieSearch.templates.movie(data);
	}

	addMovies(movies) {

		var i = 0;
		var interv = setInterval(()=>{
			let movie = movies[i];
			this.addContent('movie', movie);
			let movieElement = $('.movie-element:last-child');

			let elementIndex = $('.movie-element:last-child').index();

			var windWidth = window.innerWidth;

			// if (windWidth > 992 && windWidth <= 1200) {
			// 	if (elementIndex === 0 || (elementIndex%3) === 0) {
			// 		movieElement.addClass('col-md-offset-1');
			// 	}
			// }

			if (windWidth > 1200) {
				if (elementIndex === 0 || (elementIndex%5) === 0) {
					movieElement.addClass('col-md-offset-1');
				}
			}
			

			movieElement.css('opacity', 0);
			movieElement.fadeTo('slow', 1);

			i++;
			if (i >= movies.length) {
				clearInterval(interv);
			}
		}, 100);
	}

	showPreloader() {
		$('#preloader').show();
	}

	hidePreloader() {
		$('#preloader').hide();
	}
}

class ViewMovie extends View {
	constructor() {
		super();
		this.clearPrevContent();
		this.back = $('#go-back');
	}

	template(template, data) {
		return MovieSearch.templates.detail(data);
	}
}