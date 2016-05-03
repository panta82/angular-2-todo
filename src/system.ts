//noinspection TypeScriptUnresolvedVariable
System.config({
  packages: {
    app: {
      format: 'register',
      defaultExtension: 'js'
    }
  }
});

//noinspection TypeScriptUnresolvedVariable
System.import('app/main')
.then(null, console.error.bind(console));
