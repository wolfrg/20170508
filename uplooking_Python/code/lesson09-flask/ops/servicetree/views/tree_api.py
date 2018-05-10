# coding: utf-8
from servicetree import blue_print
from flask import request
from servicetree.controller.tree_api import HostApi
from servicetree.controller import *
import json

@blue_print.route("/hostname/tags", methods=["GET"])
def getNodesByHostname():
    hostname = request.args.get("hostname")
    tags = HostApi.getNodesByHostname(hostname)
    return json.dumps(tags)
