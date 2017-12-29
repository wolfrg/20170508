#encoding:utf8
#为了测试，预先给字典赋值
my_dict = {'username':'frg','password':'123'}
count = 0
#choice = raw_input('Login Register Quit')
while True:
    choice = raw_input('Login Register Quit: ')
    if choice.lower() == 'r':
        username = raw_input('输入你想注册的用户名: ')
        #判断该用户名是否存在
        if username in my_dict['username']:
            username = raw_input('此用户已经存在，请重新输入：')
        if username not in my_dict['username']:
            password = raw_input('请输入密码: ')
            my_dict['username'] = username
            my_dict['password'] = password
            print my_dict
            print "Success register"

    if choice.lower() == 'l':
        username = raw_input("请输入你的用户名：")
        if  username in  my_dict['username']:
            password = raw_input('请输入密码：')
            if password == my_dict['password']:
                print "Login Success!"
            else:
                print "密码错误"
                #password = raw_input('密码错误，请重新输入: ')
                count = count + 1
                print "错误 %s 次" % count
        #else:
        #    print"password error or you have not register"
        #    print "Please register first"
        #    count = count + 1


        if  count>=3:
            print "帐号被锁定"

    if choice.lower() == 'q':
        print "Quit!!!"
        break
    print " "

