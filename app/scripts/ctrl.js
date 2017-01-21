class CtrlGlobal {
	constructor() {
		this.view = new View('start');
		this.listenSearch();
	}


	listenSearch() {
		$('#searchform').submit( (event) => {
			event.preventDefault();
		});

		$(window).keyup( () => {
			this.subctrl = new CtrlSearch();
		});

	}
}

class CtrlSearch {
	constructor() {
		this.view = new View('results');
		this.query = $('#query').val();
		this.lastPage = 1;
		this.sendQuery(true);
	}

	sendQuery(firstCall = false) {
		var empty = /^\s+$/;

		if (this.query && !empty.test(this.query) && this.query[this.query.length-1] != ' ') {
			this.query = this.query.split(' ').join('+');
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


	                	if (firstCall) {
	                		this.view.addContent('results', data);
	                		this.view.recalcGrid();
	                	} else {
	                		this.view.removePreloader();
	                		this.view.addContent('results', data);
	                		this.view.recalcGrid();
	                	}
	                	



	                } else {	
	                	if (this.view) {
	                		this.view.removePreloader();
	                	}
	                	console.log(data.Error);
	                }

	                this.listenScroll();
	            },
	            error: (xhr, ajaxOptions, thrownError) => {
	            	this.view.removePreloader();
			        console.log(thrownError);
			    }
	        });
		}
	}
 
	listenScroll() {
		$(window).on('scroll', () => {
		   if($(window).scrollTop() + $(window).height() == $(document).height()) {
		        
		        $(window).off('scroll');

		        this.view.addPreloader();
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
}