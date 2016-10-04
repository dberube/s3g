module.exports = function( gulp, cb ) {

	gulp.p.util.log(
		gulp.p.util.colors.green('CLEANING:\t'),
		'Removing development files and cleaning the workspace up'
	);

	gulp.p.sequence([ 'clean:development', 'clean:build', 'clean:vendors' ])(cb);

}
