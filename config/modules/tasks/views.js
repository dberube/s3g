var jetpack     = require('fs-jetpack');
var _ 		    = require('lodash');
var makeGlob    = require( __dirname + '/../../lib/make-glob');
var localConfig = require( __dirname + '/../../lib/local-config');

var cwd         = require( __dirname + '/../paths/cwd' );
var src         = require( __dirname + '/../paths/src' );
var serve       = require( __dirname + '/../paths/serve' );
var dist        = require( __dirname + '/../paths/dist' );
var viewFile    = require( __dirname + '/../files/views');

var name     = 'views';
var path     = {
	src:  'views',
	dest: ''
};

if (localConfig && !_.isUndefined(localConfig.project.config.viewPath)) {
	var servePath      = jetpack.path( serve, localConfig.project.config.viewPath, path.dest );
	var distPath       = jetpack.path( dist, localConfig.project.config.viewPath, path.dest );

	viewFile.parts.ext = localConfig.project.config.viewFileExt || viewFile.parts.ext;
} else {
	var servePath = jetpack.path( serve, path.dest );
	var distPath  = jetpack.path( dist, path.dest );
}

module.exports = {
	name: name,
	path: path,
	paths: {
		src:    makeGlob([ src, path.src, viewFile.src ]),   // jetpack.path( src, path.src, viewFile.src )
		ignore: viewFile.ignore,
		watch:  jetpack.path( src, path.dest, '**', '*' ),
		serve:  servePath,
		dist:   distPath
	},
	file: viewFile
}
