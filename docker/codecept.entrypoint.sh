#!/bin/bash

npm install
docker build -f ./docker/Dockerfile.node8 -t cpass.node8 .

nohup google-chrome \
	--no-sandbox \
	--disable-background-networking \
	--disable-default-apps \
	--disable-extensions \
	--disable-sync \
	--disable-translate \
	--headless \
	--ignore-certificate-errors \
	--ignore-ssl-errors \
	--ignore-certificate-errors-spki-list 

tail -f /dev/null
sleep 3