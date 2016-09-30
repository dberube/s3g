module.exports = function( gulp, cb ) {
	var del = require('del')
	var src = gulp.cfg.build.vendors.src;
	del([ src ]);
	cb();
}
