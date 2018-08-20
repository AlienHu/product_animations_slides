var argv = require('yargs')
    .usage('Usage: $0 -e <envirnment> -app <AppName> -p <platform> ')
    .alias('e', 'env')
    .describe('e', 'environment(development/production)')
    .default('e', 'development')
    .alias('a', 'app')
    .describe('a', 'Apptype to run (cloud/retail/restaurant)')
    .default('a', 'cloud')
    .help('h')
    .alias('h', 'help')
    .argv;

var shelljs = require('shelljs');
var cwd = shelljs.pwd();
var directories2Build = ['profitGuruDAPP', 'profitGuruMAPP', 'PGServerJs'];
directories2Build.forEach(function (buildDir) {
    shelljs.cd(cwd + '/../' + buildDir);
    if (buildDir !== 'PGServerJs') {
        shelljs.exec('gulp build4Website --env ' + argv.e + ' --app ' + argv.a);
    } else {
        shelljs.exec('gulp build  --app cloud');
    }
});