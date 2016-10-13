module.exports = function( gulp, cb ) {
	gulp.p.sequence( 'clean', 'bower', [ 'styles', 'views', 'statics' ], [ 'server', 'watch' ] )(cb);
}
