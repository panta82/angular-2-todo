//noinspection TypeScriptUnresolvedVariable
System.config({
	packages: {
		app: {
			format: 'register',
			defaultExtension: 'js'
		}
	},
	map: {
		lodash: 'vendor/lodash.js'
	}
});

//noinspection TypeScriptUnresolvedVariable
System.import('app/main')
	.then(null, console.error.bind(console));
