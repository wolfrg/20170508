'''
Created on 2017年9月8日

@author: Ops
这是一个socket客户端访问新浪首页的脚本
'''
import  socket

#创建socket
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

#建立连接
s.connect(('www.sina.com.cn',80))

#发送数据
send_data = 'GET / HTTP/1.1\r\nHost: www.sina.com.cn\r\nConnection: close\r\n\r\n'
s.send(bytes(send_data,encoding="utf8"))

#接收数据：
buffer = []

while True:
    d = s.recv(1024)
    if d:
        buffer.append(d)
    else:
        break
         
    data = bytes(' ',encoding="utf8").join(buffer)
                 

s.close()

header,html = data.split(bytes('\r\n\n',encoding="utf8"),1)
print (header)

with open('sina.html','wb') as f:
        f.write(html)
