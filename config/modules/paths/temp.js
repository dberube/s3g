var jetpack = require('fs-jetpack');
var cwd     = require( __dirname + '/cwd' );

module.exports = jetpack.path( cwd, '.temp' );
