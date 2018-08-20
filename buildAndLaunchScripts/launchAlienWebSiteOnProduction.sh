#!/bin/bash -x
WRK_DIR=$PWD
DATE=`date +"%Y:%m:%d"`

#Create the Directory to copy the files
ssh -i ~/Downloads/scaleWayCreds/alienhuscaleway root@212.47.235.185 <<'ENDSSH'
mkdir AlienWebSite_`date +"%Y:%m:%d"`
ENDSSH

#Copy the AlienWebSite Resources
scp -i ~/Downloads/scaleWayCreds/alienhuscaleway $WRK_DIR/AlienHuWebSitePackage.tar.gz root@212.47.235.185:~/AlienWebSite_${DATE}/

#Now Setup the WebSite

ssh -i ~/Downloads/scaleWayCreds/alienhuscaleway root@212.47.235.185 <<'ENDSSH'
REMOTE_WRK_DIR=$PWD/AlienWebSite_`date +"%Y:%m:%d"`
cd $REMOTE_WRK_DIR
tar -xvf AlienHuWebSitePackage.tar.gz
cd AlienWebSiteResourcesProd/
./installAlienWebSite.sh
ENDSSH
