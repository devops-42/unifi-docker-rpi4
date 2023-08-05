# Unifi Docker RPI4

## 💬Description
This repo is intended to run the Unifi controller software on a Raspberry PI 4.

## 💥Known issues
The base image version used is pretty old. This is due to the dependency of the `unifi` package. It requires a MongoDB
version below 4, so I've chosen to stick with the Ubuntu 18.04 version. Any improvements welcome!
