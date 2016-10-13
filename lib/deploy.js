var jetpack  = require('fs-jetpack');
var _        = require('lodash');
var s3Deploy = require('s3-easy-deploy');

var helpers  = require( __dirname + '/helpers' );
var config   = require( __dirname + '/../config' );
var settings = require( __dirname + '/settings' );

var Deploy = {
	s3: function( params, callback ) {
		return new Promise(function(resolve, reject) {
			if (isPathDeployable(params.publicRoot)) {
				return resolve( s3Deploy.deploy(params) );
			} else {
				return reject('Try running the build command first');
			}
		});
	}
};

module.exports = Deploy;

function isPathDeployable( path ) {
	var type = jetpack.exists( path );
	if (type == 'dir') return true;
	return false;
}
