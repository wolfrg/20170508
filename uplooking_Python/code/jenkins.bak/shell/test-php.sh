#!/bin/bash
. /etc/profile &>/dev/null

mkdir -p /root/jenkins/workspace/icss.baojia.com/src
cd /root/jenkins/workspace/icss.baojia.com/src
git init
git rev-parse --is-inside-work-tree
git config remote.origin.url http://root:baojia.com@10.1.11.36/platform-server/icss.baojia.com.git
git pull http://root:baojia.com@10.1.11.36/platform-server/icss.baojia.com.git

