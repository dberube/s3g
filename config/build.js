var requireDir     = require('require-dir');
var jetpack        = require('fs-jetpack');
var _ 			   = require('lodash');

var paths          = require( __dirname + '/paths' );
var _build         = requireDir( __dirname + '/_build/', { recurse: true });

exports.server     = _build.server;

exports.components = {

	styles: {
		paths:     makePaths( _build.components.styles ),
		src:       _build.globs.src.styles,
		watch:     _build.globs.watch.styles,
		filenames: _build.filenames.styles || false
	},

	views: {
		paths:     makePaths( _build.components.views ),
		src:       _build.globs.src.views,
		watch:     _build.globs.watch.views,
		filenames: _build.filenames.views || false
	},

	scripts: {
		paths:     makePaths( _build.components.scripts ),
		src:       _build.globs.src.scripts,
		watch:     _build.globs.watch.scripts,
		filenames: _build.filenames.scripts || false
	},

	images: {
		paths:     makePaths( _build.components.images ),
		src:       _build.globs.src.images,
		watch:     _build.globs.watch.images,
		filenames: _build.filenames.images || false
	},

	fonts: {
		paths:     makePaths( _build.components.fonts ),
		src:       _build.globs.src.fonts,
		watch:     _build.globs.watch.fonts,
		filenames: _build.filenames.fonts || false
	}

};

exports.vendors   = {
	development: jetpack.path( _build.parts.development, _build.dest.vendors ),
	build:       jetpack.path( _build.parts.build, _build.dest.vendors ),
};

exports.clean     = {
	development: [ _build.parts.development ],
	build:       [ _build.parts.build ]
};

function makePaths( component ) {
	var results = {
		core:        jetpack.path( paths.core, component ),
		cwd:         jetpack.path( paths.cwd, component ),
		development: jetpack.path( _build.parts.development, _build.dest[ component ] ),
		build:       jetpack.path( _build.parts.build, _build.dest[ component ] ),
	}

	if (_.isArray(_build.globs.src[ component ])) {
		results.src = [];
		_.forEach(_build.globs.src[ component ], function( src ) {
			results.src.push( jetpack.path( paths.cwd, component, src ) );
		});
	} else {
		results.src = jetpack.path( paths.cwd, component, _build.globs.src[ component ] );
	}

	if (_.isArray(_build.globs.watch[ component ])) {
		results.watch = [];
		_.forEach(_build.globs.watch[ component ], function( watch ) {
			results.watch.push( jetpack.path( paths.cwd, component, watch ) );
		});
	} else {
		results.watch = jetpack.path( paths.cwd, component, _build.globs.watch[ component ] );
	}

	return results;
}
