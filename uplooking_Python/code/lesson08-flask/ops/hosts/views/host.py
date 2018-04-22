# coding: utf-8
import json
from flask import render_template
from flask import request
from hosts import blue_print
from flask import make_response
from hosts.controller import hostHandleController as hc

@blue_print.route("/index", methods=["GET"])
def index():
    return render_template("hosts.html")

@blue_print.route("/all", methods=["GET"])
def get_hosts():
   
    hosts = [{"hostname":"tj1-nginx01.kscn", "host_type": "vm", "ip": "1.1.1.1", "location":"beijing"}, {"hostname":"tj1-nginx02.kscn", "host_type": "vm", "ip": "1.1.1.1", "location":"beijing"}]
    return make_response(json.dumps({"code":"200","data": hosts}), 200)

@blue_print.route("/test/params", methods=["POST"])
def test_params():
    # hostname = request.args.get("hostname")
    # hostname = request.form["hostname"]
    hostname = request.get_json()
    print type(hostname)
    # print type(h)
    return "sucess"

@blue_print.route("/add", methods=["POST"])
def host_add():
    # 获取请求参数 request.args从url中获取参数
    # hostnames = request.args.get("hostnames")
    # print "Hostnames is [{}]".format(hostnames)

    # 获取表单
    # ip = request.form["ip"]
    # system = request.form["system"]
    # print "Ip is {ip}. system is {sys}".format(ip=ip, sys=system)

    #获取json数据
    # json_data = request.get_json()
    # print "json_data:", json_data

    # 获取添加的主机
    hostname = request.form["hostname"]
    host_type = request.form["type"]
    ip = request.form["ip"]
    location = request.form["location"]

    # 抛给主机管理的model
    addResult = hc.HostHandle.host_add(hostname, host_type, ip, location)
    if addResult:
        return "资产添加成功！"
    return "资产添加失败!"

@blue_print.route("/bind", methods=["POST"])
def host_bind():

    # hostnames = request.form["hostnames"]
    # tagstring = request.form["tagstring"]
    # bindInfo = hc.HostHandle.host_bind(hostnames.split(","), tagstring)
    # bind_result = [{"code":200, "data":[{"tj1-nginx01.kscn":"sucess"}]}]
    # return json.dumps(bind_result)
    # return json.dumps(bindInfo)
    raise("aaa")
    return "sucess"
