var jetpack    = require('fs-jetpack');
module.exports = {
	core: jetpack.path( __dirname, '..', '..', 'files' ),
	cwd: jetpack.cwd()
};
