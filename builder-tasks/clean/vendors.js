module.exports = function( gulp, cb ) {
	var del = require('del')
	var src = gulp.cfg.build.vendors.src;

	gulp.p.util.log(
		gulp.p.util.colors.green('CLEAN:\t'),
		'Cleaning up vendor files no longer needed'
	);


	del([ src ]);
	cb();
}
