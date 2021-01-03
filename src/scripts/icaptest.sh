#!/bin/bash
echo "Testing UI"

export ICAP_SERVER=icap-client-main.northeurope.cloudapp.azure.com
export ICAP_PORT=1344
export SOURCE_FILE=/opt/src/data/input/Clean.png
export REBUILT_FILE=src/data/output/Clean.png
export LOG_LEVEL=10

if [ -n "$1" ]; then export ICAP_SERVER=$1					; fi
if [ -n "$2" ]; then export SOURCE_FILE=/opt/$2				; fi
if [ -n "$3" ]; then export LOG_LEVEL=$3					; fi
if [ -n "$4" ]; then export REBUILT_FILE=rebuilt/file_$4.pdf; fi
if [ -n "$4" ]; then export EXTRA_GIT_OPTIONS=-d			; fi

if [ $LOG_LEVEL -gt "0" ]; then
	echo "************** GW ICAP test **************"
	echo "** "
	echo "** ICAP_SERVER : $ICAP_SERVER:$ICAP_PORT"
	echo "** SOURCE_FILE : $SOURCE_FILE"
	echo "** REBUILT_FILE: $REBUILT_FILE"
	echo "** "
	echo "** usage ./icap-file.sh [server] [target file (in local folder)]"
	echo "******************************************"
	echo
fi	


rm ./$REBUILT_FILE 2> /dev/null


docker run --rm -v $PWD:/opt -it $EXTRA_GIT_OPTIONS     \
		c-icap-client 									\
			-i $ICAP_SERVER 			                \
			-p $ICAP_PORT 				                \
			-s gw_rebuild 				                \
			-f $SOURCE_FILE 			                \
			-o /opt/$REBUILT_FILE 	                    \
			-d $LOG_LEVEL			                    \
			-v

if [ $LOG_LEVEL -gt "0" ]; then
	echo ""
	echo "File rebuilt complete (via ICAP server): please open '$REBUILT_FILE' to see it"
	echo ""
fi
sleep 15

#open ./$REBUILT_FILE


## command to get a start a bash shell in this container (equivalent to ssh into it)
##
# 	docker run --rm -v $PWD:/opt -it --entrypoint bash c-icap-client 
##
## c-icap-client is here /usr/local/c-icap/bin/c-icap-client