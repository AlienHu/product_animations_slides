  scp -i alienhuscaleway root@163.172.165.51:~/PGServerJs.tar.gz PGServerJs_.tar.gz
  mv PGServerJs PGServerJs_back
  tar -xvf PGServerJs_.tar.gz
  cp PG_Cloud_Server/PGServerJs . -r
  cp PGServerJs_back/node_modules PGServerJs/ -r