#!/bin/bash -x
rm -f $0_`date +"%Y-%m-%d"`.log
exec > >(tee -i $0_`date +"%Y-%m-%d"`.log)
exec 2>&1
./buildAlienWebSiteResources.sh 
#cd AlienWebSiteResourcesProd
./launchAlienWebSiteOnProduction.sh

