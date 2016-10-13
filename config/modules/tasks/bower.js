var jetpack     = require('fs-jetpack');
var _ 		    = require('lodash');
var localConfig = require( __dirname + '/../../lib/local-config');

var cwd         = require( __dirname + '/../paths/cwd' );
var src         = require( __dirname + '/../paths/src' );
var serve       = require( __dirname + '/../paths/serve' );
var dist        = require( __dirname + '/../paths/dist' );

var name = 'vendors';
var path = {
	src: '.vendors',
	dest: 'vendors'
};

if (localConfig && !_.isUndefined(localConfig.project.config.assetPath)) {
	var servePath = jetpack.path( serve, localConfig.project.config.assetPath, path.dest );
	var distPath  = jetpack.path( dist, localConfig.project.config.assetPath, path.dest );
} else {
	var servePath = jetpack.path( serve, path.dest );
	var distPath  = jetpack.path( dist, path.dest );
}

module.exports = {
	name: name,
	path: path,
	paths: {
		src:   jetpack.path( cwd, path.src, '**', '*' ),
		watch: jetpack.path( src, path.src, '**', '*' ),
		copy:  jetpack.path( src, path.src, '**', '*' ),
		temp:  jetpack.path( cwd, path.src ),
		serve: servePath,
		dist:  distPath
	}
}
