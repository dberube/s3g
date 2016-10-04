module.exports = function( gulp, cb ) {
	gulp.p.sequence( 'bower:install', 'bower:copy' )(cb);
}
