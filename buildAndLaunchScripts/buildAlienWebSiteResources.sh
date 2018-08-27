#!/bin/bash -x
PROFITGURUCLINET_ENV='production'

if [ -z "$1" ]; then 
PROFITGURUCLINET_ENV='production'
fi;

WRK_DIR=$PWD
DST_DIR=$PWD/AlienWebSiteResourcesProd/
rm -rf $DST_DIR
ROOT_DIR=$PWD/../..
mkdir -p $DST_DIR

#Build and Tar profitGuruDAPP_RETAIL
cd $ROOT_DIR
cd profitGuruDAPP
gulp build4Website --env $PROFITGURUCLINET_ENV --app retail --runEnvironment cloud --bCloudApp YES
mkdir -p archive
cp -r www/distProd archive/profitGuruDAPP_RETAIL

cd archive

if [ $PROFITGURUCLINET_ENV = 'development' ]; then
   mv profitGuruDAPP_RETAIL $DST_DIR
else
tar -zcvf profitGuruDAPP_RETAIL.tar.gz profitGuruDAPP_RETAIL
mv profitGuruDAPP_RETAIL.tar.gz $DST_DIR
rm -rf ../archive
fi;

#Build and Tar profitGuruDAPP_RESTAURANT
# cd $ROOT_DIR
# cd profitGuruDAPP
# gulp build4Website --env $PROFITGURUCLINET_ENV --app restaurant --runEnvironment cloud
# mkdir -p archive
# cp -r www/distProd archive/profitGuruDAPP_RESTAURANT

# cd archive

# if [ $PROFITGURUCLINET_ENV = 'development' ]; then
#    mv profitGuruDAPP_RESTAURANT $DST_DIR
# else
# tar -zcvf profitGuruDAPP_RESTAURANT.tar.gz profitGuruDAPP_RESTAURANT
# mv profitGuruDAPP_RESTAURANT.tar.gz $DST_DIR
# rm -rf ../archive
# fi;


#Build PGServerJs
cd $ROOT_DIR
cd PGServerJs
rm -rf ./archive;mkdir -p archive
ENVIRONMENT=$PROFITGURUCLINET_ENV IS_DEMO_APP=yes gulp build    --app cloud --bExcludeNodeModules true
cp -r builds/$PROFITGURUCLINET_ENV/*  archive/

if [ $PROFITGURUCLINET_ENV = 'development' ]; then
cp -r ./node_modules archive/PGServerJs/
fi;

cd archive

if [ $PROFITGURUCLINET_ENV = 'development' ]; then
    mv PGServerJs $DST_DIR
else
    tar -zcvf PGServerJs.tar.gz PGServerJs
    mv PGServerJs.tar.gz $DST_DIR
    rm -rf ../archive
fi;

#Build and Tar profitGuruMAPP_RETAIL
cd $ROOT_DIR
cd profitGuruMAPP
gulp build4Website --env $PROFITGURUCLINET_ENV --app retailcloud --runEnvironment cloud --bCloudApp YES
mkdir -p archive
cp -r www archive/profitGuruMAPP_RETAIL

cd archive

if [ $PROFITGURUCLINET_ENV = 'development' ]; then
   mv profitGuruMAPP_RETAIL $DST_DIR
else
tar -zcvf profitGuruMAPP_RETAIL.tar.gz profitGuruMAPP_RETAIL
mv profitGuruMAPP_RETAIL.tar.gz $DST_DIR
rm -rf ../archive
fi;

#Build and Tar profitGuruMAPP_RESTAURANT
# cd $ROOT_DIR
# cd profitGuruMAPP
# gulp build4Website --env $PROFITGURUCLINET_ENV --app restaurantcloud --runEnvironment cloud
# mkdir -p archive
# cp -r www archive/profitGuruMAPP_RESTAURANT

# cd archive

# if [ $PROFITGURUCLINET_ENV = 'development' ]; then
#    mv profitGuruMAPP_RESTAURANT $DST_DIR
# else
# tar -zcvf profitGuruMAPP_RESTAURANT.tar.gz profitGuruMAPP_RESTAURANT
# mv profitGuruMAPP_RESTAURANT.tar.gz $DST_DIR
# rm -rf ../archive
# fi;



#BUILD webSite
#*****Images and node_moudles are Intentionalyy not included to reduce the upload size, if there is
#Any changes in these need to be copied explicitly

cd $ROOT_DIR
if [ $PROFITGURUCLINET_ENV = 'development' ]; then
tar -zhcvf AlienHuWebSite.tar.gz AlienHuWebSite --exclude=AlienHuWebSite/PGServerJs --exclude=AlienHuWebSite/profitGuruMAPP --exclude=AlienHuWebSite/profitGuruDAPP --exclude=AlienHuWebSite/buildAndLaunchScripts --exclude=AlienHuWebSite/node_modules --exclude=AlienHuWebSite/views/
else
tar -zhcvf AlienHuWebSite.tar.gz AlienHuWebSite --exclude=AlienHuWebSite/PGServerJs --exclude=AlienHuWebSite/profitGuruMAPP --exclude=AlienHuWebSite/profitGuruDAPP --exclude=AlienHuWebSite/buildAndLaunchScripts --exclude=AlienHuWebSite/node_modules --exclude=AlienHuWebSite/views/
fi;

mv AlienHuWebSite.tar.gz $DST_DIR
cp $WRK_DIR/installAlienWebSite.sh $DST_DIR

echo " Inserting ENV Value in ${DST_DIR}/installAlienWebSite.sh"

sed -i "/PROFITGURUCLINET_ENV=/c \PROFITGURUCLINET_ENV=$PROFITGURUCLINET_ENV" $DST_DIR/installAlienWebSite.sh

cd $DST_DIR; cd ..

echo $PWD
tar -zcvf AlienHuWebSitePackage.tar.gz AlienWebSiteResourcesProd



#rm -rf $DST_DIR
#tar -zcvf AlienHuWebSiteAllResources.tar.gz  AlienHuWebSite.tar.gz profitGuruDAPP.tar.gz profitGuruMAPP.tar.gz installAlienWebSite.sh 

