from servicetree import blue_print
from flask import render_template
from flask import request
from servicetree.controller import *

@blue_print.route("/index", methods=["GET"])
def index():
    return render_template("serviceTree.html")

@blue_print.route("/all", methods=["GET"])
def get_trees():
    trees = Tree.get_all()
    return trees

@blue_print.route("/node/add", methods=["POST"])
def add_node():
    pid = request.form.get("pid")
    nodeName = request.form.get("nodeName")
    cname = request.form.get("cname")
    Tree.add_node(pid, nodeName, cname)
    return "sucess"


