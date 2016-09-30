module.exports = function( gulp, cb ) {

	gulp.p.util.log('Cleaning', 'Ensuring a nice clean environment for you...', gulp.p.util.colors.yellow( 'START' ));

	gulp.p.sequence([ 'clean:development', 'clean:build', 'clean:vendors' ])(cb);

}
