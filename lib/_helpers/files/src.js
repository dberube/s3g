var jetpack = require('fs-jetpack');
var _       = require('lodash');

module.exports = function( site ) {
	return new Promise(function(resolve, reject) {
		site.step.src = 'started';

		var paths = {
			from: site.config.paths.store.src,
			to:   site.project.paths.src
		};

		jetpack.copy( paths.from, paths.to, { overwrite: true });

		site.step.src = 'completed';
		return resolve( site );
	});
}
