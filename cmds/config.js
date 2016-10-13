'use strict';

var logSymbols = require('log-symbols');
var chalk      = require('chalk');
var jetpack    = require('fs-jetpack');
var _          = require('lodash');
var print      = require( __dirname + '/../lib/print' );
var config     = require( __dirname + '/../config' );
var Builder    = require( __dirname + '/../lib/builder' );
var settings   = require( __dirname + '/../lib/settings' );

module.exports = function(program) {

	program
		.command( 'config [action] [key=value...]' )
		.description( 'Set a configuration value. Action: <set|get|rm>, Keys: <netlify-site-id|netlify-access-token>' )
		.action( handler );
};

function handler( action, keyValues ) {
	action = _.toLower( action );

	if (action == 'set') 					setConfig( keyValues );
	if (action == 'get') 					getConfig( keyValues );
	if (action == 'rm' || action == 'del')  delConfig( keyValues );
	if (action == '') 						getConfig( keyValues );
}

function delConfig( keys ) {
	_.forEach( keys, function( key ) {
		settings.delete( key );
		console.log( 'Key: ' + key, 'DELETED' );
	});
}

function getConfig( keys ) {
	var items = [];

	_.forEach( keys, function( key ) {
		var item   = {};
		item.key   = key;
		item.value = settings.get( key );
		if (_.isNull(item.value)) item.value = '<not set>';
		items.push( item );
	});

	if (_.isEmpty(keys)) {
		items = settings.get();
	}

	print.logo();

	console.log( '' );
	console.log( '\tConfiguration Settings:' );
	console.log( '\t------------------------------------------------------------' );
	console.log( '' );
	console.log( '\t', items );
	console.log( '' );
}

function setConfig( keyValues ) {
	if (_.isUndefined( keyValues )) return console.log( 'Nothing sent with command to set...' );

	var items = [];

	_.forEach(keyValues, function( keyValue ) {
		keyValue  = _.split( keyValue, '=' );
		var item = {};
		item.key   = keyValue[0];
		item.value = keyValue[1];
		items.push( item );

		settings.set( item.key, item.value );
	});

}
