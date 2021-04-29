#!/bin/bash

ip=$(cat ./apps/secret/ip)
echo $ip

while :
do

lat=$(curl -s 'https://freegeoip.app/json/' | 
python3 -c "import sys, json; print(json.load(sys.stdin)['latitude'])")
long=$(curl -s 'https://freegeoip.app/json/' | 
python3 -c "import sys, json; print(json.load(sys.stdin)['longitude'])")



curl -s "http://$ip/receiveport1?lat=$lat&long=$long"
response=$(curl -s "http://$ip/receiveport1?lat=$lat&long=$long")

if  [[ $response == "Sent" ]] 
then 
sleep 1m
else
break
fi



done
