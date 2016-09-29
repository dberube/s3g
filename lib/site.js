var Promise = require('bluebird');
var jetpack = require('fs-jetpack');
var _       = require('lodash');
var config  = require( __dirname + '/../config');

var Site = function() {}

Site.prototype.make = Promise.method(function () {
	var _this = this;
	var isEmpty = _this.isEmpty();

	if (isEmpty === false) throw new Error( 'Run this command in a completely empty directory' );

	_this.copyFiles();
	_this.makeConfig();

	return 'New s3f project initialized!';
});;

Site.prototype.isEmpty = function () {
	var _this    = this;
	var cwdEmpty = jetpack.inspectTree( config.project.cwd );

	if (_.isUndefined( cwdEmpty ) || _.isEmpty( cwdEmpty.children ) ) {
		return true;
	} else {
		return false;
	}
};

Site.prototype.copyFiles = function () {
	var _this = this;
	var opts  = { overwrite: true };

	jetpack.copy( config.project.copy.from, config.project.copy.to, opts );
};

Site.prototype.makeConfig = function () {
	var _this = this;
	var opts  = { jsonIndent: 4 };

	var cfg   = {
		s3f:     true,
		version: config.s3f.version,
		path:    config.project.cwd
	}

	jetpack.write( config.project.config, cfg, opts );
};

module.exports = Site;
