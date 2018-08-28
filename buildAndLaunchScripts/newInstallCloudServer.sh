#!/bin/bash

#### executing preinstalled.sh
chmod +x preInstalled.sh
./preInstalled.sh
####nvm read active
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
### taking care of node version
nvm use 8.9.4
nvm alias default 8.9.4
nvm uninstall 6.11.4
### copying couch local.ini
cd ./couchdb/
mv local.ini localold.ini
cd ../
cp local.ini ./couchdb/
ls ~/couchdb/
systemctl restart couchdb.service
#tar -xvf PGServerCloud.tar.gz
rm -rf PGServerJs_
mkdir PGServerJs_
cp -r PGServerJs/* PGServerJs_
rm -rf PGServerJs
#mv PGServerCloud/PGServerJs.tar.gz .
tar -xvf PGServerJs.tar.gz
mv PG_Cloud_Server/PGServerJs .

pm2 delete all
cd PGServerJs
npm install --production
#cp ../PGServerJs_/node_modules .
##  --app retail/restaurant/crm... /all
echo "Hello! $1"
app='all'
if [ "$1" ]
then
app=$1
echo "app type is:" $app
else
echo "taking default app type 'all' "
echo "you can pass the app type while running the file installcloudserver.sh 'apptype'"
fi
echo $app
node startServerCloud.js --app $app 
rm -rf PG_Cloud_Server
#rm -rf PGServerCloud.tar.gz
#rm -rf PGServerCloud 
## goto PGServerjs
cd ~/PGServerJs/
## installing typeScript
npm install typescript -g
npm install chai
npm install
tsc
node startServerCloud.js --app $app
pm2 status
###its done 
pm2 log




