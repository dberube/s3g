module.exports = function( gulp, cb ) {
	gulp.p.sequence([ 'static:scripts', 'static:images', 'static:fonts' ])(cb);
}
