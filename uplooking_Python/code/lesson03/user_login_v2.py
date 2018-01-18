#coding:utf8

users = {} #存储用户信息
status = {} #{username:count} #记录用户的登录状态
count = 0
black_users = []

def user_login():
    print "########请登录###########"
    username = raw_input("请输入用户名：")
    if users.has_key(username) and username not in black_users:
        password = raw_input("请输入密码：")
        if users[username] == password:
            print "登录成功"
            change_password(username) #登录成功后调用修改密码的函数
        else:
            print "用户名or密码错误"
            check_user_password(username,password)
            user_login()

    elif username in black_users:
        print "用户已经被锁定！！"
        user_login()
    else:
        print "用户不存在，请注册"
        user_register()   #调用注册的函数

#验证用户密码,密码错误3次就锁定该账号并加入黑名单
def check_user_password(username,password):
    if password != users[username]:
        global count
        count += 1
        if count == 3:
            print "该账户已经被锁定"
            user_blacklist(username)

#用户黑名单
def user_blacklist(username):
    black_users.append(username)
    print black_users



def user_register():

    #注册的时候增加一个判断：判断用户是否已经被注册
    username = raw_input("请输入用户名：")
    if username not in users:
        password = raw_input("请输入密码：")
        users[username] = password
        print users
        print "恭喜您，注册成功！"
        user_login()
    else :
        username = raw_input("用户名已经被注册，请注册一个别的：")
        user_register()



def change_password(username):
    choice = raw_input("是否修改密码(y/N)：")
    if choice.lower() == 'y':
        while True:
            password = raw_input("请输入密码：")
            password_again = raw_input("请再输入一次密码：")
            if password == password_again:
                users[username] = password
                print "Hello %s 您的密码修已改成功" % username
                #break
                user_login()
        #return True

    else:
        print "您没有选择修改密码，请继续浏览"
        #exit(-1)
        choice = raw_input("退出本站，请输入q\n")
        if choice.lower() == 'q':
            exit(-1)

def main():
    user_login()
    #user_register()  #17行调用了该函数，此处就不能再调用了
    #user_login()



if __name__=="__main__":
    main()
