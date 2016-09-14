var path       = require('path');
var express    = require('express');
var app        = express();
var staticPath = path.join(__dirname, '/dist');
var config     = require( __dirname + '/config' );

app.use(express.static( staticPath ));
app.listen( config.server.port, function() {
	console.log( 'Listening on port ' + config.server.port + '.' );
});
