#!/bin/bash
while true; do
    now=`date +%s%3N`
    casperjs --resourceLoadThreshold=1000 --targetUrl=https://ql.mediasilo.com/#ql/537e7f2be4b0b22ab7f24bc8 tests/quicklinks.js
    echo "finished in $((`date +%s%3N` - now)) ms"
done
