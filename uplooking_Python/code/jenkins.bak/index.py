#!/usr/bin/python
#coding:utf-8
from flask import Flask, render_template, redirect, url_for, flash, request
import json
from form import LoginForm, RegistrationForm
import models
from flask_login import LoginManager, login_required, login_user,logout_user
from flask_sqlalchemy import SQLAlchemy
from funtion import main
import MySQLdb
import MySQLdb.cursors
from flask_cors import *

app = Flask(__name__)
app = Flask(__name__)
app.secret_key = 'dffdffdsdsf'
app.debug = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///./db/user.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['SQLALCHEMY_ECHO'] = True  
db = SQLAlchemy(app)
login_manager = LoginManager(app)
login_manager.login_view = "login"  
login_manager.session_protection = "strong"
login_manager.login_message = "Please login to access this page."
login_manager.login_message_category = "info"


CORS(app, supports_credentials=True)
@login_manager.user_loader
def load_user(user_id):
    from models import User
    return User.query.get(int(user_id))



@app.route('/sql_agreen',methods=['GET','POST'])
def sql_agreen():
    key_1 = request.args.get('id')
#    key_1 = int(key)
    key_1 = key_1.encode('utf-8')
    conn = main.accept()
    cursor = conn.cursor()
    cursor.execute('update jenkins.a set status=1 where id=%s'%key_1)
    conn.commit()
    return key_1
@app.route('/sql_refuse',methods=['GET','POST'])
def sql_refuse():
    key_1 = request.args.get('id')
    key_1 = key_1.encode('utf-8')
    conn = main.accept()
    cursor = conn.cursor()
    cursor.execute('update jenkins.a set status=2 where id=%s'%key_1)
    conn.commit()
    return key_1
@app.route('/sql_remove',methods=['GET','POST'])
def sql_remove():
    key_1 = request.args.get('id')
    key_1 = key_1.encode('utf-8')
#    key_1 = int(key_1)
    conn = main.accept()
    cursor = conn.cursor()
    cursor.execute('delete from jenkins.a where id=%s'%key_1)
    conn.commit()
    return key_1
@app.route('/sql_build',methods=['GET','POST'])
def sql_build():
    key_1 = request.args.get('id')
    key_1 = key_1.encode('utf-8')
    conn = main.accept()
    cursor = conn.cursor()
    cursor.execute('update jenkins.a set status=3 where id=%s'%key_1)
    conn.commit()
    return key_1
@app.route('/get-sql')
def get_sql():
    conn = main.accept()
    cursor = conn.cursor()
    data = cursor.execute('select id,project,program,status from a ORDER BY id desc')
    result = cursor.fetchall()
    return json.dumps(result)


@app.route('/build-server',methods=['GET','POST'])
def build_server():
    name = request.args.get('name')
    name = name.encode('utf-8')
    main.build_server(name)
    return '<h1>服务器构建成功 %s</h1>'%name

@app.route('/bulid-test',methods=['GET','POST'])
def bulid_test():
    name = request.args.get('name')
    name = name.encode('utf-8')
    main.server_bulid(name)
    return '<h1>构建成功 %s</h1>'%name

@app.route('/js')
def js():
    with open('js/jquery2.0.js') as f:
        f = f.read()
    return f
@app.route('/')
def index():
    with open('html/Submit.html') as f:
        f = f.read()
    return f
@app.route('/build')
@login_required
def build():
    with open('html/Build.html') as b:
        b = b.read()
    return b
@app.route('/agreen')
@login_required
def agreen():
    with open('html/Agree.html') as c:
        c = c.read()
    return c
@app.route('/see')
def see():
    with open('html/see.html') as c:
        c = c.read()
    return c


@app.route('/css')
def css():
    with open('js/css.css') as c:
        c = c.read()
    return c
@app.route('/tijiaoqueren',methods=['GET','POST'])
def tiaojianqueren():
    name = request.args.get('name')
    age = request.args.get('age')
    name = name.encode('utf-8')
    age = age.encode('utf-8')
    conn = main.accept()
    cursor = conn.cursor()
    cursor.execute('INSERT INTO jenkins.a (`project`, `program`) VALUES(\'%s\',\'%s\')'%(name,age))
    conn.commit()
    return '<h1>提交成功</h1>'
@app.route('/login/', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    # if form.validate_on_submit():  # 需要验证才能用，如果后台没有写验证这里不能这样写
    if request.method == 'POST':
        user = models.User.query.filter_by(username=form.username.data).first()
        if user is not None and user.verify_password(form.password.data):
            login_user(user,form.remember_me.data)
            return redirect(url_for('index'))
        return '用户名或密码错误！'
    return render_template('login.html', form=form)


@app.route('/reg/', methods=['GET', 'POST'])
def reg():
    form = RegistrationForm()
    if request.method == 'POST':
        form = RegistrationForm(request.form)
        user = models.User(form.username.data, form.password.data)
        db.session.add(user)
        db.session.commit()
        return '注册成功！'
    return render_template('reg.html', form=form)


@app.route('/logout/')
@login_required
def logout():
    logout_user()  # 重新调用删除重新设置的用户
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=80,debug=True)
