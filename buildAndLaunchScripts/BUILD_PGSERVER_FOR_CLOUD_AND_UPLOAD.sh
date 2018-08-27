cloudHost='root@163.172.179.114'
keyPath='~/scaleWayCreds/alienhuscaleway'
cd ../../PGServerJs/
gulp buildAndZip -cs true
cd -
scp -i $keyPath ../../PGServerJs/archive/PGServerJs.zip $cloudHost:~/
scp -i $keyPath installCloudPGServer.sh $cloudHost:~/
ssh -i $keyPath $cloudHost