class CtrlGlobal {
	constructor() {
		this.view = new View();
		this.listenSearch();
	}


	listenSearch() {
		// $('#searchform').submit( (event) => {
		// 	event.preventDefault();
		// });

		// $(window).keyup( () => {
		// 	this.subctrl = new CtrlSearch();
		// });


		$('#searchform').submit( (event) => {
			event.preventDefault();
			var query = $('#query').val();
			query = query.split(' ').join('+');

			while (query[query.length-1] == '+') {
				query = query.slice(0, -1);
			}

			window.location.replace('/#/search/' + query);
		});
	}
}

class CtrlHome {
	constructor(){
		this.view = new ViewHome();
	}
}

class CtrlSearch {
	constructor(query) {
		this.view = new ViewSearch();
		this.query = query;
		this.lastPage = 1;
		this.sendQuery(true);
	}

	sendQuery(firstCall = false) {
		var empty = /^\s+$/;

		if (this.query && !empty.test(this.query)) {
			
			var url = 'http://www.omdbapi.com/?s=' + this.query;
			$.ajax({
				method: 'GET',
	            url: url,
	            success: (data) => {
	            	
	                if (data.Response == 'True') {

	                	data.Search.forEach((element) => {
	                		if (element.Poster == 'N/A') {
	                			element.Poster = './images/noposter.png';
	                		}
	                	});


	                	if (!firstCall) {
	                		this.view.hidePreloader();

	                	}
	                	
	                	this.view.addMovies(data.Search);

	                } else {	
	                	if (this.view) {
	                		this.view.hidePreloader();
	                	}
	                	console.log(data.Error);
	                }

	                this.listenScroll();
	                this.listenClick();
	            },
	            error: (xhr, ajaxOptions, thrownError) => {
	            	this.view.hidePreloader();
			        console.log(thrownError);
			    }
	        });
		}
	}
 
	listenScroll() {
		$(window).on('scroll', () => {
		   if($(window).scrollTop() + $(window).height() == $(document).height()) {
		        
		        $(window).off('scroll');

		        this.view.showPreloader();
		        this.lastPage++;

		        if (/&page=/.test(this.query)) {
		        	let queryArr = this.query.split('&page=');
		        	this.query = queryArr[0] + '&page=' + this.lastPage;
		        } else {
		        	this.query += '&page=' + this.lastPage;
		        }


		        this.sendQuery();		        	
		   }
		});
	}

	listenClick() {
		$(document).on('click', '.movie-element a', function() {
			$(window).off('scroll');
		});
	}
}


class CtrlDetail {
	constructor(id) {
		this.view = new ViewMovie();
		this.id = id;
		this.sendQuery();
	}

	sendQuery() {
		var empty = /^\s+$/;

		if (this.id && !empty.test(this.id) && this.id[this.id.length-1] != ' ') {
			
			var url = 'http://www.omdbapi.com/?i=' + this.id;
			$.ajax({
				method: 'GET',
	            url: url,
	            success: (data) => {
	            	
	                if (data.Response == 'True') {
	                	
	            		if (data.Poster == 'N/A') {
	            			data.Poster = './images/noposter.png';
	            		}
						
						this.view.renderContent(null, data);
						this.listenBack();
	                } else {	
	                	console.log(data.Error);
	                }

	                
	            },
	            error: (xhr, ajaxOptions, thrownError) => {
	            	this.view.hidePreloader();
			        console.log(thrownError);
			    }
	        });
		}
	}

	listenBack() {

		$(document).on('click', '#go-back', function(){
			window.history.back();
			$(document).off('click');
		});
  	}
}