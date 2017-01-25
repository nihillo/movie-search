# movie-search
A client for searching films in IMDB, usign OMDB API.

It is done as an SPA, using Path.js for routing, jQuery for data processing and events control, and Handlebars for HTML rendering. Responsive layout and styling use Bootstrap as a base but are customized through a self-tailored theme.

## Working demo

[http://moviesearch.nihillo.es](http://moviesearch.nihillo.es)


## Technologies used
- Yeoman webapp generator
- jQuery
- Handlebars
- Path.js
- Bootstrap

## Gulp tasks
To serve locally from source (development):
```sh
$ gulp serve
```
This will fire up a local web server, open http://localhost:9000 in your default browser and watch files for changes, reloading the browser automatically via LiveReload.


To make a production-ready build of the app, run:
```sh
$ gulp
```
To preview the production-ready build to check if everything is ok:
```sh
$ gulp serve:dist
```
