#coding:utf8
from flask import Flask, request, render_template
import MySQLdb

db = MySQLdb.connect("localhost", "root", "123321", "python01",charset='utf8')
app = Flask(__name__)

@app.route('/')
def query_all():
    cursor = db.cursor()
    sql = "SELECT * FROM user_ip_info"
    cursor.execute(sql)
    results = cursor.fetchall()
    return render_template('index.html', results=results)


@app.route('/delete',methods=['GET','POST'])
def update_sql():
    cursor = db.cursor()
    sql = "delete from user_ip_info where id=2"
    cursor.execute(sql)
    db.commit()
    return '将要删除这行数据'

@app.route('/insert',methods=['GET','POST'])
def insert_sql():
    cursor = db.cursor()
    sql = "insert into user_ip_info (id,username,position,ipaddr,remark) values (7,'王超','前锋','192.168.0.7','足球')"
    cursor.execute(sql)
    db.commit()
    return '插入一行数据'

@app.route('/ajax.html',methods=['GET','POST'])
def myajax():
    return render_template('ajax.html')
    #pass
    
if __name__ == '__main__':
    app.run(debug=True)
