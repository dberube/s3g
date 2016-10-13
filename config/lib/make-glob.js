var jetpack = require('fs-jetpack');
var _       = require('lodash');

function makeGlob( src ) {
	var last = _.first(_.takeRight( src, 1 ));
	src      = _.dropRight( src, 1 );
	var path = makeBasePath( src );

	if (_.isString(last)) return fromString( path, last );
	return fromArray( path, last );
}

module.exports = makeGlob;

function fromArray( path, last ) {
	var results = [];

	_.forEach(last, function(_last) {

		if (_.first(_last) == '!') {
			_last = _.trimStart(_last, '!');
			results.push( '!' + jetpack.path( path, _last ) );
			return;
		}

		results.push( jetpack.path( path, _last ) );
	});

	return results;

}

function fromString( path, last ) {
	return jetpack.path( path, last );
}

function makeBasePath( src ) {
	var path = jetpack.path();

	_.forEach(src, function(_src) {
		path = jetpack.path( path, _src );
	});

	return path;
}
