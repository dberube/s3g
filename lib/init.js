var jetpack = require('fs-jetpack');
var _       = require('lodash');
var config  = require( __dirname + '/../config' );
var helpers = require( __dirname + '/helpers' );

var Init = function( name ) {
	this.config  = config;
	this.s3g     = config.s3g;
	this.files   = {};
	this.step    = {};
	this.project = {
		name: name || 's3g Starter Site',
		slug: _.kebabCase( name ) || 's3g-starter-site',
		paths: {
			base: config.paths.cwd,
			src:  config.paths.src
		},
		files: {
			styles: 'default.scss'
		}
	};
}

Init.prototype.make = function () {
	var _this = this;

	return new Promise(function(resolve, reject) {

		_this
			.isEmpty( _this )
			.then( _this.coreFiles )
			.then( _this.srcFiles )
			.then(function(res) {
				return resolve( _this.project );
			})
			.catch(function(err) {
				return reject( err );
			});

	});
};

Init.prototype.isEmpty = function ( site ) {
	return helpers.dir.isEmpty( site );
};

Init.prototype.coreFiles = function ( site ) {
	return helpers.files.core( site );
};

Init.prototype.srcFiles = function ( site ) {
	return helpers.files.src( site );
};

module.exports = Init;
