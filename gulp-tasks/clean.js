module.exports = function( gulp, cb ) {

	gulp.p.util.log('Cleaning', 'Ensuring a nice clean environment for you...', gulp.p.util.colors.magenta('123'));

	gulp.p.sequence( 'clean:development' )(cb);

}
