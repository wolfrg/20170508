# coding: utf-8
from libs.db import db

class TagsHostRelation(object):
    TABLE = "map_device"

    @classmethod
    def bind(cls, tagId, hostId):
        sql = "insert into %s (tree_id,device_id) values(%%s, %%s)" % (cls.TABLE)
        lastId = db.insert(sql, tagId, hostId)

        return lastId
