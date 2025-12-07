FROM ubuntu:24.04

# https://github.com/moby/moby/issues/27988#issuecomment-462809153
RUN echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y \
      apt-transport-https \
      ca-certificates \
      curl \
      gnupg2

# Basic GPG setup
RUN mkdir -m 600 ~/.gnupg && \
    mkdir -m 0755 -p /etc/apt/keyrings/ \
    echo "disable-ipv6" >> ~/.gnupg/dirmngr.conf

# Install MongoDB
RUN curl -fsSL https://www.mongodb.org/static/pgp/server-8.0.asc | \
    gpg --dearmor -o /etc/apt/keyrings/mongo.gpg && \
    echo "deb [ arch=amd64,arm64 signed-by=/etc/apt/keyrings/mongo.gpg ] https://repo.mongodb.org/apt/ubuntu noble/mongodb-org/8.0 multiverse" | \
    tee /etc/apt/sources.list.d/mongodb-org-8.0.list
RUN apt-get update || true
RUN apt-get install -y \
    mongodb-org

# Unifi seems to use amd64 only. The package is architecture independent, so it should run on arm64 too
RUN gpg2 --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 06E85760C0A52C50 && \
    gpg2 --armor --export 06E85760C0A52C50 -o | \
    gpg2 --dearmor -o /etc/apt/keyrings/unifi.gpg && \
    echo "deb [arch=amd64 signed-by=/etc/apt/keyrings/unifi.gpg] https://www.ui.com/downloads/unifi/debian stable ubiquiti" | \
    tee /etc/apt/sources.list.d/unifi.list
RUN apt-get update || true
RUN apt-get install -y \
      unifi

WORKDIR /usr/local/bin
COPY --chmod=0755 unifi.sh .
ENTRYPOINT ["/usr/local/bin/unifi.sh"]