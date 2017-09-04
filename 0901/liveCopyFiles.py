'''
Created on 2017年9月4日

@author: Ops
'''

import os
import re
from shutil import ignore_patterns, copystat, copy2, Error

#复制的函数
def copytree(src, dst, ignore=ignore_patterns('*.properties')):
    
    
    names = os.listdir(src)
    
    #得到源目录的文件
    #print src
    #print names
    if ignore is not None:
        ignored_names = ignore(src,names)
        #print ignored_names
    else:
        ignored_names = set()
        #print ignore_names
    errors = []    
    for name in names:
        if name in ignored_names:
            continue
        srcname = os.path.join(src,name)
        dstname = os.path.join(dst,name)
        try:
            if os.path.isdir(srcname):
                if  not os.path.isdir(dstname):
                    os.makedirs(dstname)
                copytree(srcname, dstname, ignore)
                #print("复制目录成功")
            else:
                if os.path.isfile(srcname):
                    if not os.path.isfile(dstname): 
                            copy2(srcname, dstname)       
                            #print("复制文件成功")
                    elif os.stat(srcname).st_mtime - os.stat(dstname).st_mtime >1: 
                            copy2(srcname, dstname)    
                            #print("复制文件成功")
            if "web.xml" in ignored_names: #web.xml文件要复制
                        copy2("E:\\update-maven\\workspace\\zhangmen-live\\zm-live-service\\target\\zm-live-service-0.0.1\\WEB-INF\\web.xml", "E:\\update-work\\zhangmen\\zhangmen-live\\Alpha\\trunk\\WEB-INF\\web.xml")                         
        except (IOError, os.error) as why:
            errors.append((srcname, dstname, str(why)))
        # catch the Error from the recursive copytree so that we can
        # continue with other files
        except Error as err:
            errors.extend(err.args[0])
    try:
        copystat(src, dst)
    except WindowsError:
        # can't copy file access times on Windows
        pass
    except OSError as why:
        errors.extend((src, dst, str(why)))
    if errors:
        raise Error(errors)

    
# #调用函数
copytree("E:\\update-maven\\workspace\\zhangmen-live\\zm-live-service\\target\\zm-live-service-0.0.1\\WEB-INF","E:\\update-work\\zhangmen\\zhangmen-live\\Alpha\\trunk\\WEB-INF", ignore_patterns("*.properties"))



#==========================================提交文件的操作===========================#
#切换到svn目录
os.chdir('E:\\update-work\\zhangmen\\zhangmen-live\\Alpha\\trunk\\') 

#强制add没有受版本控制的文件
#把状态为delete的文件重定向到一个txt文件,每次提交完成后清空文件
os.system('svn add --force *')  
a = os.system('svn st -u . | findstr ! > E:\\svn_delete\\notdelete.txt')  

#接下来就是对notdelete.txt文件的操作

#首先读取文件的每一行
lines  = open("E:\\svn_delete\\notdelete.txt","r").readlines()

#使用for循环把替换后的内容写入一个新文件
fp = open("E:\\svn_delete\\delete.txt","w")
for s  in lines:
    fp.write(re.sub('!|\d| ','',s,20))  #把！符号、数字和空格替换掉    
fp.close()    #关闭文件

#第二步操作替换好的文件
deletefiles = open("E:\\svn_delete\\delete.txt","r").readlines()

for d in deletefiles:
    os.system('svn delete %s ' % d)

#提交全部文件        
os.system('svn commit  -m "Live Server commit"') 
print '文件提交成功'
