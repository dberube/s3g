var gulp = require('gulp');
var _    = require('lodash');

module.exports = {
	header: function( text, bgColor, color, style ) {
		bgColor = bgColor || 'green';
		style   = style || 'bold';

		var write = this.writer({color: color, bg: bgColor, style: style });

		process.stdout.write(
			write(
				'\n\r\n' +
				'\t\t\t'   +
				text +
				'\n'
			)
		);

		this.spacer();
	},

	footer: function( text, bgColor, color, style ) {
		bgColor = bgColor || 'magenta';
		style   = style || 'bold';

		var write = this.writer({color: color, bg: bgColor, style: style });

		process.stdout.write(
			write(
				'\n\n' +
				'\t\t\t'   +
				text +
				'\n'
			)
		);

		this.spacer();
		this.spacer();
	},

	task: function( label, message, labelColor, messageColor ) {
		labelColor   = labelColor || 'green';
		messageColor = messageColor || 'white';

		gulp.p.util.log(
			gulp.p.util.colors[ labelColor ]( label + ': \t'),
			gulp.p.util.colors[ messageColor ]( message )
		);
	},

	spacer: function() {
		process.stdout.write('\r\n\r\n');
	},

	writer: function( params ) {
		bgColor = 'bg' + _.capitalize( params.bg )|| 'black';
		color   = params.color || false;
		style   = params.style || false;

		var writer = gulp.colors;

		if (bgColor) writer   = writer[bgColor];
		if (color)   writer   = writer[color];
		if (style)   writer   = writer[style];

		return writer;
	}
}
