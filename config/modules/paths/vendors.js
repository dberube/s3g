var jetpack = require('fs-jetpack');
var cwd     = require( __dirname + '/cwd' );
var serve   = require( __dirname + '/../paths/serve' );
var dist    = require( __dirname + '/../paths/dist' );

var name    = 'vendors';
var srcName = '.vendors';

module.exports = {
	src:     jetpack.path( cwd, srcName ),
	serve:   jetpack.path( serve, name ),
	dist:    jetpack.path( dist, name ),
}
