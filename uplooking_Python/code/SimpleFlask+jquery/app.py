#coding:utf8

from flask import Flask,render_template,request
from flask import jsonify
import json

app = Flask(__name__)



@app.route('/')
def index():
    return render_template('index.html')

@app.route('/modal')
def modal_list():
	return render_template('modal.html')

@app.route('/mystring')
def mystring():
	return "This is my string."



	

if __name__=='__main__':
    app.run(host='0.0.0.0',port=5001,debug=True)