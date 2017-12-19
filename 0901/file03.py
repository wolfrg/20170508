'''
Created on 2017年9月27日

@author: Ops
'''

#实现文件的增删改查

import sys
from sys import argv

script,filename = argv

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


        elif item == 'q':
                print "bye!"
                sys.exit()
