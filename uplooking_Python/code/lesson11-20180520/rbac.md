1.用户登陆
  
2.db判断用户
    

@app.before_quest
def check_login():
    username = request.cookies.get("username")

    if username:
        pass

    else:
        return render_template('login.html')    


3.功能点前添加校验

4.调用权限系统

    获取权限
    获取角色
    数据库设计：
        user
        role
        priv_point:权限点
        system
        map_user_role
        map_priv_role

    后端代码实现：
        select user from 

         



            

