var jetpack    = require('fs-jetpack');
var requireDir = require('require-dir');
var _build     = requireDir( __dirname + '/_build/', { recurse: true });

module.exports = {
	partials:    {
		styles: {
			src:  jetpack.path( __dirname, '..', 'templates', 'partials', 'styles.tpl' ),
			dest: jetpack.path( _build.paths.cwd, _build.parts.src, 'styles', 'partials' ),
			include: jetpack.path( _build.paths.cwd, _build.parts.src, 'styles', 'default.scss' )
		},
		views: {
			src:  jetpack.path( __dirname, '..', 'templates', 'partials', 'views.tpl' ),
			dest: jetpack.path( _build.paths.cwd, _build.parts.src, 'views', '_partials' ),
			include: jetpack.path( _build.paths.cwd, _build.parts.src, 'views', 'index.pug' )
		}
	}
}
