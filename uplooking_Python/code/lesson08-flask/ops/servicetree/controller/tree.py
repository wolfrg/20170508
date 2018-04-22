# -*- coding: utf-8 -*-
#!/usr/bin/env python
############################
#Author: BigV Yang         #
#Data: 2018/03/30          #
############################
import json
from servicetree.models import *
from config.development import NODE_TYPE
from libs.error import ParamError, ServerError

class Tree(object):

    @classmethod
    def get_all(self):
        # 获取树
        trees = MapTree.get_all()
        TreeStruct = {
            "message": "sucess",
            "code": 1,
            "data":{
                "agreement": trees
            }
        }

        return json.dumps(TreeStruct)

    @classmethod
    def add_node(cls, pid, nodeName, cname):
        # 添加节点
        pNode =  MapTree.get_item_byPid(pid)
        if len(pNode) != 1:
            raise(ServerError("服务器内部错误， 未获取到对应父节点"))

        pnode_type = pNode[0]["node_type"]
        node_type = get_nodeType(pnode_type)

        MapTree.add_node(pid, nodeName, cname, node_type)


def get_nodeType(pNodeType):
    len_node_type = len(NODE_TYPE)
    for index, value in enumerate(NODE_TYPE):
        if value == pNodeType:
            new_node_index = index + 1
            if new_node_index >= len_node_type:
                raise (ParamError("传入的tag有误请检查后重试！"))
            return NODE_TYPE[index+1]
    raise (ParamError("传入的tag有误请检查后重试！"))



