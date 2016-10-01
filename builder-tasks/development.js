module.exports = function( gulp, cb ) {
	gulp.p.util.log('Development', 'Starting development watch and server', gulp.p.util.colors.yellow( 'START' ));

	gulp.p.sequence( 'clean:development', 'static', 'bower', [ 'styles', 'views' ], [ 'server', 'watch' ] )(cb);
}
