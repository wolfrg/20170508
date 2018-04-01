from domains import blue_print
from flask import render_template

@blue_print.route('/index',methods=["GET"])
def index():
    return render_template('domain.html')