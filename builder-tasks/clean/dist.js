module.exports = function( gulp, cb ) {
	var del = require('del')
	del([ gulp.cfg.basePaths.dst ]);
	cb();
}
