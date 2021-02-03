FROM codeception/codeceptjs:latest

ENV  PATH="${PATH}:/node_modules/.bin"
COPY . /codecept

#RUN chown -R pptruser:pptruser /codecept
#RUN runuser -l pptruser -c 'npm install --loglevel=warn --prefix /codecept'

RUN ln -sf /codecept/bin/codecept.js /usr/local/bin/codeceptjs
RUN chmod +x /usr/local/bin/codeceptjs

#RUN rm /etc/apt/sources.list.d/google-chrome.list

WORKDIR /tests
#ENV script=/usr/local/bin

COPY docker/codecept.entrypoint.sh /usr/local/bin
COPY . .

RUN chmod +x /usr/local/bin/codecept.entrypoint.sh

RUN export DEBIAN_FRONTEND=noninteractive && \
    apt-get update -yq && \
    apt-get install -y apt-utils && \
    apt-get upgrade -yq && \
    apt-get install git && \
    apt-get install gcc && \
    apt-get install -yq doxygen && \
    apt-get install make && \
    apt-get install automake && \
    apt-get install automake1.11 && \
    apt-get install libtool && \
    apt-get install -yq c-icap

RUN PUPPETEER_PRODUCT=firefox npm install

ENTRYPOINT ["/usr/local/bin/codecept.entrypoint.sh"]