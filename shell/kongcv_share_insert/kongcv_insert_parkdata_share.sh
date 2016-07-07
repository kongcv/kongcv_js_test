#!/bin/bash

app_id=${1}
if [ ! -n "$app_id" ]; then
    echo "param is null, app id"
    exit 1
fi

app_key=${2}
if [ ! -n "$app_key" ]; then
    echo "param is null, app key"
    exit 1
fi

input_file=${3}
if [ ! -n "$input_file" ]; then
    echo "param is null, input file"
    exit 1
fi

line_num=0
while read line
do
    address=`echo $line|awk -F" " '{print $1}'`
    park_detail=`echo $line|awk -F" " '{print $2}'`
    price=`echo $line|awk -F" " '{print $3}'`
    latitude=`echo $line|awk -F" " '{print $4}'`
    longitude=`echo $line|awk -F" " '{print $5}'`
    
    echo $address
    echo $park_detail
    echo $price
    echo $latitude
    echo $longitude

    echo "line_num:$line_num"
    let line_num++
    sleep 0.1

    curl -X POST \
        -H "X-LC-Id:$app_id" \
        -H "X-LC-Key:$app_key" \
        -H "Content-Type: application/json" \
        -d '{
                "address" : "'$address'",
                "park_detail" : "'$park_detail'",
                "location" : {"__type" : "GeoPoint", "latitude":'$latitude', "longitude" : '$longitude'},
                "city":"北京市",
            }' \
    https://api.leancloud.cn/1.1/classes/kongcv_park_share
    
    echo $line
done < $input_file
