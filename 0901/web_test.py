#coding:utf8
'''
Created on 2017年9月28日

@author: Ops
'''
import socket
  
def handle_request(client):
    buf = client.recv(1024)
    client.send(bytes("HTTP/1.1 200 OK\r\n\r\n",encoding='utf8'))  #注意这里的python3的语法
    
    #client.send(bytes("<h1 style='background-color:red;'>Hello, Python</h1>",encoding='utf8'))
    
    f = open('index.html','r')
    data = f.read()
    f.close()
    
    client.send(bytes(data,encoding='utf8'))
  
def main():
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.bind(('localhost',8000))
    sock.listen(5)
  
    while True:
        connection, address = sock.accept()
        handle_request(connection)
        connection.close()
  
if __name__ == '__main__':
    main()




