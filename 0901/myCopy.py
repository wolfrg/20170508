'''
Created on 2017年8月31日
该脚本应用于内存测试环境的前端项目，把dist和src下的文件复制到指定目录
@author: Ops
'''
import os
import json


p='F:\\Python\\zm-mobile-h5-spa'
pdir=os.listdir(p) 

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
            
        print(cpdir)

for filename in pdir:
    my_rsync(p, filename)    
    
    
    