var jetpack = require('fs-jetpack');
var chalk   = require('chalk');
var _       = require('lodash');
var config  = require( __dirname + '/../config' );

var print = {

	logo: function() {
		var logo = _.template( jetpack.read( config.paths.store.logo + '.3' ) );
		logo     = chalk.magenta.bold( logo(config.s3g) );
		process.stdout.write( logo );
	},

	banner: function( params ) {
		var label   = params.label 		|| '\t';
		var msg     = params.msg 		|| '';
		var bgColor = params.bgColor 	|| false;
		var color   = params.color 		|| false;
		var style   = params.style 		|| false;
		var Row     = chalk;

		if (!bgColor && !color && !style) Row = process.stdout.write;

		if (bgColor) Row = Row[bgColor];
		if (color) 	 Row = Row[color];
		if (style) 	 Row = Row[style];

		// process.stdout.write( Row('\n') );
		process.stdout.write( Row('\r\n\t   ' + label + '\t ' + msg) );
		// process.stdout.write( Row('\r') );

		this.spacer();
	},

	spacer: function(lines) {
		var spacer = '\n\n';
		if (_.isNumber(lines)) spacer = _.repeat('\n', lines);
		process.stdout.write( spacer );
	},
}

module.exports = print;
