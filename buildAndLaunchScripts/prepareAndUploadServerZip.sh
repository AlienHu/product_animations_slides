echo "preparation1 : clean up directory"
rm -rf ../PG_Cloud_Server
mkdir ../PG_Cloud_Server

#copy PGServerJs Directory
cp ../../PGServerJs -r ../PG_Cloud_Server
#rsync -av --progress ../../PGServerJs ../PG_Cloud_Server --exclude ../../PGServerJs/node_modules --exclude ../../PGServerJs/nmCache --exclude ../../PGServerJs/builds --exclude ../../PGServerJs/archive --exclude ../../PGServerJs/couchDBMigrations/backUp
echo "Remove unwanted folders/files";
rm -rf ../PG_Cloud_Server/PGServerJs/node_modules
rm -rf ../PG_Cloud_Server/PGServerJs/nmCache
rm -rf ../PG_Cloud_Server/PGServerJs/builds
rm -rf ../PG_Cloud_Server/PGServerJs/archive
rm -rf ../PG_Cloud_Server/PGServerJs/couchDBMigrations/backUp
echo "preparation1: done ";
# mkdir ../PG_Cloud_Server/PGServerJs/config/profitguruCoreConfig
#making var isServerRunningOnProfitGuruCloud = false; to true in licenceHelper.js 
echo "Preparation2: replace variable".
mv ../PG_Cloud_Server/PGServerJs/licencer/licenceHelper.js ../PG_Cloud_Server/PGServerJs/licencer/licenceHelper_.js
sed -e 's/var isServerRunningOnProfitGuruCloud = false;/var isServerRunningOnProfitGuruCloud = true;/g' ../PG_Cloud_Server/PGServerJs/licencer/licenceHelper_.js > ../PG_Cloud_Server/PGServerJs/licencer/licenceHelper.js
rm ../PG_Cloud_Server/PGServerJs/licencer/licenceHelper_.js
 echo "Preparation2: done";

#set couchdb2 var to false
 echo "Preparation3: replace variable".
mv ../PG_Cloud_Server/PGServerJs/couchdb-backup-restore/index.js ../PG_Cloud_Server/PGServerJs/couchdb-backup-restore/index_.js
sed -e 's/bCouch2 = false;/bCouch2 = true;/g' ../PG_Cloud_Server/PGServerJs/couchdb-backup-restore/index_.js > ../PG_Cloud_Server/PGServerJs/couchdb-backup-restore/index.js
rm ../PG_Cloud_Server/PGServerJs/couchdb-backup-restore/index_.js
 echo "Preparation3: done";

#remove symbolic links and copy physical files
echo "Removing symbolic links and copying physical files";
rm ../PG_Cloud_Server/PGServerJs/config/profitguruCoreConfig
mkdir ../PG_Cloud_Server/PGServerJs/config/profitguruCoreConfig
cp ../../profitGuruCore/Config/* -r ../PG_Cloud_Server/PGServerJs/config/profitguruCoreConfig

rm ../PG_Cloud_Server/PGServerJs/middleWares/clientDeviceProcessor
mkdir ../PG_Cloud_Server/PGServerJs/middleWares/clientDeviceProcessor
cp ../../profitGuruCore/ClientDeviceProcessor/* -r ../PG_Cloud_Server/PGServerJs/middleWares/clientDeviceProcessor

rm ../PG_Cloud_Server/PGServerJs/middleWares/appLocksProcessor
mkdir ../PG_Cloud_Server/PGServerJs/middleWares/appLocksProcessor
cp ../../profitGuruCore/appLocksProcessor/* -r ../PG_Cloud_Server/PGServerJs/middleWares/appLocksProcessor

#rm ../PG_Cloud_Server/PGServerJs/.env
cp ../../PGServerJs/.env ../PG_Cloud_Server/PGServerJs/.env

#rm ../PG_Cloud_Server/PGServerJs/dbManagers/.env
cp ../../PGServerJs/.env ../PG_Cloud_Server/PGServerJs/dbManagers/.env

rm ../PG_Cloud_Server/PGServerJs/common/httpUtils.js
cp ../../terminalNodeServer/common/httpUtils.js ../PG_Cloud_Server/PGServerJs/common/httpUtils.js
echo "copying physical files is done : Ready for ZIP";

echo "Starting zip"
tar -zcvf ../PG_Cloud_Server/PGServerJs.tar.gz ../PG_Cloud_Server/PGServerJs
echo "Zipping done"
#mkdir ../PGServerCloud
#mv ../PG_Cloud_Server/PGServerJs.tar.gz ../PGServerCloud
# cp installCloudServer.sh ../PGServerCloud

#tar -zcvf ../PGServerCloud.tar.gz ../PGServerCloud
#rm -rf ../PG_Cloud_Server
#rm -rf ../PGServerCloud
echo "Running Upload Zip"
sh uploadCloudServer.sh


