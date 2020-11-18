FROM codeception/codeceptjs:latest

RUN ln -sf /codecept/bin/codecept.js /usr/local/bin/codeceptjs
RUN chmod +x /usr/local/bin/codeceptjs

WORKDIR /tests
#ENV script=/usr/local/bin

COPY docker/codecept.entrypoint.sh /usr/local/bin

RUN chmod +x /usr/local/bin/codecept.entrypoint.sh

ENTRYPOINT ["/usr/local/bin/codecept.entrypoint.sh"]