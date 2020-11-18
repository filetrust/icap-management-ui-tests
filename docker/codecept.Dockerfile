FROM codeception/codeceptjs:latest

WORKDIR /tests
ENV script=/usr/local/bin
COPY docker/codecept.entrypoint.sh /usr/local/bin/

RUN chmod +x /usr/local/bin/codecept.entrypoint.sh

ENTRYPOINT ["/usr/local/bin/codecept.entrypoint.sh"]