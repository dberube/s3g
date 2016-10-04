module.exports = function( gulp, cb ) {

	gulp.p.util.log('Build', 'Starting build for deployment', gulp.p.util.colors.yellow( 'START' ));
	gulp.p.sequence( 'clean', 'static', 'bower', [ 'styles', 'views' ], 'clean:vendors' )(cb);


}
