# coding: utf-8
import json
from libs.db import db

class HostHandleModle(object):

    TABLE = "tb_device"
    COLUMN = "id,hostname,host_type,ip,location"
    def __init__(self):
        pass

    @classmethod
    def host_add(cls, *args):
        '''
        :param args: 主机信息
        :return: bool 成功|失败

        '''

        add_sql = "insert into %s (hostname,host_type,ip,location) values(%%s, %%s, %%s, %%s)"%(cls.TABLE)
        lastId = db.insert(add_sql, *args)
        if lastId > 0:
            return True
        return False



    @classmethod
    def queryIdByHostname(cls, hostname):
        sql = "select id from %s where hostname=%%s"%(cls.TABLE)
        hostIdResult = db.query_id(sql, hostname)
        if len(hostIdResult) > 0:
            return hostIdResult[0]
        else:
            return 0

    @classmethod
    def getHostsByPage(cls, page, host_type):
        pageNum = page
        if isinstance(page, unicode):
            pageNum = int(page)
        pageSize = 3
        start = (pageNum -1)*pageSize
        sql = "select %s from %s where host_type=%%s limit %%s,%%s"%(cls.COLUMN, cls.TABLE)
        hosts = db.query_all(sql, host_type, start, pageSize)
        return [dict((value, i[index]) for index, value in enumerate(cls.COLUMN.split(","))) for i in hosts]






