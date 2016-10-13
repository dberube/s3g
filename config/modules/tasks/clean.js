var jetpack = require('fs-jetpack');
var cwd     = require( __dirname + '/../paths/cwd' );
var serve   = require( __dirname + '/../paths/serve' );
var dist    = require( __dirname + '/../paths/dist' );
var temp    = require( __dirname + '/../paths/temp' );
var vendors = require( __dirname + '/../paths/vendors' );
var zip     = require( __dirname + '/zip' );

module.exports = {
	serve:   [ serve, temp ],
	dist:    [ dist, temp ],
	zip:     [ jetpack.path( zip.paths.dest, zip.filename ) ],
	temp:    [ temp ],
	vendors: [ vendors.src ],
	all:     [ serve, dist, temp, vendors ]
}
