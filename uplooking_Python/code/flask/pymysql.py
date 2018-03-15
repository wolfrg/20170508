from flask import Flask, request, render_template
import MySQLdb

db = MySQLdb.connect("localhost", "root", "123321", "python01")
app = Flask(__name__)

@app.route('/')
def someName():
    cursor = db.cursor()
    sql = "SELECT * FROM user_ip_info"
    cursor.execute(sql)
    results = cursor.fetchall()
    return render_template('index.html', results=results)

if __name__ == '__main__':
    app.run(debug=True)
