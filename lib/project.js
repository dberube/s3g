var Promise = require('bluebird');
var jetpack = require('fs-jetpack');
var _       = require('lodash');
var util    = require('util');
var events  = require('events');
var chalk   = require('chalk');
var ui      = require( __dirname + '/ui' );
var pkg     = require( __dirname + '/../package' );

var args    = _.slice( process.argv, 2 );
var cwd     = process.cwd();
var command = args[0];
var args    = _.slice( args, 1 );

var serverPort = 3000;

var Project = function( command, options ) {
	this.command          = command;
	this.options          = options;
	this.project          = this.loadConfig( this.options );
	this.s3f 		      = this.s3fConfig();

	this.validCommands    = [ 'init', 'new', 'template', 'dev', 'test' ];
};

Project.prototype = new events.EventEmitter();

Project.prototype.runCommand = function() {
	var _this   = this;
	var command = _this.command;
	var options = _this.options;

	var validCommand = _.indexOf( _this.validCommands, command );
	if (validCommand < 0) throw new Error( 'Invalid command, please try again' );

	ui.header(function(err, res) {
		if (err) throw err;
		_this[ command ]();
	});
};


/**********************
* Available Commands *
**********************/

//
// 	Command:		init
//	Description: 	Initiate a new s3f project
//

Project.prototype.init = function() {
	var _this       = this;
	_this.project.template = 'default';

	ui.task( 'Initializing a new s3f project...' );

	if (!_this.isEmpty()) {
		throw new Error( 'The path specified must be empty to run the init command' );
	}

	ui.task( 'Compiling project configuration...' );
	_this.saveConfig();
	ui.task( 'Copying project files...' );
	_this.copyProjectFiles();

	ui.task('Installing s3f dependencies...');

	var npm = _this.npmInstall();

	npm.on( 'close', function() {
		// _this.state.stop();
		ui.task( 'Your s3f project has been installed at ' + _this.project.path + '...' );
		ui.success();
		ui.end();
	});

};

Project.prototype.npmInstall = function() {
	var _this = this;
	var spawn = require('child_process').spawn;

	return spawn( 'npm', ['install'], { cwd: _this.project.path });

	npm.stdout.on('data', function( data ) {});
	npm.stderr.on('data', function( data ) {
		console.log( '      ', data.toString() );
	});

	npm.on( 'close', function( res ) {
		_this.emit('npmInstall-done');
	});

	npm.on( 'exit', function( code ) {
		// _this.emit('npmInstall-exit', code);
	});

	// var npm = spawn( 'npm', ['install'], { cwd: _this.project.path });
};

//
// 	Command:		new
//	Description: 	Creates and sets a new template as active
//

Project.prototype.new = function() {
	var _this                 = this;
	var name                  = _.kebabCase(_this.options[0]) || false;

	ui.task('Creating a new template...');

	if (!_this.isProject()) {
		return ui.task( 'The path specified must be an existing s3f project...' ).fail().end();
	} else if (name === false) {
		return ui.task( 'You must specify a new template name...' ).fail().end();
	}

	ui.task('Copying template files to s3f project...');

	_this.copyTemplateFiles(name);
	_this.project.template = name;
	_this.saveConfig();

	ui.task('Creating the new template...');

	setTimeout(function() {
		return ui.task('Activating the new template: ' + chalk.bold( _this.project.template) ).success().end();
	}, 2000);

	// return 'New template named ' + _this.project.template + ' has been created and is currently your active template';
};

//
// 	Command:		template
//	Description: 	Return the current template name or set a different one
//

// Project.prototype.template = Promise.method(function() {
Project.prototype.template = function() {
	var _this       = this;
	var name        = _.kebabCase(_this.options[0]) || false;
	var oldTemplate = _this.project.template;

	ui.task( 'Loading s3f project settings...' );

	if (name === false) {
		return ui.task( 'Current template name: ' + chalk.bold( oldTemplate ) ).success().end();
	}

	_this.project.template = name;

	if (!_this.isTemplate()) {
		return ui.task( 'Template ' + chalk.bold(name) + ' does not exist. Use the ' + chalk.bold('new') + ' command...' ).fail().end();
	}

	ui.task( 'Changing s3f project template...' );
	_this.saveConfig();
	ui.task( 'Activating the template: ' + chalk.bold( _this.project.template) ).success().end();
};

//
// 	Command:		dev
//	Description: 	Launches a development server, compiles files and reloads browser on changes
//

Project.prototype.dev = function() {
	var _this   = this;
	_this.gulpDev();
};


/******************
* Helper methods *
******************/


Project.prototype.loadConfig = function( options ) {
	var _this     = this;
	_this.project = jetpack.read( jetpack.path( cwd, '.s3f.json' ), 'json' ) || false;

	if (_this.project === false) {
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
		file:    jetpack.path( _this.project.path, '.s3f.json' ),
		content: _.template(jetpack.read( jetpack.path( _this.s3f.paths.project, '.s3f.template' ), 'utf-8' ))
	};

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

// Project.prototype.npmInstall = Promise.method(function() {
// 	var _this = this;
// 	var spawn = require('child_process').spawn;
// 	var npm   = spawn( 'npm', ['install'], { cwd: _this.project.path });
//
// 	npm.stdout.on( 'data', function( data ) {
// 		console.log( 'stdout: ' + data.toString() );
// 	});
//
// 	npm.stderr.on( 'data', function( data ) {
// 		console.log( 'stderr ' + data.toString() );
// 	});
//
// 	npm.on( 'exit', function( code ) {
// 		return 'A new s3f project was initiated in ' + _this.project.path;
// 	});
// });



Project.prototype.gulpDev = function () {
	var _this = this;
	var spawn = require('child_process').spawn;

	jetpack.cwd( _this.project.path );
	var gulp = spawn( 'gulp', ['dev'], { cwd: jetpack.cwd() });

	gulp.stdout.on( 'data', function( data ) {
		console.log( 'stdout: ' + data.toString() );
	});

	gulp.stderr.on( 'data', function( data ) {
		console.log( 'stderr ' + data.toString() );
	});

	gulp.on( 'exit', function( code ) {
		console.log('child process exited with code ' + code.toString());
	});
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

Project.prototype.isProject = function () {
	var _this     = this;
	var isProject = jetpack.exists( jetpack.path( _this.project.path, '.s3f.json' ) );
	if (isProject != 'file') return false;
	return true;
};

Project.prototype.isTemplate = function () {
	var _this     = this;
	var isTemplate = jetpack.exists( jetpack.path( _this.project.path, 'templates', _this.project.template ) );
	if (isTemplate != 'dir') return false;
	return true;
};

module.exports = Project;
