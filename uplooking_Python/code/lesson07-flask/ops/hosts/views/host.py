# coding: utf-8
from flask import render_template
from hosts import blue_print

@blue_print.route("/index", methods=["GET"])
def index():
    return render_template("hosts.html")
