'use strict';

var logSymbols = require('log-symbols');
var chalk      = require('chalk');
var jetpack    = require('fs-jetpack');
var _   	   = require('lodash');

var config   = require( __dirname + '/../config' );
var Deploy   = require( __dirname + '/../lib/deploy' );
var settings = require( __dirname + '/../lib/settings' );

module.exports = function(program) {
	program
		.command( 'deploy' )
		.option('-k, --key [awsKey]', 'Your AWS Access Key')
		.option('-s, --secret [awsSecrey]', 'Your AWS Secret Key')
		.option('-b, --bucket [bucket]', 'Bucket/Domain to Deploy To')
		.description( 'Deploy your static site to AWS S3' )
		.action( handler );

};

function handler( program ) {

	var params = {
		accessKeyId:     program.key    || settings.get('awsKey') 	|| false,
		secretAccessKey: program.secret || settings.get('awsSecret') || false,
		bucket:          program.bucket || settings.get('awsBucket') || false,
		publicRoot:      config.paths.dist
	};

	_.forEach(params, function( param, key ) {
		if (param === false) throw new Error( 'You must either set ' + key + ' via the config set command or as an option to the deploy command' );
	});

	var deploy = Deploy.s3( params );

	deploy
		.then(function(results) {
			var msg = chalk.green.bold( 'Successfully deployed site to ' + chalk.yellow.bold('http://' + params.bucket ));

			console.log( '' );
			console.log( msg );
			console.log( '' );

		})
		.catch(function(error) {
			process.exit(console.log( 'ERROR:', error ));
		});
}

function deployHandler(error, result) {
	if (error) {
		console.log( ' ' );
		console.log( 'Error:', error );
		console.log( ' ' );
		process.exit(1);
	}

	console.log( ' ' );
	console.log( 'Result:', result );
	console.log( ' ' );
	process.exit(0);
}
