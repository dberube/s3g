module.exports = function( gulp, cb ) {
	var del = require('del')
	del( gulp.cfg.build.clean.development );
	cb();
}
