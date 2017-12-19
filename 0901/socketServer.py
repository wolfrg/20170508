'''
Created on 2017年9月11日

@author: Ops
socket server的脚本练习
'''

import socket,os


p = 'F:\\MyEclipse\\20170508'
pdir = os.listdir(p)

sk = socket.socket()
sk.bind(('127.0.0.1',8080))
sk.listen(1024)
print('http://localhost:8080/')


def my_functions():
    pass

while True:
    conn,addr = sk.accept()
    accept_data = str(conn.recv(1024),encoding="utf8")
    lines = accept_data.split('\n')[0]
    #print(lines)
    if len(accept_data) <3:
        continue
        
    
    #向浏览器发送http头
    send_data = 'HTTP/1.1 200 OK\r\nContent-Type: text/html; charset=utf-8\r\n\r\n'
    
    conn.send(bytes(send_data,encoding="utf8"))
    
    data = ''
    
   
    for rootFile in pdir:
        if os.path.isdir(os.path.join(p,rootFile)):
            data += '<a  href="'+rootFile+'">' +rootFile+ '</a>  <br>'
    
    
    conn.send(bytes(data,encoding="utf8"))
    conn.close()
    