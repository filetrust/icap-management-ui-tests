FROM codeception/codeceptjs:latest

ENV  PATH="${PATH}:/node_modules/.bin"
COPY . /codecept

# RUN chown -R pptruser:pptruser /codecept
# RUN runuser -l pptruser -c 'npm install --loglevel=warn --prefix /codecept'

RUN ln -sf /codecept/bin/codecept.js /usr/local/bin/codeceptjs
RUN chmod +x /usr/local/bin/codeceptjs

#RUN rm /etc/apt/sources.list.d/google-chrome.list

WORKDIR /tests
#ENV script=/usr/local/bin

COPY docker/codecept.entrypoint.sh /usr/local/bin
COPY . .

RUN chmod +x /usr/local/bin/codecept.entrypoint.sh

RUN apt-get update -yq
RUN apt-get upgrade -yq
RUN apt-get install git
RUN apt-get install gcc
RUN apt-get install -yq doxygen
RUN apt-get install make
RUN apt-get install automake
RUN apt-get install automake1.11
RUN apt-get install libtool

RUN apt-get install -y c-icap

#RUN apt-get install -yq build-essential libboost-all-dev cmake flex


ENTRYPOINT ["/usr/local/bin/codecept.entrypoint.sh"]