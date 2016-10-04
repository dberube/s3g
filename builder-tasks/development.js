module.exports = function( gulp, cb ) {

	process.stdout.write('\r\n');

	gulp.p.util.log(
		gulp.p.util.colors.green('DEVELOPMENT:\t'),
		'Starting Development Server'
	);

	process.stdout.write('\r\n');

	gulp.p.sequence( 'clean', 'static', 'bower', [ 'styles', 'views' ], [ 'server', 'watch' ] )(cb);
}
