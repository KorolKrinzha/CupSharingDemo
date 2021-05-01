#!/bin/bash

if  [[ $1 != "" ]] 
then


ip=$(cat ./apps/secret/ip)


while :
do

lat=$(curl -s 'https://freegeoip.app/json/' | 
python3 -c "import sys, json; print(json.load(sys.stdin)['latitude'])")
long=$(curl -s 'https://freegeoip.app/json/' | 
python3 -c "import sys, json; print(json.load(sys.stdin)['longitude'])")



curl -s "http://$ip/receiveport?id=$1&lat=$lat&long=$long"
response=$(curl -s "http://$ip/receiveport?id=$1&lat=$lat&long=$long")



if  [[ $response == "Sent" ]] 
then 
sleep 30
else
break
fi



done

else
echo No port specififed
fi

