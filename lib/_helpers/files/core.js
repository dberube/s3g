var jetpack = require('fs-jetpack');
var _       = require('lodash');

module.exports = function( site ) {
	return new Promise(function(resolve, reject) {
		site.step.core = 'started';

		var paths = {
			from: site.config.paths.store.core,
			to:   site.project.paths.base
		};

		var tree = jetpack.inspectTree( paths.from );

		var files = _.map( (jetpack.inspectTree(paths.from)).children, function( file ) {
			if (file.type != 'file') return false;

			var file = {
				path:    jetpack.path( paths.to, file.name ),
				content: (_.template( jetpack.read( jetpack.path( paths.from, file.name ) )))( site )
			};

			return file;
		});

		_.forEach( files, function( file ) {
			jetpack.write( file.path, file.content );
		});

		site.step.core = 'completed';

		return resolve( site );
	});
}
