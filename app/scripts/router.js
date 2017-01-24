var subctrl;
Path.map('#/').to(function() {
	subctrl = new CtrlHome();
});

Path.map('#/search(/:query)').to(function() {
	subctrl = new CtrlSearch(this.params.query);
});

Path.map('#/id(/:movieId)').to(function() {
	subctrl = new CtrlDetail(this.params.movieId);
});

Path.root('/');

Path.listen();