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

# @app.route('insert',methods=['GET','POST'])
#     pass

if __name__ == '__main__':
    app.run(debug=True)
