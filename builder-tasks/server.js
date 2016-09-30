module.exports = function( gulp, cb ) {
	var src = gulp.cfg.paths.development;

	gulp.p.util.log('Server', 'Starting Development Server', gulp.p.util.colors.yellow( 'START' ));

	return gulp.bs.init({
		server: src,
		port:   gulp.cfg.build.server.port || 3000
	});
}
