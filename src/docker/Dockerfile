FROM ubuntu:18.04

# https://github.com/moby/moby/issues/27988#issuecomment-462809153
RUN echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections

RUN apt-get update && \
    apt-get install -y \
      apt-transport-https \
      ca-certificates \
      gnupg2 \
      mongodb

RUN mkdir ~/.gnupg
RUN echo "disable-ipv6" >> ~/.gnupg/dirmngr.conf

# Unifi seems to use amd64 only. The package is architecture independents, so it should run on arm64 too
RUN echo "deb [arch=amd64] https://www.ui.com/downloads/unifi/debian stable ubiquiti" | tee /etc/apt/sources.list.d/unifi.list && \
    gpg2 --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 06E85760C0A52C50 && \
    gpg2 --armor --export 06E85760C0A52C50 | apt-key add -

RUN apt-get update || true
RUN apt-get install -y \
      unifi

WORKDIR /usr/local/bin
COPY --chmod=0755 unifi.sh .
ENTRYPOINT ["/usr/local/bin/unifi.sh"]