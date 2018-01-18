#!/bin/bash
#script get_server_info.sh
#获取硬件信息：IP、主机名、操作系统、cpu核数、内存、硬盘
ip=`ifconfig -a | grep inet | grep -v 127.0.0.1 | grep -v inet6 | awk '{print $2}' | tr -d "地址:"`
os=`lsb_release -a | grep Description | awk -F: '{print $2}' | sed 's/^[\t]*//g'`
cpu=`grep 'cpu cores' /proc/cpuinfo  | uniq | awk -F: '{print $2}' | sed 's/^[ \t ]*//g'`
Mem=`cat /proc/meminfo | grep 'MemTotal' | awk -F: '{print $2}' | sed 's/^[ \t ]*//g'`
echo IP地址：$ip
echo 操作系统：$os
echo cpu核数：$cpu
echo 内存大小：$Mem
