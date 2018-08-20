#!/bin/bash -x
rm -f $0_`date +"%Y-%m-%d"`.log
exec > >(tee -i $0_`date +"%Y-%m-%d"`.log)
exec 2>&1

#ROOT_DIR=$PWD/../..
mkdir -p ~/AlienHuWebSite_StaticResources/images/
cp -r ../views/images/* ~/AlienHuWebSite_StaticResources/images/
./buildAlienWebSiteResources.sh development

cd AlienWebSiteResourcesProd
./installAlienWebSite.sh 