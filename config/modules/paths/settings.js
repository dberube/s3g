var jetpack  = require('fs-jetpack');
var cwd      = require( __dirname + '/cwd' );

var filename = '.s3g.json';

module.exports = jetpack.path( cwd, filename );
