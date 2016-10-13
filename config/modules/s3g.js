var _   = require('lodash');
var pkg = require( __dirname + '/../../package.json' );

module.exports = {
	name:    _.trimStart( pkg.name, '@dberube/' ),
	command: _.trimStart( pkg.name, '@dberube/' ),
	version: pkg.version,
	website: pkg.website
}
