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
    page = request.args.get("page")
    host_type = request.args.get("host_type")
    # 获取主机
    hosts = hc.HostHandle.getHostsByPage(page, host_type)
    #hosts = [{"hostname":"tj1-nginx01.kscn", "host_type": "vm", "ip": "1.1.1.1", "location":"beijing"}, {"hostname":"tj1-nginx02.kscn", "host_type": "vm", "ip": "1.1.1.1", "location":"beijing"}]
    result = {
        "code":200,
        "data": hosts
    }
    return make_response(json.dumps(result))


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
    addResult = hc.HostHandle.host_add(hostname, host_type, ip, location)
    if addResult:
        return "资产添加成功！"
    return "资产添加失败!"

@blue_print.route("/bind", methods=["POST"])
def host_bind():

    hostnames = request.form["hostname"]
    node = request.form["node"]
    bindInfo = hc.HostHandle.host_bind(hostnames.split(","), node)
    result = {
        "code":0,
        "data":bindInfo
    }
    return json.dumps(result)
