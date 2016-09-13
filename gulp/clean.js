module.exports = function( gulp, cb ) {
	gulp.p.sequence( 'clean:dist' )(cb);
}
