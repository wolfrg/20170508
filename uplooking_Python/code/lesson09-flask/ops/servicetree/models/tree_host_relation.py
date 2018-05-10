# coding: utf-8
from libs.db import db

class TagsHostRelation(object):
    TABLE = "map_device"

    @classmethod
    def bind(cls, tagId, hostId):
        sql = "insert into %s (tree_id,device_id) values(%%s, %%s)" % (cls.TABLE)
        lastId = db.insert(sql, tagId, hostId)

        return lastId

    @classmethod
    def getHostsIds(cls, tagId):
        sql = "select device_id from %s where tree_id=%%s"%(cls.TABLE)
        ids = db.query_all(sql, tagId)
        return tuple([i[0] for i in ids])

    @classmethod
    def getTreeIdByDeviceId(cls, hostId):
        sql = "select tree_id from %s where device_id=%%s"%cls.TABLE
        result = db.query_all(sql, hostId)
        treeIds = []
        for tree_id in result:
            treeIds.append(tree_id[0])
        print treeIds
        return treeIds

