var util         = require('util');
var chalk        = require('chalk');
var Ora          = require('ora');
var figlet       = require('figlet');
var _            = require('lodash');
var EventEmitter = require('events').EventEmitter;
var emitter      = new EventEmitter();

var spinner;
var set = {
	header: false,
	task:   false
};

var ui = {
	spinner,
	set: {
		header: false,
		task:   false
	},

	header: function(callback) {
		var _this = this;

		figlet("  s3f ", { font: 'Big Money-ne' }, function(err, data) {
			if (err) return callback(err);

			ui.blank(); ui.blank(); ui.blank(); ui.blank();

			console.log( chalk.dim(data) );
			console.log( chalk.dim('             Simple Static Site Framework') );

			ui.line();
			ui.blank();

			return callback(null, true);
		});
	},

	message: function( text ) {
		var _this = this;
		console.log( text );
		return _this;
	},

	blank: function() {
		var _this = this;
		console.log( '\r' );
		return _this;
	},
	line: function() {
		var _this = this;
		console.log( chalk.dim(_.repeat( '—', 70 )) );
		return _this;
	},

	task: function(opts) {
		var _this = this;
		if (_.isString(opts)) { opts = { text: opts }; }

		if (_.isUndefined(opts)) opts = {};
		opts.text 		= opts.text 	|| 'Working that magic, hang tight...';
		opts.spinner 	= opts.spinner 	|| 'bouncingBar';
		opts.color 		= opts.color 	|| 'gray';
		opts.stream     = opts.stream 	|| process.stdout;

		if (_this.set.task === true) {
			_this.success();
		}

		spinner = new Ora(opts);
		spinner.start();
		_this.set.task = true;
		return _this;
	},

	success: function() {
		var _this = this;
		if (!_.isUndefined(spinner.options)) {
			spinner.text = chalk.green('done') + ' ' + spinner.options.text;
		}
		spinner.succeed();
		return _this;
	},

	fail:    function() {
		var _this = this;
		if (!_.isUndefined(spinner.options)) {
			spinner.text = chalk.red('fail') + ' ' + spinner.options.text;
		}
		spinner.fail();
		return _this;
	},

	end: function() {
		var _this = this;
		ui.blank();
		ui.line();
		ui.blank(); ui.blank();
		return _this;
	}
};

module.exports = ui;

// ui.header();
//
// ui.task({text: 'Initializing s3f, hang tight...' });
//
// setTimeout(function() { ui.success().task({text: 'Compiling your new project files...'}); }, 3000);
// setTimeout(function() { ui.success().task({text: 'Loading the files from above...'}); }, 6000);
// setTimeout(function() { ui.fail().task({text: 'Installing s3f dependencies...'}); }, 9000);
// setTimeout(function() { ui.success(); console.log( '\r\n' ); }, 12000);

// module.exports = {
// 	next: function(msg) {
// 		console.log( 'a' );
// 		process.stdout.write(msg);
// 	}
// };
