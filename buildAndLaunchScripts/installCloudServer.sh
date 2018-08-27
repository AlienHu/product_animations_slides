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
node startServerCloud.js --app all 
rm -rf PG_Cloud_Server
#rm -rf PGServerCloud.tar.gz
#rm -rf PGServerCloud 

