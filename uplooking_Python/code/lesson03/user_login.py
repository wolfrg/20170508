#encoding:utf8
#把之前的代码改为函数形式
users = {}  #用户字典
count = 0
status = {} #{username,count}

#功能写在函数里面
#用户登陆的功能
def user_login(username,password):
    if users.keys















#用户注册
def user_register():
    username = raw_input("请输入你要注册的用户名:")
    if username in my_dict:
        print "用户已经注册"
    if username not in my_dict:
        password = raw_input("请输入密码")
        my_dict[username] = password
        print "注册成功"
        print my_dict

def reset_password():
    pass


#逻辑写到这里
def main():
    while True:
        user_input = raw_input("L登陆 R注册 Q退出：")
        if user_input.lower() == "l":
            user_login()

        if user_input.lower() == 'r':
            user_register()

        if user_input.lower() == 'q':
            user_quit()



if __name__ == "__main__":
    main()



