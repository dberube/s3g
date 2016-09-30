module.exports = {
	src: {
		styles:  'default.scss',
		views:   [
			'**/*.pug',
			'**/*.jade',
			'!{_*.pug,_*.jade,_**/*}'
		],
		scripts: '**/*.js',
		images:  '**/*',
		fonts:   '**/*',
	},

	watch: {
		styles:  '**/*.scss',
		views:   [
			'**/*.pug',
			'**/*.jade',
			'!{_*.pug,_*.jade,_**/*}'
		],
		scripts: '**/*',
		images:  '**/*',
		fonts:   '**/*',
	}
};
