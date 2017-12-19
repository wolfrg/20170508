#coding:utf8
'''
Created on 2017年7月28日

@author: Ops
'''


import urllib.request
import urllib.parse
import json

content = input("请输入要翻译的内容：")
url ="http://fanyi.youdao.com/translate_o?smartresult=dict&smartresult=rule&sessionFrom=http://www.youdao.com"

#创建字典存放表单数据
data = {}

data['i']=content
#data['i']='啊'
data['from']='AUTO'
data['to']='AUTO'
data['smartresult']='dict'
data['client']='fanyideskweb'
data['salt']='1501061539231'
data['sign']='d3a9c2817d53b954a8a8788d30c770a0'
data['doctype']='json'
data['version']='2.1'
data['keyfrom']='fanyi.web'
data['action']='FY_BY_CL1CKBUTTON'
data['typoResult']='true'

data = urllib.parse.urlencode(data).encode('utf-8')
response = urllib.request.urlopen(url,data)

html = response.read().decode('utf-8')
target = json.loads(html)
#print(html)
print("翻译结果：%s" %(target['translateResult'][0][0]['tgt']))