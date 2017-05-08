
#coding:utf8
'''
Created on 2017年5月5日

@author: Ops
'''
import dns.resolver
import os
import httplib

iplist=[]    #定义一个域名IP列表变量

appdomain="sms.phpip.com"   #定义业务域名

def get_iplist(domain=""):
    try:
        A = dns.resolver.query(domain,'A')
        
    except Exception,e:
        print "dns resolver error:"+str(e)
        return
    for i in A.response.answer:
        for j in i.items:
            if j.rdtype == 1:
                iplist.append(j.address)  #追加到iplist
            else:
                pass    
    return  True

def checkip(ip):
    checkurl=ip+":80"
    getcontent=""
    httplib.socket.setdefaulttimeout(30)  #定义http连接超时时间
    conn=httplib.HTTPConnection(checkurl) #创建http连接对象
    
    try:
        conn.request("GET","/",headers = {"HOST":appdomain})
        
        r=conn.getresponse()
        getcontent = r.read(20)
        
    finally:
        
        if getcontent =="<!doctype html>":
            
            print ip+" [OK]"
            
        else:
            print ip+" [Error]"
            
if __name__=="__main__":
    if get_iplist(appdomain) and len(iplist) >0:
        for ip in iplist:
            checkip(ip)
            
    else:
        print "dns resolver error."                        