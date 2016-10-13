module.exports = function( gulp ) {
	return {
		styles: function(cb) {
			console.log( 'Task: styles' );
			gulp.p.sequence( 'styles' )(cb);
		},

		views: function(cb) {
			console.log( 'Task: views' );
			gulp.p.sequence( 'views' )(cb);
		},

		clean: function(cb) {
			console.log( 'Task: clean' );
			gulp.p.sequence( 'clean' )(cb);
		},

		static: function(cb) {
			console.log( 'Task: static' );
			gulp.p.sequence( 'static' )(cb);
		},

		watch: function(cb) {
			console.log( 'Task: watch' );
			gulp.p.sequence( 'watch' )(cb);
		},

		bower: function(cb) {
			console.log( 'Task: bower' );
			gulp.p.sequence( 'bower' )(cb);
		},

		images: function(cb) {
			console.log( 'Task: images' );
			gulp.p.sequence( 'static:images' )(cb);
		},

		scripts: function(cb) {
			console.log( 'Task: scripts' );
			gulp.p.sequence( 'static:scripts' )(cb);
		},

		fonts: function(cb) {
			console.log( 'Task: fonts' );
			gulp.p.sequence( 'static:fonts' )(cb);
		},

		server: function(cb) {
			console.log( 'Task: server' );
			gulp.p.sequence( 'server' )(cb);
		}
	}
};
