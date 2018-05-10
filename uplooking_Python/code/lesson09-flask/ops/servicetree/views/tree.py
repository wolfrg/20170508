from servicetree import blue_print
from flask import render_template
from flask import request
from servicetree.controller import *
import json

@blue_print.route("/index", methods=["GET"])
def index():
    return render_template("serviceTree.html")

@blue_print.route("/all", methods=["GET"])
def getTrees():
    trees = Tree.get_all()
    return trees

@blue_print.route("/all_map", methods=["GET"])
def getTagHosts():

    return

@blue_print.route("/node/add", methods=["POST"])
def addNode():
    pid = request.form.get("pid")
    nodeName = request.form.get("nodeName")
    cname = request.form.get("cname")
    # node_type = request.form.get("nodeType")
    # print node_type
    Tree.add_node(int(pid), nodeName, cname)
    return json.dumps([{"code":0,"message":"sucess"}])

@blue_print.route("/query/<tagId>/hosts", methods=["GET"])
def getHostsByTagId(tagId):
    hosts = Tree.getHostsByTagId(tagId)
    return json.dumps(hosts)


