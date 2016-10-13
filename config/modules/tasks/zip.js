var jetpack     = require('fs-jetpack');
var _ 		    = require('lodash');
var localConfig = require( __dirname + '/../../lib/local-config');

var cwd         = require( __dirname + '/../paths/cwd' );
var serve       = require( __dirname + '/../paths/serve' );
var dist        = require( __dirname + '/../paths/dist' );
var filename    = 'build.zip';

if (localConfig) filename = _.camelCase(localConfig.project.name) + '.zip';

module.exports = {
	filename: filename,
	paths:    {
		src:  jetpack.path( dist ),
		dest: jetpack.path( cwd )
	}
};
