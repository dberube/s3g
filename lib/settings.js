var jetpack    = require('fs-jetpack');
var _          = require('lodash');
var config     = require( __dirname + '/../config' );

var Settings = function() {
	this.file     = jetpack.path( config.paths.cwd, '.s3g.json' );
	this.settings = jetpack.read( this.file, 'json' );
	this.opts     = { jsonIndent: 4 };
}

Settings.prototype.get = function(key) {
	var _this = this;

	if (_.isUndefined(key)) return _this.settings.project.config;

	if (_.isEmpty( _this.settings.project.config[ key ])) return null;
	return _this.settings.project.config[ key ];
};

Settings.prototype.set = function(key, value) {
	var _this = this;
	_this.settings.project.config[ key ] = value;
	_this.save();
};

Settings.prototype.delete = function(key) {
	var _this = this;
	delete _this.settings.project.config[ key ];
	_this.save();
};

Settings.prototype.save = function() {
	var _this = this;
	jetpack.write( _this.file, _this.settings, _this.opts );
};

module.exports = new Settings();
