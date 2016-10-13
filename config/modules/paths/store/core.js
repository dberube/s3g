var jetpack = require('fs-jetpack');
var s3g     = require( __dirname + '/../s3g' );
var store   = require( __dirname + '/base' );

module.exports = jetpack.path( s3g, store, 'core' );
