var requireDir = require('require-dir');
var modules    = requireDir( __dirname + '/modules', { recurse: true });
module.exports = modules;
