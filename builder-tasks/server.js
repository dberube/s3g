module.exports = function( gulp, cb ) {
	var src = gulp.cfg.paths.development;

	process.stdout.write('\r\n');
	
	gulp.p.util.log( gulp.p.util.colors.green('SERVER:\t'), 'Starting Development Server\r\n\r\n' );

	return gulp.bs.init({
		server: src,
		port:   gulp.cfg.build.server.port || 3000
	});
}
