#!/bin/bash
while true; do
    runId=`cat /proc/sys/kernel/random/uuid`
    screenshot=$runId.png
    now=`date +%s%3N`
    casperjs --resourceLoadThreshold=1000 --runId=$runId --screenshotPath=$screenshot --targetUrl=https://ql.mediasilo.com/#ql/537e7f2be4b0b22ab7f24bc8 tests/quicklinks.js

    # upload the screenshot to S3 if it exists
    if [ -e $screenshot ]; then
        echo "[info] [loop.bash $runId] finished in $((`date +%s%3N` - now)) ms; screenshot to S3 /$S3_BUCKET/$screenshot"
        echo -n $AWS_SECRET_KEY > AWS_SECRET_KEY
        lib/s3-bash/s3-put -k $AWS_ACCESS_KEY -s AWS_SECRET_KEY -T $screenshot /$S3_BUCKET/$screenshot
    else
        echo "[info] [loop.bash $runId] finished in $((`date +%s%3N` - now)) ms"
    fi
done
