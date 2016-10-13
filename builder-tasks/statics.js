module.exports = function( gulp, cb ) {
	gulp.p.sequence([ 'statics:scripts', 'statics:images', 'statics:fonts' ])(cb);
}
