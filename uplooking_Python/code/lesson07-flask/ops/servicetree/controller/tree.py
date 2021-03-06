# -*- coding: utf-8 -*-
#!/usr/bin/env python
############################
#Author: BigV Yang         #
#Data: 2018/03/30          #
############################
import json
from servicetree.models import *
from config.development import NODE_TYPE

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
            raise("服务器内部错误， 未获取到对应父节点")

        node_type = pNode[0]["node_type"]
        MapTree.add_node(pid, nodeName, cname)





