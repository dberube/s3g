var Promise = require('bluebird');
var jetpack = require('fs-jetpack');
var read    = require('read');
var _       = require('lodash');
var config  = require( __dirname + '/../config' );
var args    = _.slice( process.argv, 2 );
var cwd     = process.cwd();
var command = args[0];
var args    = _.slice( args, 1 );

var Project = function( command, options ) {
	this.command       = command;
	this.options       = options;
	this.validCommands = [ 'init', 'new' ];
	this.project       = { name: null, slug: null, path: null };
	this.config        = config.s3f;
}

Project.prototype.runCommand = Promise.method(function() {
	var _this   = this;
	var command = _this.command;
	var options = _this.options;

	var validCommand = _.indexOf( _this.validCommands, command );
	if (validCommand < 0) throw new Error( 'Invalid command, please try again' );

	return _this[ command ]();
});

Project.prototype.init = Promise.method(function() {
	var _this          = this;
	var _path          = _this.options[0] || '.';
	_this.project.path = jetpack.cwd( _path );
	_this.project.name = 'default';
	_this.project.slug = _.kebabCase( _this.project.name );

	if (!isEmpty( _this.project.path.cwd() )) throw new Error( 'The path specified must be empty to run the init command' );

	var paths = {
		static: {
			from: jetpack.path( _this.config.path ),
			to:   _this.project.path.cwd()
		},
		template: {
			from: jetpack.path( _this.config.path ),
			to:   jetpack.path( _this.project.path.cwd(), 'templates', _this.project.slug )
		}
	};

	copyNewProject( paths.static );

	return 'A new s3f project was initiated in ' + _this.project.path.cwd() + ' with a template name of: ' + _this.project.slug;
});

Project.prototype.new = Promise.method(function() {
	var _this          = this;

	if (_this.options.length != 1) throw new Error( 'You must specify a new template name, and optionally a path to the s3f project' );

	var _name   	   = _this.options[0];
	var _path          = _this.options[1] || '.';

	_this.project.path = jetpack.cwd( _path );
	_this.project.name = _name;
	_this.project.slug = _.kebabCase( _this.project.name );

	if (!isProject( _this.project.path.cwd() )) throw new Error( 'The path specified must be an existing s3f project' );

	var paths = {
		from: jetpack.path( _this.config.path, 'templates', 'default' ),
		to:   jetpack.path( _this.project.path.cwd(), 'templates', _this.project.slug )
	}

	copyTemplate( paths );
	return 'New template named ' + _this.project.slug + ' has been created';
});

module.exports = Project;


/*******************
 * Private Methods *
 *******************/


function copyTemplate( paths ) {
	var opts = { overwrite: true };
	return jetpack.copy( paths.from, paths.to , opts );
}

function copyNewProject( paths ) {
	var opts = { overwrite: true, matching: [ '**/*', '!templates/' ] };
	return jetpack.copy( paths.from, paths.to, opts );
}

function isProject( projectPath ) {
	var file = jetpack.path( projectPath, '.s3f' );
	return jetpack.read( file, 'json' );
}

function isEmpty( projectPath ) {
	var _path = jetpack.inspectTree( projectPath );
	if (_.isUndefined( _path ) || _.isEmpty( _path.children ) ) {
		return true;
	} else {
		return false;
	}
}
