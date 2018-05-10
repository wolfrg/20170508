# -*- coding: utf-8 -*-
from libs.db import db

class Hosts(object):
    TABLE = "tb_device"
    COLUMN = "id,hostname,host_type,ip,location"

    @classmethod
    def getHostsByIds(cls, hostids):
        print hostids
        sql = "select hostname from %s where id in %%s"%(cls.TABLE)
        hosts = db.query_all(sql, hostids)
        return [host[0] for host in hosts]

    @classmethod
    def getHostIdByHostname(cls, hostname):
        sql = "select id from %s where hostname=%%s"%(cls.TABLE)
        hostId = db.query_all(sql, hostname)
        return hostId

