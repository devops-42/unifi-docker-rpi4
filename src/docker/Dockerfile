FROM ubuntu:18.04

RUN echo "185.125.188.27 keyserver.ubuntu.com" | tee -a /etc/hosts

# https://github.com/moby/moby/issues/27988#issuecomment-462809153
RUN echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections

RUN apt-get update && \
    apt-get install -y \
      apt-transport-https \
      ca-certificates \
      gnupg \
      mongodb

RUN dpkg --add-architecture armhf && \
    echo "deb https://www.ui.com/downloads/unifi/debian stable ubiquiti" | tee /etc/apt/sources.list.d/unifi.list && \
    apt-key adv --recv-keys --keyserver keyserver.ubuntu.com 06E85760C0A52C50 && \
    apt-get update && \
    apt-get install -y \
      unifi

WORKDIR /usr/local/bin
COPY --chmod=0755 unifi.sh .
ENTRYPOINT ["/usr/local/bin/unifi.sh"]