#!/bin/bash

git clone https://github.com/filetrust/mvp-icap-service.git
cd mvp-icap-service/c-icap/

#apt-get install -yq build-essential libboost-all-dev cmake flex

autoreconf -i
./configure --prefix=/usr/local/c-icap

make 
make install

cd ..
cd c-icap-modules/
autoreconf -i
./configure --with-c-icap=/usr/local/c-icap --prefix=/usr/local/c-icap
make 
make install
sh -c 'echo "Include gw_rebuild.conf" >>  /usr/local/c-icap/etc/c-icap.conf'

/usr/local/c-icap/bin/c-icap -N -D -d 10

#:   -----testing-----
if [[ -s /usr/local/c-icap/bin/c-icap-client ]];
then
echo "#################################"
echo "#################################"
echo "#################################"
echo "C_ICAP SUCCESSFULLY INSTALLED ;) "
echo "#################################"
echo "#################################"
echo "#################################"

sleep 3
cd ../
else
echo "#################################"
echo "#################################"
echo "#################################"
echo "   C_ICAP INSTALLATION FAILED ;/ "
echo "#################################"
echo "#################################"
echo "#################################"
read -p "Are you sure you want to continue? <y/N> " prompt
if [[ $prompt =~ [yY](es)* ]]
then
        echo "Continuing installation of other tools"
	cd ../
else
  cd ../
  exit 0
fi

fi
tail -f /dev/null
sleep 30