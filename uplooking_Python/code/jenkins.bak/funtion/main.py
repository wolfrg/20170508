#!/usr/bin/python
#coding:utf-8
import os
import paramiko
import MySQLdb.cursors
import sys,string
import MySQLdb
def login():
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(hostname="10.1.11.92",username="root",password="123456")
    return client
def accept():
    conn = MySQLdb.connect(host='localhost',user='root',passwd='',db='jenkins',cursorclass = MySQLdb.cursors.DictCursor,)
    return conn
def tijiao(name):
    a = 'sh /root/jenkins/shell/%s.sh'%name
    print os.system(a)
def server_bulid(name):
    
    a = 'sh /root/jenkins/shell/%s.sh'%name
    os.system(a)
def build_server(name):
    if name == 'test-php':
        client = paramiko.SSHClient()
        client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        client.connect(hostname="10.1.11.95",username="root",password="123456")
        stdin, stdout, stderr = client.exec_command("sh /root/test-php.sh")
    if name == 'test-java':
        client = login()
        stdin, stdout, stderr = client.exec_command("sh /root/test-java.sh")

