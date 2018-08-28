#tar -xvf PGServerCloud.tar.gz
rm -rf PGServerJs_
mkdir PGServerJs_
cp -r PGServerJs/* PGServerJs_
rm -rf PGServerJs
#mv PGServerCloud/PGServerJs.tar.gz .
#tar -xvf PGServerJs.zip
unzip PGServerJs.zip -d .
#mv PG_Cloud_Server/PGServerJs .
#rm -rf PG_Cloud_Server
pm2 delete all
cd PGServerJs

cp ../PGServerJs_/node_modules .
npm install --production
#cp ../PGServerJs_/node_modules .
node startComboServers.js
#rm -rf PGServerCloud.tar.gz
#rm -rf PGServerCloud 

