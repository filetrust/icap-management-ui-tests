#!/bin/bash
echo "MVP ICAP Timings"
export ICAP_SERVER=icap-client-main.northeurope.cloudapp.azure.com
export ICAP_PORT=1344
export SOURCE_FILE=/opt/Clean.png
export REBUILT_FILE=/home/Clean.png
export LOG_LEVEL=10
#export EXTRA_GIT_OPTIONS=-d

rm ./$REBUILT_FILE 2> /dev/null

sudo docker run -v C:/icap/uirepo/icap-management-ui-tests/src/data/input/:/opt -v C:/icap/uirepo/icap-management-ui-tests/src/data/output/:/home glasswallsolutions/c-icap-client:manual-v1 -s 'gw_rebuild' -i icap-client-main.northeurope.cloudapp.azure.com -f /opt/Clean.png -o /home/Clean.png -v

sleep 30


