var jetpack       = require('fs-jetpack');
var gulp          = require('gulp');
var _             = require('lodash');
var util          = require('util');
var helpers       = require( __dirname + '/helpers' );
var print         = require( __dirname + '/print' );
var config        = require( __dirname + '/../config' );

var Partial = function( name ) {
	return new Promise(function(resolve, reject) {
		if (_.isUndefined(name)) return reject('You must name the partial');

		var data      = { name: name, slug: _.kebabCase( name ) };
		var filenames = { style: '_' + data.slug + '.scss', view:  data.slug + '.pug'	};

		var files     = {
			style: {
				src:     _.template( jetpack.read(config.paths.store.templates.partials.style) ),
				dest:    jetpack.path( config.paths.components.styles.partials, filenames.style ),
				include: {
					file:    jetpack.path( config.paths.components.styles.src, 'default.scss' ),
					content: "@import 'partials/" + data.slug + "';\n"
				},
				content: null,
			},
			view: {
				src:     _.template( jetpack.read(config.paths.store.templates.partials.view) ),
				dest:    jetpack.path( config.paths.components.views.partials, filenames.view ),
				include: {
					file:    jetpack.path( config.paths.components.views.src, 'index.pug' ),
					content: '\tinclude _partials/' + data.slug + '\n'
				},
				content: null,
			}
		}

		_.forEach( files, function( file ) {
			var exists = jetpack.exists( file.dest );
			if (exists !== false) return reject('Partial with this name already exists, try another name');
		});

		makeFiles( files, data, function( data ) {
			return resolve( data );
		});
	});
}

module.exports = Partial;

function makeFiles( files, data, callback ) {
	_.forEach(files, function( file ) {
		file.content = file.src( data );
		jetpack.write( file.dest, file.content );
		jetpack.append( file.include.file, file.include.content );
	});

	return callback( data );
}
