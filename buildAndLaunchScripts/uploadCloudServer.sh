cloudHost='root@163.172.179.114'
keyPath='~/scaleWayCreds/alienhuscaleway'
scp -i $keyPath ../PG_Cloud_Server/PGServerJs.tar.gz $cloudHost:~/
scp -i $keyPath installCloudServer.sh $cloudHost:~/
ssh -i $keyPath $cloudHost