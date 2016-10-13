var jetpack = require('fs-jetpack');
var cwd     = require( __dirname + '/../modules/paths/cwd' );
var file    = '.s3g.json';

if (jetpack.exists(jetpack.path( cwd, file ))) {
	module.exports = jetpack.read( jetpack.path( cwd, file ), 'json' );
} else {
	module.exports = false;
}
