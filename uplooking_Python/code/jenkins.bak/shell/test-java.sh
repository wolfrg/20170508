#!/bin/bash
. /etc/profile

mkdir -p /root/jenkins/workspace/java_oms/src
cd /root/jenkins/workspace/java_oms/src && git init
git rev-parse --is-inside-work-tree
git config remote.origin.url http://root:baojia.com@10.1.11.36/platform-server/java_oms.git
git pull http://root:baojia.com@10.1.11.36/platform-server/java_oms.git
cd oms/
mvn clean package
