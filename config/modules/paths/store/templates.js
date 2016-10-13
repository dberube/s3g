var jetpack = require('fs-jetpack');
var s3g     = require( __dirname + '/../s3g' );
var styles  = require( __dirname + '/../components/styles' );
var views   = require( __dirname + '/../components/views' );
var store   = require( __dirname + '/base' );

exports.src      = jetpack.path( s3g, store, 'templates' );
exports.partials = {
	src:   jetpack.path( s3g, store, 'templates', 'partials' ),
	style: jetpack.path( s3g, store, 'templates', 'partials', 'style.tpl' ),
	view:  jetpack.path( s3g, store, 'templates', 'partials', 'view.tpl' ),
};
