'''
Created on 2017年9月26日

@author: Ops
'''
#encoding:utf-8 # 支持中文输入

import sys
import getpass
import shutil
import commands
import time
import fileinput

staff_list = 'contact_list.txt'

# 参数配置
user = 'admin'
passwd = '123456'
s = file(staff_list)
ss = s.readlines()
a = file(staff_list,'a')
counter = 0
_counter = 0

# 认证登陆
while True:
  # 计数器,超过3次强制退出
  if counter <= 3:
    # 空用户名判断
    name = raw_input("please input your name: ").strip()
    if len(name) == 0:
        print "empty name,try again!"
        continue

    # 用户名密码判断,密码隐藏
    # pwd =  raw_input("please input your password: ")
    pwd = getpass.getpass('please input your password:')
    if pwd == passwd and name == user:
      print "Welcome to login,%s" %name
    else:
        print "name or password is not valid,please try again!"
        counter +=1
        continue
    break
  else:
    print "exceeded 3 times user login..exit the script"
    sys.exit()

# 选择增删改查
while True:
  item = raw_input('''\033[36;1mWelcome to login %s, what do you want to do?
-----------------------
press 'p' for print 
press 'a' for add
press 'd' for delete 
press 'u' for update
press 's' for select
press 'q' for quit
-----------------------
please make your choise: \033[0m''' % user)
  
  # 打印所有
  if item == 'p':
    while True:
      user_select = open(staff_list,'r')
      s_ = user_select.read()     
      print '                          '
      print '\033[32;1mThe content of the file\033[0m '
      print '\033[32;1m--------------------------\033[0m '
      print s_
      print '\033[32;1m--------------------------\033[0m '
      print '                          '
      break
    
  # 增加
  elif item == 'a':
    while True:
      user_add_num = raw_input(("\033[32;1mplease input your number: \033[0m ").strip())
      user_add_name = raw_input(("\033[32;1mplease input your name: \033[0m ").strip())
      user_add_dept = raw_input(("\033[32;1mplease input your department: \033[0m ").strip())
      user_add_id = raw_input(("\033[32;1mplease input your id: \033[0m ").strip())
      user_item = '%s\t%s\t%s\t%s' %(user_add_num,user_add_name,user_add_dept,user_add_id)
      a.write("\n%s" %user_item)
      a.flush()
      print "\033[32;1mAdd item:\033[0m"
      print "\033[32;1m------------------\033[0m"
      print user_item
      print "\033[32;1m------------------\033[0m"
      print "\033[32;1mAdded successful!\033[0m"
      
      # 删除空行
      del_blank_in = open('contact_list.txt','r')
      del_blank_out = open('contact_list_new.txt','w')
      lines = del_blank_in.readlines()
      for blank in lines:
        if blank.split():
          del_blank_out.writelines(blank)
      del_blank_in.close()
      del_blank_out.close()
      # 覆盖原文件
      shutil.move('contact_list_new.txt','contact_list.txt')
      user_add_choise = raw_input('press Q for quit or press any key to continue: ')
      if user_add_choise == 'Q':
          print 'bye!'
          break
      
  # 删除
  elif item == 'd':
    while True:
      user_del_input = raw_input("please input sth to delete: ").strip()
      if len(user_del_input) == 0:
        print "empty input,try again!"
      else:
        # 输入值与源文件比对，有则丢弃，没有则添加到新文件，最后新文件覆盖源文件，实现删除功能
        with open('contact_list.txt','r') as ff:
          with open('contact_list.txt.new','w') as gg:
            for line in ff.readlines():
              if user_del_input not in line:
                gg.write(line)
          if user_del_input in line:
        print "\033[32;1mDelete item:\033[0m"
        print "\033[32;1m------------------\033[0m"
        print " %s " %line
        _counter += 1 # 计数器,判断输入值命中次数
        print "\033[32;1m------------------\033[0m"
          print "\033[32;1mDeleted successful!\033[0m"
          if _counter == 0: 
               print 'nothing delete!'
        shutil.move('contact_list.txt.new','contact_list.txt')
        # 退出删除
        user_del_input_quit = raw_input("\033[32;1mpress Q for quit or press any key to continue? \033[0m").strip()
        if user_del_input_quit == 'Q':
            break      
  
  
  # 查询
  elif item == 's':
    while True:
      match_yes = 0
      #输入判断，忽略空格输入,加入颜色
      user_select_input = raw_input("\033[32;1mplease input sth to search:\033[0m ").strip()
      contact_file = file (staff_list)
      if len(user_select_input) == 0:
        print "empty input,try again!"
      else: 
        while True:
      line = contact_file.readline()
          if len(line) == 0:
          break
      if user_select_input in line:
          match_yes = 1
          print line
      else:
          pass
        if match_yes == 0 :
          print "No match item found"
      # 退出查询
        user_select_input_quit = raw_input("\033[32;1mpress Q for quit or press any key to continue? \033[0m").strip()
        if user_select_input_quit == 'Q':
            break      
 
  # 修改
  elif item == 'u':
    while True:
      # 输入为空以及匹配查询内容判断
      user_update_input_from = raw_input("\033[32;1mplease search sth to update: \033[0m").strip()
      update_match = 0
      update_file = file(staff_list).readlines()
      for n_ in range(len(update_file)):
    if user_update_input_from in update_file[n_]:
        update_match = 1
    else:
        pass
      if update_match == 0:
          print "No match item found"
      elif len(user_update_input_from) == 0:
        print "empty input,try again!"
      else:
    # 将匹配到的字符修改为新字符
    while True:
        user_update_input_to = raw_input("\033[32;1mupdate %s to what?\033[0m " %(user_update_input_from)).strip()
      if len(user_update_input_to) == 0:
            print "empty input,try again!"
      else:
          for line_ in fileinput.input(staff_list,inplace = 1,backup='.bak'):
            line_ = line_.replace(user_update_input_from,user_update_input_to)
            print line_
        # 打印修改字符的行
            print "\033[32;1mupdate item:\033[0m"
            output_ = commands.getoutput("diff contact_list.txt contact_list.txt.bak|grep '^>.*' | sed 's/^>//g'")
        print "\033[32;1m---------------------------\033[0m"
            print output_
        print "\033[32;1m---------------------------\033[0m"
        print "\033[32;1mupdate successfully!\033[0m"
            # 删除空行
            del_blank_in = open('contact_list.txt','r')
            del_blank_out = open('contact_list_new.txt','w')
            lines = del_blank_in.readlines()
            for blank in lines:
          if blank.split():
            del_blank_out.writelines(blank)
            del_blank_in.close()
            del_blank_out.close()
            # 覆盖原文件
            shutil.move('contact_list_new.txt','contact_list.txt')
        break
    # 退出更新
    user_update_input_quit = raw_input("\033[32;1mpress Q for quit or press any key to continue? \033[0m").strip()
        if user_update_input_quit == 'Q':
        break    
    
       
  # 退出
  elif item == 'q':
    print 'bye!'
    sys.exit()
  
  else:
    print "\033[31;1mnot a valid key word\033[0m"
    time.sleep(1)