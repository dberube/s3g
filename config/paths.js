var jetpack    = require('fs-jetpack');
var requireDir = require('require-dir');
var _build     = requireDir( __dirname + '/_build/', { recurse: true });

module.exports = {
	core:        jetpack.path( '..', _build.paths.core, _build.parts.src ),
	cwd:         jetpack.path( _build.paths.cwd, _build.parts.src ),
	development: jetpack.path( _build.paths.cwd, _build.parts.development ),
	build:       jetpack.path( _build.paths.cwd, _build.parts.build ),
	cache:       jetpack.path( _build.paths.cwd, '.cache' ),
}
