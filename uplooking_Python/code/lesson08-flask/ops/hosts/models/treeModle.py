# coding: utf-8
from libs.db import db

class TreeHandle(object):
    TABLE = "map_tree"
    COLUMN = "id,name,cname,node_type,pid"

    @classmethod
    def query_node_id(cls, node_type, name):

        sql = "select id from %s where name=%%s and node_type=%%s" % (cls.TABLE)
        node_id = db.query_all(sql, name, node_type)
        if len(node_id) > 0:
            return node_id[0][0]
        else:
            return 0
    @classmethod
    def queryTagIdByPidAndNameAndType(cls, node_type, name, pid):
        sql = "select id from %s where name=%%s and node_type=%%s and pid=%%s" %(cls.TABLE)
        node_id = db.query_all(sql, name, node_type, pid)
        if len(node_id) >0:
            return node_id[0][0]
        else:
            return 0
