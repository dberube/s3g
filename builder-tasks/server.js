module.exports = function( gulp, cb ) {
	var src  = gulp.config.server.src;
	var port = process.env['PORT'] || gulp.config.server.port || 3000;

	gulp.print.task( 'SERVER', 'Starting Development Web Server on Port ' + port );
	gulp.printNew.spacer();

	setTimeout( serverLogBanner.bind( gulp ), 500 );

	return gulp.bs.init({
		server:         src,
		port:           port,
		notify:         false,
		ui:             false
	});
}

function serverLogBanner() {
	var gulp = this;
	gulp.printNew.spacer(1);
	gulp.printNew.banner({
		label:   '\n\tLive Development Server Log:\n',
		bgColor: 'bgBlue',
		color:   'white',
		style:   'dim'
	});
}
