#!/bin/bash

# Create new product and gain its ID
body='{ "name": "Book of Knowledge", "description": "Small booklet", "price": 2, "rating": 3.4, "stock": 2 }'

ID=$(curl -X POST -H "Content-Type: application/json" -d "${body}" http://localhost:8080/products/add)

ID=${ID##* }
ID=${ID%\"*}

# Proper test
COMMAND="curl -X DELETE http://localhost:8080/products/$ID"

($COMMAND && printf '\n1\n') &
P1=$!
($COMMAND && printf '\n2\n') &
P2=$!
($COMMAND && printf '\n3\n') &
P3=$!

printf "Start\n"

wait

printf "End"