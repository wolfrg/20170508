from flask import Flask
from flask import make_response
from flask import redirect
from flask import g 
from flask import request
from b import print_username


app = Flask(__name__)


@app.route("/index/<name>")
def login(name):
    username = name
    resp = "hello %s" %(username)
    return make_response(resp)


@app.route('/hello')
def hello():
    return redirect('http://baidu.com')

@app.before_request
def login():
    username = request.form.get("username")
    password = request.form.get("password")

    g.user = username
    g.password = password


@app.route("/index",methods=["POST"])
def index():
    print_username()
    resp = "hello %s,your password is :%s" %(g.user,g.password)
    return make_response(resp)

if __name__ == "__main__":
    app.run(debug=True)    