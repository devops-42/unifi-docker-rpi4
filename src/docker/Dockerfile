FROM ubuntu:24.04@sha256:c4a8d5503dfb2a3eb8ab5f807da5bc69a85730fb49b5cfca2330194ebcc41c7b

# renovate: datasource=custom.unifi depName=unifi
ARG UNIFI_VERSION=10.0.160
# renovate: datasource=github-tags depName=FerretDB/FerretDB versioning=semver
ARG FERRETDB_VERSION=v2.7.0

ENV UNIFI_VERSION=${UNIFI_VERSION}
ENV FERRETDB_VERSION=${FERRETDB_VERSION}

# https://github.com/moby/moby/issues/27988#issuecomment-462809153
RUN echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y \
      apt-transport-https \
      ca-certificates \
      curl \
      gnupg2

# Install Temurin JRE
RUN curl -fsSL https://packages.adoptium.net/artifactory/api/gpg/key/public | gpg --dearmor | tee /etc/apt/trusted.gpg.d/adoptium.gpg > /dev/null
RUN echo "deb https://packages.adoptium.net/artifactory/deb $(awk -F= '/^VERSION_CODENAME/{print$2}' /etc/os-release) main" | tee /etc/apt/sources.list.d/adoptium.list
RUN apt update && \
    apt install -y \
      temurin-25-jre

# Get unifi network server's debian package
RUN curl -fsSL https://dl.ui.com/unifi/${UNIFI_VERSION}/unifi_sysvinit_all.deb -o /tmp/unifi-dist.deb
RUN mkdir /debtmp && \
    cd debtmp && \
    dpkg-deb -R /tmp/unifi-dist.deb .

# Remove mongo dependencies and repackage
RUN sed -i '/mongo/d' /debtmp/DEBIAN/control
RUN dpkg -b /debtmp /tmp/unifi.deb

# Install ferretdb as an API layer proxy for mongo (as mongodb is not supported officially on RPI)
RUN curl -fsSL https://github.com/FerretDB/FerretDB/releases/download/${FERRETDB_VERSION}/ferretdb-arm64-linux.deb -o /tmp/ferretdb-dist.deb && \
    dpkg -i /tmp/ferretdb-dist.deb

# Install Unifi package
RUN apt install -y \
 /tmp/unifi.deb

WORKDIR /usr/local/bin
COPY --chmod=0755 unifi.sh .
ENTRYPOINT ["/usr/local/bin/unifi.sh"]
