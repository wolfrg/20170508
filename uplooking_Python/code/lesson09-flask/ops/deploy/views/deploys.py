from flask import render_template
from deploy import blue_print

@blue_print.route("/index", methods=["GET"])
def index():
    return render_template("deploy.html")
