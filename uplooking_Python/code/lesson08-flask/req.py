#!/usr/bin/env python
# -*- coding: utf-8 -*-
import requests

def httplib(url):
    payload = {"hostname": "tj1-nginx01.kscn"}

    #payload = {"hostnames": "www.baidu.com"}
    ## params 传参是通过url传参：http://127.0.0.1:8888/hosts/add?hostnames='www.baidu.com'
    #r = requests.post(url, params=payload)
    #print r.status_code, r.text

    #payload = {"ip": "127.0.0.1", "system": "centos"}
   # r1 = requests.post(url, data=payload)
   # print r1.status_code, r1.text

    ##payload = {"hostname":"cn-beijing-01.kscn", "type":"vm", "ip":"1.1.1.1", "location":"beijing"}
    r2= requests.post(url, json=payload)
    print r2.status_code, r2.text


if __name__ == "__main__":
    url =  "http://127.0.0.1:8888/hosts/test/params"
    httplib(url)

