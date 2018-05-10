from flask import render_template
from domains import blue_print

@blue_print.route("/index", methods=["GET"])
def index():
    return render_template("domain.html")
