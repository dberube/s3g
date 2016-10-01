var Promise = require('bluebird');
var jetpack = require('fs-jetpack');
var hogan   = require('hogan');
var chalk   = require('chalk');
var _       = require('lodash');
var config  = require( __dirname + '/../../config');

var Partials = function( name, exclude ) {
	this.name     = name;
	this.opts     = { exclude: _.toLower( exclude ) };
	this._inputs  = { name: name, exclude: exclude };
	this.files    = this.initFiles();
	this.message  = [];
}

Partials.prototype.make =  Promise.method(function () {
	var _this = this;

	_.forEach( _this.files, function( partialType ) {
		if (_this.fileExists( partialType.file ) !== false) {
			throw new Error( 'Filename already exists, please try another name' );
		}
	});

	_this.makeFiles();
	_this.makeIncludes();

	var msgParts = _this.message.join('\n');
	var message  = chalk.green.bold('New Partials Created & Automatically Included:\n\n') + msgParts;

	return message;

});

Partials.prototype.initFiles = function () {
	var _this = this;

	var files = {
		styles: {
			name:     _this.name,
			title:    _.kebabCase( _this.name ),
			filename: '_' + _.kebabCase( _this.name ) + '.scss',
			file:     null,
			paths:    {
				src:  config.templates.partials.styles.src,
				dest: config.templates.partials.styles.dest
			},
			include:  {
				file: config.templates.partials.styles.include,
				content: "@import 'partials/" + _.kebabCase( _this.name ) + "';"
			}
		},
		views: {
			name:     _this.name,
			title:    _.kebabCase( _this.name ),
			filename: _.kebabCase( _this.name ) + '.pug',
			file:     null,
			paths:    {
				src:  config.templates.partials.views.src,
				dest: config.templates.partials.views.dest
			},
			include:  {
				file:    config.templates.partials.views.include,
				content: '\tinclude _partials/' + _.kebabCase( _this.name )
			}
		}
	};

	files.styles.file = jetpack.path( files.styles.paths.dest, files.styles.filename );
	files.views.file  = jetpack.path( files.views.paths.dest, files.views.filename );

	return files;
};

Partials.prototype.fileExists = function (file) {
	return jetpack.exists( file );
};

Partials.prototype.makeFiles = function () {
	var _this = this;

	_.forEach( _this.files, function( partial ) {
		var file = {
			src:      partial.paths.src,
			dest:     jetpack.path( partial.paths.dest, partial.filename ),
			template: hogan.compile( jetpack.read( partial.paths.src ) ),
			content:  null
		};
		file.content = file.template.render( partial );

		jetpack.file( file.dest, { content: file.content } );

		_this.message.push( '  Created File \t\t: ' + file.dest );
	});
};

Partials.prototype.makeIncludes = function () {
	var _this = this;

	_.forEach( _this.files, function( partial ) {
		jetpack.append( partial.include.file, "\n" + partial.include.content );
		_this.message.push( '  Included in File \t: ' + partial.include.file );
	});
};

module.exports = Partials;
