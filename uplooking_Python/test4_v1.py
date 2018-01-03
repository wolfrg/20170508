#encoding:utf8

my_dict = {'frg':'123'} #为了测试
count = 0

while True:
    choice = raw_input('注册R 登陆L 退出Q: ')

    if choice.lower() == 'r':
        username = raw_input('请输入用户名：')
        if username in my_dict:
            print "用户已经存在!"
        if username not in my_dict:
            password = raw_input('请输入密码：')
            my_dict[username] = password
            print "注册成功"
            print my_dict
    if choice.lower() == 'l':
        username = raw_input('请输入用户名：')
        if username  in my_dict:
            password = raw_input('请输入密码：')
            if password == my_dict[username]:
                print "登陆成功"
            else:
                count = count + 1
                print "密码错误 %s 次" %  count
                if count > 3:
                    print "错误超过3次，帐号被锁定"
        else:
            print "用户名不存在，请注册"
    if choice.lower() == 'q':
        print ("退出")
        break
