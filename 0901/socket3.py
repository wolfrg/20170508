'''
Created on 2017年9月8日

@author: Ops
'''

import os,socket
import json


p='F:\\Python\\zm-mobile-h5-spa'
pdir=os.listdir(p) 

sk = socket.socket()
sk.bind(("127.0.0.1", 8080))
sk.listen(50)
p=os.getcwd()
print('http://localhost:8080/')


def my_rsync(p,filename):
    
    #根目录下需要复制的目录
    cpdir='src'
    srcname = os.path.join(p,filename)
    #print (srcname)
    
    if os.path.isdir(srcname):
        os.chdir(srcname)
        #print('进入：' + os.getcwd())
        jsonDir=os.path.join(srcname,'package.json')  #遍历包含package.json的目录
        if os.path.isfile(jsonDir):
            #print(srcname + "目录：存在package.json文件")
            print(jsonDir)
            with open('package.json','r') as f:
                lines = f.read(-1) 
                try:
                    text=json.loads(lines)
                    #print(text)
                except ValueError:
                    #print(' json解析失败')
                    pass
                    
                else:
                    #print('json解析成功')
                    pass
                    
                    if text.get("scripts",()).get("build"):
                        #print('package.json文件中包含build字段')
                        cpdir='dist'
                        #print(cpdir)
                        #os.system('npm install')
                        #print ('执行命令npm install')
        
        if(os.path.isdir(os.path.join(srcname,cpdir))):
            dstPath='F:\\Python\\spa\\'
            dstPath=os.path.join(dstPath,filename)
            
            if(not os.path.isdir(dstPath)):
                os.makedirs(dstPath)
            
            srcPath=os.path.join(srcname,cpdir)
            
            #print(srcPath)
            #windows命令格式    
            comm='xcopy /y /E    ' + srcPath + ' ' + dstPath 
            #Linux命令格式
            #comm='cp -a  ' + srcPath + ' ' + dstPath
            #print (comm)
            os.system(comm)

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
    


    eddir=os.listdir(p)
    for filename in eddir:
        if(filenameOld[1:]==filename or filenameOld[1:]=='_all'):
            print(filenameOld[1:])
            my_rsync( p,filename )

    data=''
    for filename in eddir:
        if filename[0]!='.' and os.path.isdir(p+'/'+filename):
            data+='<a href="'+filename+'">'+filename+'</a> <br>'

    conn.send(bytes(data, encoding="utf8"))
    conn.close()  # 跳出循环时结束通讯
    
    
    