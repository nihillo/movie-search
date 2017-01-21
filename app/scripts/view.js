class View {
	constructor() {
		this.searchbox = $('#query');
		this.renderBoard = $('[data-app]');

		this.renderContent();
	}

	renderContent() {
		var html = MovieSearch.templates.exampletemplate();
		this.renderBoard.html(html);
	}
}