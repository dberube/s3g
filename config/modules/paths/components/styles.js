var jetpack = require('fs-jetpack');
var src     = require( __dirname + '/../src' );

exports.src      = jetpack.path( src, 'styles' );
exports.partials = jetpack.path( src, 'styles', 'partials' );
