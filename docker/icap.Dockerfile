FROM ubuntu:focal-20201008

RUN export DEBIAN_FRONTEND=noninteractive && \
    apt-get update -yq 
#RUN apt-get -y install gcc wget make curl
#Install c-icap
RUN apt-get -y install c-icap

ENTRYPOINT [ "/usr/bin/c-icap-client" ]