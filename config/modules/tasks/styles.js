var jetpack     = require('fs-jetpack');
var _ 		    = require('lodash');
var makeGlob    = require( __dirname + '/../../lib/make-glob');
var localConfig = require( __dirname + '/../../lib/local-config');

var cwd         = require( __dirname + '/../paths/cwd' );
var src         = require( __dirname + '/../paths/src' );
var serve       = require( __dirname + '/../paths/serve' );
var dist        = require( __dirname + '/../paths/dist' );
var styleFile   = require( __dirname + '/../files/styles');


var name = 'styles';
var path = {
	src:  'styles',
	dest: 'styles'
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
		src:    makeGlob([ src, path.src, styleFile.src ]),	// jetpack.path( src, path, styleFile.src ),
		ignore: styleFile.ignore,
		watch:  jetpack.path( src, path.src, '**', '*' ),
		serve:  servePath,
		dist:   distPath
	},
	file: styleFile
}
