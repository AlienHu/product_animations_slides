require('shelljs/global');
var path = require('path');
var log = console.log;
//Lets build DAPP and MAPP
//Run this during development only
//exec('node ' + __dirname + '/initAlienWebSiteDependencies.js');
var pm2 = path.resolve(__dirname + '/node_modules/.bin/pm2');
var alienHuSite = pm2 + ' start -f ' + path.resolve(__dirname + '/bin/alienHuSite.js');
var PGServerJs = 'node start.js -a cloud --enableSelfUpdate false';
exec(pm2 + '  delete alienHuSite');
if (exec(alienHuSite).code !== 0) {
    log('Error while starting alienHuSite');
    exit(1);
}
cd('PGServerJs');
if (exec(PGServerJs).code !== 0) {
    log('Error while starting PGServerJs');
    exit(1);
}
exec(pm2 + ' delete feedbackServer')
log('starting feedback server');
cd('~/feedbackServer');
var feedbackServerFile = 'dist/server.js';
var feedbackServer = pm2 + ' start -f ' + feedbackServerFile + ' --name feedbackServer';
if (exec(feedbackServer).code !== 0) {
    log('Error starting feedback server');
    exit(1);
}

exec(pm2 + ' delete licenceServer')
log('starting licence server');
cd('~/licencer');
var licenceServerFile = 'dist/server.js';
var licenceServer = pm2 + ' start -f ' + licenceServerFile + ' --name licenceServer';
if (exec(licenceServer).code !== 0) {
    log('Error starting license server');
    exit(1);
}

//exec('./node_modules/.bin/pm2  save');