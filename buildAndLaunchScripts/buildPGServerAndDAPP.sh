#!/bin/bash -x
PROFITGURUCLINET_ENV='production'

if [ -z "$2" ]; then 
PROFITGURUCLINET_ENV='production'
fi;

if [ -z "$2" ]; then 
PROFITGURUCLINET_ENV='production'
fi;


APP_TYPE='retail'
APP='RETAIL'

if [ "$1" = "restaurant" ]
then
APP_TYPE='restaurant'
fi

if [ "$1" = "crm" ]
then
APP_TYPE='crm'
fi

if [ "$1" = "pharmacy" ]
then
APP_TYPE='pharmacy'
fi


# read a;
# a=$(echo $a | tr 'a-z' 'A-Z')
# echo $a



APP=${APP_TYPE^^}
echo $APP
APP_DIR=profitGuruDAPP_$APP
echo $APP_DIR
WRK_DIR=$PWD
DST_DIR=$PWD/ServeAndDAPPResourcesProd_$APP/
rm -rf $DST_DIR
ROOT_DIR=$PWD/../..
mkdir -p $DST_DIR

#Build and Tar $APP_DIR
cd $ROOT_DIR
cd profitGuruDAPP
gulp build4Website --env $PROFITGURUCLINET_ENV --app $APP_TYPE --runEnvironment cloud --bCloudApp YES
mkdir -p archive
cp -r www/distProd archive/$APP_DIR

cd archive

if [ $PROFITGURUCLINET_ENV = 'development' ]; then
   mv $APP_DIR $DST_DIR
else
tar -zcvf $APP_DIR.tar.gz $APP_DIR
mv $APP_DIR.tar.gz $DST_DIR
rm -rf ../archive
fi;


Build PGServerJs
cd $ROOT_DIR
cd PGServerJs
rm -rf ./archive;mkdir -p archive
ENVIRONMENT=$PROFITGURUCLINET_ENV IS_DEMO_APP=yes gulp build  --app cloud --bExcludeNodeModules true
cp -r builds/$PROFITGURUCLINET_ENV/*  archive/

if [ $PROFITGURUCLINET_ENV = 'development' ]; then
cp -r ./node_modules archive/PGServerJs/
fi;

cd archive

if [ $PROFITGURUCLINET_ENV = 'development' ]; then
    mv PGServerJs $DST_DIR
else
    rm -rf PGServerJs/node_modules
    mv PGServerJs PGServerJs_$APP
    tar -zcvf PGServerJs_$APP.tar.gz PGServerJs_$APP
    mv PGServerJs_$APP.tar.gz $DST_DIR
    rm -rf ../archive
fi;

cd $DST_DIR
cd ..
tar -zcvf ServeAndDAPPResourcesProd_$APP.tar.gz ServeAndDAPPResourcesProd_$APP



