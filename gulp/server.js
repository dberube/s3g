module.exports = function( gulp, cb ) {
	return gulp.bs.init({
		server: gulp.cfg.basePaths.dst,
		port:   gulp.cfg.server.port || 3000
	});
}
