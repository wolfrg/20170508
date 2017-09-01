'''
Created on 2017年8月31日

@author: Ops
'''
import os
import json


p='F:\\Python\\zm-mobile-h5-spa'
pdir=os.listdir(p) 

def my_rsync(p,filename):
    
    #需要复制的目录
    cpdir='src'
    srcname = os.path.join(p,filename)
    print (srcname)
    
    if os.path.isdir(srcname):
        os.chdir(srcname)
        #print('进入：' + os.getcwd())
        if os.path.isfile(os.path.join(srcname,'package.json')):
            #print(srcname + "目录：存在package.json文件")
            with open('package.json','r') as f:
                lines = f.read(-1) 
                try:
                    text=json.loads(lines)
                    #print(text)
                except ValueError:
                    print(' json解析失败')
                    
                else:
                    print('json解析成功')
                    
                    if text.get("scripts",()).get("build"):
                        #print(text.get("scripts",('aa')))
                        #print(text.get("scripts"))
                        #print('package.json文件中包含build字段')
                        cpdir='dist'
                        #os.system('npm install')
                        #print ('执行命令npm install')
    
        if(os.path.isdir(os.path.join(srcname,cpdir))):
            dstPath='F:\\Python\\spa\\'
            dstPath=os.path.join(dstPath,filename)
            
            if(not os.path.isdir(dstPath)):
                os.makedirs(dstPath)
            
            srcPath=os.path.join(srcname,cpdir)
            print(srcPath)
            #windows命令格式    
            comm='xcopy /y /E    ' + srcPath + ' ' + dstPath 
            #Linux命令格式
            #comm='cp -a  ' + srcPath + ' ' + dstPath
            #print (comm)
            os.system(comm)
            


for filename in pdir:
    my_rsync(p, filename)    
    
    
    