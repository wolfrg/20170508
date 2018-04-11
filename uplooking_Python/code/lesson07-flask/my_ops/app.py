from flask import Flask,render_template
from domains import blue_print as domains_bp

import MySQLdb
import json

db = MySQLdb.connect("localhost", "root", "123321", "python01",charset='utf8')

app = Flask(__name__)


app.register_blueprint(domains_bp,url_prefix='/domains')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/tree/all')
def get_tree_all():
    pass
    
# @app.route('/domians')
# def 
if  __name__=="__main__":
    app.run(host='0.0.0.0',port=8888,debug=True)    