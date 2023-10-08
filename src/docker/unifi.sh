#!/bin/bash

# Start MongoDB
mongod --fork --config=/etc/mongodb.conf

# Start Unifi controller (command taken from /etc/init.d/unifi
/usr/bin/java \
	-Dfile.encoding=UTF-8 \
	-Djava.awt.headless=true \
	-Dapple.awt.UIElement=true \
	-Dunifi.core.enabled=false \
	-Xmx1024M -XX:+UseParallelGC \
	-XX:+ExitOnOutOfMemoryError \
	-XX:+CrashOnOutOfMemoryError \
	-XX:ErrorFile=/usr/lib/unifi/logs/hs_err_pid%p.log \
	-Dunifi.datadir=/var/lib/unifi \
	-Dunifi.logdir=/var/log/unifi \
	-Dunifi.rundir=/var/run/unifi \
	--add-opens java.base/java.time=ALL-UNNAMED \
	-jar /usr/lib/unifi/lib/ace.jar start &

# Wait for any process to exit
wait -n

# Exit with status of process that exited first
exit $?
