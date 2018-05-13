#coding:utf8
from flask import Flask, request, render_template,make_response
import MySQLdb
from flask import jsonify
import json

db = MySQLdb.connect("localhost", "root", "123321", "python01",charset='utf8')

app = Flask(__name__)

# index views
@app.route('/')
def show_index():
    return render_template('index.t.html')

#get right user info table api
@app.route('/getUserInfo',methods=['GET'])    
def show_table():
    cursor = db.cursor()
    sql = "SELECT * FROM user_ip_info"
    cursor.execute(sql)
    row_headers=[x[0] for x in cursor.description]
    results = cursor.fetchall()
    
    data=[]
    for result in results:
        data.append(dict(zip(row_headers,result)))
        # print data
    return json.dumps(data) 


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





#add data api
@app.route('/addUserInfo',methods=['POST'])
def insert_sql():
    
    cursor = db.cursor()

    id = request.form.get('id')
    username = request.form.get('username')
    position = request.form.get('position')
    ipaddr = request.form.get('ipaddr')
    remark = request.form.get('remark')

    sql = "insert into user_ip_info (id,username,position,ipaddr,remark) values (%s,%s,%s,%s,%s)"
    params = (id,username,position,ipaddr,remark)
    result = cursor.execute(sql,params)
    db.commit()
    return  jsonify(result)


#edit user info api
@app.route('/edit_update',methods=['POST'])
def edit_update():

    cursor = db.cursor()

    id = request.form.get('id')
    username = request.form.get('username')
    position = request.form.get('position')
    ipaddr = request.form.get('ipaddr')
    remark = request.form.get('remark')

           #UPDATE user_ip_info SET username=1, position=1, ipaddr=1, remark=1 WHERE id=2
    sql = "UPDATE user_ip_info SET username='%s', position='%s', ipaddr='%s', remark='%s' WHERE id=%s " % (username,position,ipaddr,remark,id)
    #sql = "update user_ip_info set username=%s,position=%s,ipaddr=%s,remark=%s where id=%s " % (username,position,ipaddr,remark,id)
    #params = (username,position,ipaddr,remark,id)

    result = cursor.execute(sql)
    db.commit()
    return jsonify(result)
    

# rename tree node api
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

@app.route('/delete',methods=['POST'])
def deleteUserInfo():
    cursor = db.cursor()

    id = request.form.get('id')
    sql = "delete from user_ip_info where id= %s"
    params = id
    result = cursor.execute(sql,params)
    # cursor.execute(sql)
    db.commit()
    return '将要删除这行数据'


# @app.route('/ajax.html',methods=['GET','POST'])
# def myajax():
#     return render_template('ajax.html')
#     #pass

@app.route('/mindex')
def  show_modal():
    return render_template('m.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=5001,debug=True)
