var jetpack = require('fs-jetpack');
var chalk   = require('chalk');
var _       = require('lodash');

var config  = require( __dirname + '/../config' );

module.exports = function() {
	var logo = _.template( jetpack.read( config.paths.store.logo + '.3' ) );
	logo     = logo(config.s3g);
	logo     = chalk.magenta.bold( logo );

	process.stdout.write( logo );
}
