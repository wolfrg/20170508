#!/usr/bin/python
from flask import Flask,render_template,request,redirect,session
import MySQLdb as mysql

con = mysql.connect(host='localhost',user='root',passwd='123321',db='python01')
con.autocommit(True)
cur =con.cursor()

app = Flask(__name__)
import util
from util import app_index,app_login,app_delete,app_adduser,app_updatepw,app_getpw
# use random
app.secret_key = 'iouasoiduio89127398981273'

@app.route('/usertemp')
def usertemp():
    if 'user' in session:
        return render_template('usertemp.html',user=session['user'],users=app_index())

@app.route('/')
def index():
    if 'user' in session:
        return render_template('index.html',user=session['user'],users=app_index())
    else:
        return redirect('/login')

@app.route('/login',methods=['GET','POST'])
def login():
    if request.method=='GET':
        return render_template('login.html')
    elif request.method=='POST':
        user = request.form.get('user')
        pwd = request.form.get('pwd')
        app_user = app_login(user,pwd)
        if app_user:
            session['user'] = user
            return redirect('/')
        else:
            return 'wrong user. or passwd'

@app.route('/delete')
def deleteuser():
    user = request.args.get('user')
    print 'user',user
    app_delete(user)
    return 'ok' 

@app.route('/changepw',methods=['GET','POST'])
def changepw():
   # if request.method == 'GET':
   #     user = request.args.get('user')
   #     return render_template('changepw.html',user=user)
   #elif request.method == 'POST':
    user = request.form.get('user')
    oldpwd = request.form.get('oldpwd')
    newpwd = request.form.get('newpwd')
    confirmpwd = request.form.get('confirmpwd')
    pwd = list(app_getpw(user))  
    pwd = ''.join(pwd)
    pwd = pwd.strip()
    if pwd!=oldpwd:
        return 'wrong old password'
    if newpwd!=confirmpwd:
        return 'new pwd not equal to confirmpwd'
    app_updatepw(newpwd,user)
    return 'ok'

##@app.route('/adduser')
##def adduser():
##    user = request.args.get('user')
##    pwd = request.args.get('pwd')
##    if (not user) or (not pwd):
##        return 'need username and password'
##
##    sql = 'insert into user values ("%s","%s")'%(user,pwd)
##    cur.execute(sql)
##    return 'ok'

@app.route('/adduser',methods=['GET','POST'])
def adduser():
    #if request.method == 'GET':
    #    return render_template('adduser.html')
    #elif request.method =='POST':
    #user = request.form.get('user')
   # pwd = request.form.get('pwd')
    user = request.args.get('user')
    pwd = request.args.get('pwd')
    app_adduser(user,pwd)
    #return redirect('/')
    return 'ok' 

@app.route('/logout')
def logout():
    del session['user']
    return redirect('/login')





if __name__=="__main__":
    app.run(host='0.0.0.0',port=3333,debug=True)