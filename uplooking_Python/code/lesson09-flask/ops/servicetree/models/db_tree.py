# -*- coding: utf-8 -*-
from libs.db import MasterDB

TABLE = "map_tree"
COLUMN = "id,name,cname,node_type,pid"

db = MasterDB()

class MapTree(object):
    @classmethod
    def get_all(cls):
        items = []
        sql = "select %s from %s" % (COLUMN, TABLE)
        result = db.query_all(sql)
        if result:
            items = [dict((value, i[index]) for index, value in enumerate(COLUMN.split(","))) for i in result]
        return items

    @classmethod
    def get_item_byPid(cls, pid):
        sql = "select %s from %s where id=%%s" % (COLUMN, TABLE)
        result = db.query_all(sql, pid)
        if result:
            return [dict((value, i[index]) for index, value in enumerate(COLUMN.split(","))) for i in result]

        raise("服务器内部错误，未获取到对应的父节点")

    @classmethod
    def add_node(cls, pid, nodeName, cname, node_type):
        sql = "insert into %s(name, cname, node_type, pid) values(%%s, %%s, %%s, %%s)"%TABLE
        print "sql:", sql
        result = db.insert(sql, nodeName, cname, node_type, pid)
        print "result:", result


