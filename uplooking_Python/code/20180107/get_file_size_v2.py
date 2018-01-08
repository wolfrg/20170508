#coding:utf8
import os

from os.path import join,getsize

for root,dirs,files in os.walk('/home/f/test'):
   # print root,
   # print dirs,
   # print files

    for file in files:
        filepath = os.path.join(root,file)
        print filepath

        size = getsize(filepath)
        print size
