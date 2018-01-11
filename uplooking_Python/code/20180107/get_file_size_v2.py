#coding:utf8
import os

from os.path import join,getsize

for root,dirs,files in os.walk('/home/f/mysite'):
   # print root,
   # print dirs,
   # print files

    for file in files:
        files= os.path.join(root,file)
        print files

        size = getsize(files)
        print size
