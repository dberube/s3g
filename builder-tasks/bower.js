module.exports = function( gulp, cb ) {
	gulp.p.util.log('Bower', 'Installing Bower Packages', gulp.p.util.colors.yellow( 'START' ));
	gulp.p.sequence( 'bower:install', 'bower:copy' )(cb);
}
