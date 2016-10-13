var jetpack     = require('fs-jetpack');
var _ 		    = require('lodash');
var localConfig = require( __dirname + '/../../lib/local-config');

var cwd         = require( __dirname + '/../paths/cwd' );
var serve       = require( __dirname + '/../paths/serve' );
var dist        = require( __dirname + '/../paths/dist' );

module.exports = {
	package: {
		src:  jetpack.path( cwd, 'package.json' ),
		dest: jetpack.path( dist )
	}
};
