#!/usr/bin/env node

var shelljs = require('shelljs');
var path = require('path');
shelljs.cd('PGServerJs');
shelljs.cp('env.example', '.env');
shelljs.sed('-i', ' ', '', '.env');
shelljs.sed('-i', '#', '', '.env');
var dbCleanUpScriptPath = path.resolve(__dirname + '/PGServerJs/dbManagers/resetDB.js');
shelljs.exec('node ' + dbCleanUpScriptPath + ' -c 1 -d 1');