from flask import Flask, request, render_template
import MySQLdb

db = MySQLdb.connect("localhost", "root", "123456", "test1",charset='utf8')
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
    
    #return render('hello')
    #return render_template()
        

if __name__ == '__main__':
    app.run(debug=True)
