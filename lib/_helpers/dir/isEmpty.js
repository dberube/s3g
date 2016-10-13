var jetpack = require('fs-jetpack');
var _       = require('lodash');

module.exports = function( site ) {

	var path = (_.isString(site)) ? site : site.project.paths.base;

	return new Promise(function(resolve, reject) {
		var dir = jetpack.inspectTree( path );

		if (_.isUndefined( dir ) || _.isEmpty( dir.children ))
			return resolve( site );
		else
			return reject( new Error('This path/directory already contains files or sub directories') );
	});
}
