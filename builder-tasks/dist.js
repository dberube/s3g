module.exports = function( gulp, cb ) {
	gulp.task('_core', function(cb) {
		gulp.p.sequence(
			'clean', 'bower',
			[ 'styles', 'views', 'statics' ],
			[ 'clean:vendors', 'clean:temp', 'clean:serve' ],
			'copy:package'
		)(cb);
	});

	gulp.task('_zip', function(cb) {
		gulp.p.sequence( 'zip' )(cb);
	});

	gulp.task('_done', function(cb) {
		gulp.p.sequence( 'done:build' )(cb);
	});

	if (gulp.runZip === true) gulp.p.sequence( '_core', '_zip', '_done' )(cb);
	else gulp.p.sequence( '_core', '_done' )(cb);
}
