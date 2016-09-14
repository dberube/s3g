var Promise = require('bluebird');
var jetpack = require('fs-jetpack');
var _       = require('lodash');
var pkg     = require( __dirname + '/../package' );

var args    = _.slice( process.argv, 2 );
var cwd     = process.cwd();
var command = args[0];
var args    = _.slice( args, 1 );

var Project = function( command, options ) {
	this.command          = command;
	this.options          = options;
	this.project          = this.loadConfig( this.options );
	this.s3f 		      = this.s3fConfig();

	this.validCommands    = [ 'init', 'new', 'template' ];
}

Project.prototype.runCommand = Promise.method(function() {
	var _this   = this;
	var command = _this.command;
	var options = _this.options;

	var validCommand = _.indexOf( _this.validCommands, command );
	if (validCommand < 0) throw new Error( 'Invalid command, please try again' );

	return _this[ command ]();
});


/**********************
 * Available Commands *
 **********************/


Project.prototype.init = Promise.method(function() {
	var _this       = this;
	_this.project.template = 'default';

	if (!_this.isEmpty()) {
		throw new Error( 'The path specified must be empty to run the init command' );
	}

	_this.saveConfig();
	_this.copyProjectFiles();

	return 'A new s3f project was initiated in ' + _this.project.path + ' with a template name of: ' + _this.project.template;
});

Project.prototype.template = Promise.method(function() {
	var _this       = this;
	var name        = _.kebabCase(_this.options[0]) || false;
	var oldTemplate = _this.project.template;

	if (name == false) return 'Current s3f template: ' + oldTemplate;

	_this.project.template = name;
	_this.saveConfig();

	return 'Updated s3f project to use the template: ' + _this.project.template;
});

Project.prototype.new = Promise.method(function() {
	var _this                 = this;
	var name                  = _.kebabCase(_this.options[0]) || false;

	if (!_this.isProject()) {
		throw new Error( 'The path specified must be an existing s3f project' );
	} else if (name == false) {
		throw new Error( 'You must specify a new template name, and optionally a path to the s3f project' );
	}

	_this.copyTemplateFiles(name);
	_this.project.template = name;
	_this.saveConfig();

	return 'New template named ' + _this.project.template + ' has been created and is currently your active template';
});


/******************
 * Helper methods *
 ******************/


Project.prototype.loadConfig = function( options ) {
	var _this     = this;
	_this.project = jetpack.read( jetpack.path( cwd, '.s3f' ), 'json' ) || false;

	if (_this.project == false) {
		_this.project = {
			version:  pkg.version,
			template: 'default',
			path:     jetpack.path( options[0] || '.' )
		};
	}

	return _this.project;
};

Project.prototype.s3fConfig = function() {
	var _this     = this;
	_this.s3f = {
		paths: {
			app:      jetpack.path( __dirname, '..' ),
			project:  jetpack.path( __dirname, '..', '.project' ),
			template: jetpack.path( __dirname, '..', '.project', 'templates', 'default' ),
		}
	};

	_this.s3f.config = {
		file:    jetpack.path( _this.project.path, '.s3f' ),
		content: _.template(jetpack.read( jetpack.path( _this.s3f.paths.project, '.s3f.template' ), 'utf-8' ))
	}

	return _this.s3f;
};

Project.prototype.saveConfig = function() {
	var _this    = this;
	var file     = _this.s3f.config.file;
	var data     = _this.project;

	jetpack.write( file, data, { atomic: false, jsonIndent: 4 });
};

Project.prototype.copyProjectFiles = function () {
	var _this = this;
	var opts  = { overwrite: true, matching: [ '**/*', '!.s3f.template' ] };

	jetpack.copy( _this.s3f.paths.project, _this.project.path, opts );
	return _this.project.path;
};

Project.prototype.copyTemplateFiles = function ( name ) {
	var _this           = this;
	var opts            = { overwrite: true };
	var newTemplatePath = jetpack.path( _this.project.path, 'templates', name );

	jetpack.copy( _this.s3f.paths.template, newTemplatePath, opts );
	return newTemplatePath;
};

Project.prototype.isEmpty = function () {
	var _this     = this;
	var isEmpty   = jetpack.inspectTree( _this.project.path );

	if (_.isUndefined( isEmpty ) || _.isEmpty( isEmpty.children ) ) {
		return true;
	} else {
		return false;
	}
};

module.exports = Project;
