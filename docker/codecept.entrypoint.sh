#!/bin/bash

npm install

tail -f /dev/null

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
	--ignore-certificate-errors-spki-list \
	--user-data-dir=/tmp \
	--remote-debugging-address=0.0.0.0


	