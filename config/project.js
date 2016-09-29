var jetpack    = require('fs-jetpack');
var requireDir = require('require-dir');
var _build     = requireDir( __dirname + '/_build/', { recurse: true });

module.exports = {
	copy: {
		from: _build.paths.core,
		to:   _build.paths.cwd
	},
	cwd:    _build.paths.cwd,
	config: jetpack.path( _build.paths.cwd, '.s3f.json' )
}
