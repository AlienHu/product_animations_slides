#!/bin/bash -x

#Following ENV Value inserted during build
PROFITGURUCLINET_ENV='production'
rm -f $0_`date +"%Y-%m-%d"`.log
exec > >(tee -i $0_`date +"%Y-%m-%d"`.log)
exec 2>&1

#Copy the resources
REMOTE_WRK_DIR=$PWD
tar -xvf AlienHuWebSite.tar.gz 

#Lets install the npm modules
if [ $PROFITGURUCLINET_ENV = 'production' ]; then
    cd AlienHuWebSite
    npm install
    cd ..
fi;

#Copy and untar APPs
if [ $PROFITGURUCLINET_ENV = 'production' ]; then
mv profitGuruDAPP_RETAIL.tar.gz profitGuruDAPP_RESTAURANT.tar.gz profitGuruMAPP_RETAIL.tar.gz profitGuruMAPP_RESTAURANT.tar.gz PGServerJs.tar.gz AlienHuWebSite/
else
mv profitGuruDAPP_RETAIL profitGuruDAPP_RESTAURANT profitGuruMAPP_RETAIL profitGuruMAPP_RESTAURANT PGServerJs AlienHuWebSite/
fi;


cd AlienHuWebSite
if [ $PROFITGURUCLINET_ENV = 'production' ]; then
tar -xvf profitGuruDAPP_RETAIL.tar.gz
tar -xvf profitGuruDAPP_RESTAURANT.tar.gz
tar -xvf profitGuruMAPP_RETAIL.tar.gz
tar -xvf profitGuruMAPP_RESTAURANT.tar.gz
tar -xvf  PGServerJs.tar.gz
else
ln -s ../../../node_modules .
fi;


#Preparing PGServerJs
#cd ../..
cd PGServerJs

if [ $PROFITGURUCLINET_ENV = 'production' ]; then
    npm install
 
fi;

#chmod 777 startComboServers.js;./startComboServers.js;

#Now start the website
cd $REMOTE_WRK_DIR/AlienHuWebSite/views
ln -s ~/AlienHuWebSite_StaticResources/images images;
cd ..
# node cleanUpDBsB4NewRelease.js
node startAlienHuWebsite.js
retval=$?
if [ $retval -ne 0 ]; then
    if [ $PROFITGURUCLINET_ENV = 'production' ]; then
        echo "Looks like YOu don't have permission on port 80, \n consider executing 
        following commands"
        echo "
            sudo apt-get install libcap2-bin
	        sudo setcap cap_net_bind_service=+ep `which node`
            "
    fi;
fi;
