#coding:utf8
from flask import Flask, request, render_template
import MySQLdb
import json

db = MySQLdb.connect("localhost", "root", "123321", "python01",charset='utf8')

app = Flask(__name__)

# index views
@app.route('/')
def show_index():
    # cursor = db.cursor()
    # sql = "SELECT * FROM user_ip_info"
    # cursor.execute(sql)
    # results = cursor.fetchall()
    return render_template('index.t.html')


# @app.route('/tree')
# def tree_views():
#     cursor = db.cursor()
#     sql = "SELECT * FROM map_tree"
#     cursor.execute(sql)
#     results = cursor.fetchall()
#     return render_template('index.t.html',results=results)

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

#get right table api
@app.route('/right-table',methods=['GET','POST'])    
def show_table():
    cursor = db.cursor()
    sql = "SELECT * FROM user_ip_info"
    cursor.execute(sql)
    row_headers=[x[0] for x in cursor.description]
    results = cursor.fetchall()
    
    # return json.dumps(results)

    data=[]
    for result in results:
        data.append(dict(zip(row_headers,result)))
    return json.dumps(data) 

 
    # data = []
    # content = {}
    # for result in results:
    #     content = {'id':result[0],'username':result[1],'position':result[2],'ipaddr':result[3],'remark':result[4]}
    #     data.append(content)
    #     content = {}
    # return json.dumps(data)    
    

#get left tree table api
@app.route('/tree/all',methods=['GET','POST'])
def get_tree_all():
    cursor = db.cursor()
    sql = "SELECT * FROM map_tree"
    cursor.execute(sql)
    row_headers = [x[0] for x in cursor.description]
    results = cursor.fetchall()

    data = []
    for result in results:
        data.append(dict(zip(row_headers,result)))
    return json.dumps(data)    

# rename tree node 
@app.route('/node/rename',methods=["POST"])
def rename_node(name,id):
    id = request.form.get('id')
    name = request.form.get('name')

    sql = 'update map_server set name=%s where id=%s'
    params = (id,name)

    cursor = db.cursor()
    results = cursor.execute(sql,params)
    cursor.commit()
    cursor.close()
    db.close()

    return results



if __name__ == '__main__':
    app.run(debug=True)
