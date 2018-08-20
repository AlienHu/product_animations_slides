var gulp = require('gulp');
var server = require('gulp-server-livereload');
var serve = require('gulp-serve');
gulp.task('DAPP', serve('profitGuruDAPP'));
gulp.task('MAPP', serve('profitGuruMAPP'));

gulp.task('create-softlinks', function (done) {
    var shelljs = require('shelljs');
    var cwd = shelljs.pwd();

    //AlienHuWebSite
    if (!shelljs.test('-d', cwd + '/middleWares')) {
        shelljs.mkdir(cwd + '/middleWares');
    }

    shelljs.ln('-sf', cwd + '/../profitGuruCore/ClientDeviceProcessor', cwd + '/middleWares/clientDeviceProcessor');
    shelljs.ln('-sf', cwd + '/../PGServerJs', cwd + '/PGServerJs');
    shelljs.ln('-sf', cwd + '/../profitGuruDAPP/www/distProd', cwd + '/profitGuruDAPP');
    shelljs.ln('-sf', cwd + '/../profitGuruMAPP/www', cwd + '/profitGuruMAPP');
    done();
});