#coding:utf8

from flask import Flask,request,render_template
import MySQLdb
from flask import jsonify
import json

app = Flask(__name__)

@app.route('/')
def index():
	return render_template('index.html')



if __name__=='__main__':
	app.run(host='127.0.0.1',port=5002,debug=True)

