module.exports = function( gulp, cb ) {
	gulp.p.util.log('Development', 'Starting development watch and server', gulp.p.util.colors.magenta('123'));
	gulp.p.sequence( 'clean', 'static', 'bower', [ 'styles', 'views' ], [ 'server', 'watch' ] )(cb);
}
