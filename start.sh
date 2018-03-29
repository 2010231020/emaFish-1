#! /bin/bash

path=/data/htdocs/emaFish
nmp=/bin/npm
nohup=/usr/bin/nohup
cd $path && $nmp  run build  1>/dev/null 2>&1 &
