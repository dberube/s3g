var jetpack = require('fs-jetpack');
var s3g     = require( __dirname + '/../s3g' );

module.exports = jetpack.path( s3g, 'store' );
