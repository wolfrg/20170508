#coding:utf8
'''
Created on 2017年9月27日

@author: Ops
'''

'''
该脚本实现文件的增删改查
颜色在windows下不生效
'''

import sys
from sys import argv


script,filename = argv

a = open(filename,'a')
#打印文件内容
while True:
    item = raw_input('''\033[36;1mWelcome to here,what do you want to do?
----------------------
press 'p' for print
press 'a' for add
press 'd' for delete
press 'u' for update
press 's' for select
press 'q' for quit
----------------------
please make your choise: \033[0m''')

    if item == 'p':
        while True:
            user_select = open(filename,'r')
            s_p = user_select.read()
            print s_p
            break
   
    if item == 'a':
        while True:
            user_add_content = raw_input("Please input your key and vaule")
            user_item = '%s' % (user_add_content)
            a.write("\n%s" %user_add_content)
            a.flush()



            user_add_choise = raw_input('press Q for quit or press any key to continue:')
            if user_add_choise == 'Q':
                print 'bye!'
                break

    elif item == 'q':
        print "bye!"
        sys.exit()        