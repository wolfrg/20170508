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
    sql = "SELECT * FROM user_ip_info ORDER BY id ASC limit 10"
    cursor.execute(sql)
    row_headers=[x[0] for x in cursor.description]
    results = cursor.fetchall()
    
    data=[]
    for result in results:
        data.append(dict(zip(row_headers,result)))
        # print data
    return json.dumps(data)
    db.close()

@app.route('/get_nHostInfo',methods=['GET'])
def show_nhost():
    cursor = db.cursor()
    sql = "SELECT * FROM n_hosts ORDER BY id ASC LIMIT 10"
    cursor.execute(sql)
    row_headers=[x[0] for x in cursor.description]
    results = cursor.fetchall()

    data = []

    for result in results:
        data.append(dict(zip(row_headers,result)))
    return json.dumps(data)
    db.close()


@app.route('/get_wHostInfo',methods=['GET'])
def show_whost():
    cursor = db.cursor()
    sql = "SELECT * FROM w_hosts ORDER BY id ASC LIMIT 10"
    cursor.execute(sql)
    row_headers=[x[0] for x in cursor.description]
    results = cursor.fetchall()

    data = []

    for result in results:
        data.append(dict(zip(row_headers,result)))
    return json.dumps(data)
    db.close()

#add data api
@app.route('/addUserInfo',methods=['POST'])
def insert_sql():
    
    cursor = db.cursor()

    id = request.form.get('id')
    username = request.form.get('username')
    position = request.form.get('position')
    ipaddr = request.form.get('ipaddr')
    remark = request.form.get('remark')

    # sql = "insert into user_ip_info (id,username,position,ipaddr,remark) values (%s,%s,%s,%s,%s)"
    sql = "insert into user_ip_info values  (%s,%s,%s,%s,%s)"
    params = (id,username,position,ipaddr,remark)
    result = cursor.execute(sql,params)
    db.commit()
    return  jsonify(result)

    db.close()


#edit user info api
@app.route('/edit_update',methods=['POST'])
def edit_update():

    cursor = db.cursor()

    id = request.form.get('id')
    username = request.form.get('username')
    position = request.form.get('position')
    ipaddr = request.form.get('ipaddr')
    remark = request.form.get('remark')

    sql = "UPDATE user_ip_info SET username='%s', position='%s', ipaddr='%s', remark='%s' WHERE id=%s" % (username,position,ipaddr,remark,id)   

    result = cursor.execute(sql)
    db.commit()
    return jsonify(result)
    db.close()
    

@app.route('/delete',methods=['POST'])
def deleteUserInfo():
    cursor = db.cursor()

    uid = request.form.get('id')
    
    uid = int(uid)
    sql = "delete from user_ip_info where id='%d'" % uid
    # params = uid
    # print params
    # print sql
    result = cursor.execute(sql)
    db.commit()
    return 'result'
    db.close()

@app.route('/search',methods=['GET'])
def search():

    #如果想做任意字段的查询，就做一个判断
    
    cursor = db.cursor()
    username = request.args.get('username')
    print username
    sql = "select * from user_ip_info where username LIKE '%s'" % username
    # sql = "select * from user_ip_info where username like '冯瑞钢'"

    cursor.execute(sql)
    row_headers=[x[0] for x in cursor.description]
    results = cursor.fetchall()
    print results
    data=[]
    for result in results:
        data.append(dict(zip(row_headers,result)))
    print data
    return json.dumps(data)

    db.close()

# @app.route('/ajax.html',methods=['GET','POST'])
# def myajax():
#     return render_template('ajax.html')
#     #pass

@app.route('/host/nei')
def nHost():
    return render_template('nei_host.html')


@app.route('/host/wai')
def wHost():
    return render_template('wai_host.html')

@app.route('/mindex')
def  show_modal():
    return render_template('m.html')

@app.route('/test')
def test():
    return render_template('test.html')    

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=5001,debug=True)
