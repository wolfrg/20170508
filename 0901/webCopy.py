'''
Created on 2017年9月1日

@author: Ops
'''

import socket, os, sys, json, platform

sk = socket.socket()
sk.bind(("127.0.0.1", 8080))
sk.listen(50)
p=os.getcwd()
print('http://localhost:8080/')


def plw( p ):
    print ("函数内取值: ", p)
    if 'Linux' in platform.system():
        return p.replace("\\", "/")
    elif 'Windows' in platform.system():
        return p.replace("/", "\\")

def cpfile( p,filename ):
    cpdir='src'
    if filename[0]!='.' and os.path.isdir(p+'/'+filename):
        os.chdir(p+'/'+filename)
        print(os.getcwd())
        if os.path.isfile(p+'/'+filename+'/package.json'):
            fo = open(p+'/'+filename+'/package.json', "r", encoding='UTF-8')
            line = fo.read(-1)
            fo.close()
            try:
                text = json.loads(line)
            except ValueError:
                print ("json 失败")
            else:
                print ("json 成功")
                if text.get("scripts",()).get("build"):
                    cpdir='dist'
                    print (text.get("scripts",()).get("build"))
                    #os.system('npm install')
                    #os.system('npm run build')
        if os.path.isdir(plw(p+'/'+filename+'/'+cpdir)):
            com='xcopy /y /E '+plw(p+'/'+filename+'/'+cpdir)+' '+plw(p+'/../www/'+filename)
            print(com)
            os.system('mkdir '+plw(p+'/../www/'+filename))
            os.system(com)


while True:
    conn, addr = sk.accept()
    accept_data = str(conn.recv(1024),encoding="utf8")
    lines = accept_data.split('\n')[0]
    print(lines)
    if len(accept_data)<3:
        continue;
    filename = accept_data.split()[1]
    print(filename);
    #print("".join(["接收内容：", accept_data, "     客户端口：", str(addr[1])]))
    send_data='HTTP/1.1 200 OK\r\nContent-Type: text/html; charset=utf-8\r\n\r\n';
    conn.send(bytes(send_data, encoding="utf8"))
    data=filename
    filenameOld=filename
    



    #if os.path.isfile(p+'/'+filename):        
    #    fo = open(p+'/'+filename, "r", encoding='UTF-8')
    #    data = fo.read(-1)
    #    fo.close()
    eddir=os.listdir(p)
    for filename in eddir:
        if(filenameOld[1:]==filename or filenameOld[1:]=='_all'):
            cpfile( p,filename )

    data='';
    for filename in eddir:
        if filename[0]!='.' and os.path.isdir(p+'/'+filename):
            data+='<a href="'+filename+'">'+filename+'</a> <br>'

    conn.send(bytes(data, encoding="utf8"))
    conn.close()  # 跳出循环时结束通讯