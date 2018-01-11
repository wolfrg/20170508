#coding:utf8
import os

for root,dirs,files in os.walk('/home/f/mysite'):
    for file in files:
        fname = os.path.join(root,file)

        num_lines = 0
        num_null = 0
        num_comments = 0

        with open(fname) as f:
            for line in f.readlines():
                if not line.strip():
                    num_null += 1
                elif line.startswith('#'):
                    num_comments += 1
                else:
                    num_lines += 1
        print "file %s: 代码 %d行，空行 %d,注释 %d" % (fname,num_lines,num_null,num_comments)
