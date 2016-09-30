module.exports = function( gulp, cb ) {
	gulp.p.sequence( [ 'watch:styles', 'watch:views', 'watch:scripts', 'watch:images', 'watch:fonts' ] )(cb);
}
