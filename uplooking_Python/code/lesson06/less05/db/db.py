#!/usr/bin/env python
# -*- coding: utf-8 -*-

from conf.config import DB_HOST, DB_PORT, DB_USER, DB_NAME, DB_PASSWD, DB_CONNECT_TIMEOUT, DB_CHARSET
from conf.config import TIMEOUT_TIMES
from errors.error import HttpError, DBError

import MySQLdb

class DB(object):

    def __init__(self):
        self.conn = None

    def _get_conn(self):
        #返回一个连接
        try:
            conn = MySQLdb.connect(
                    host=DB_HOST,
                    port=DB_PORT,
                    db=DB_NAME,
                    user= DB_USER,
                    passwd=DB_PASSWD,
                    connect_timeout=DB_CONNECT_TIMEOUT,
                    charset=DB_CHARSET
                    )
            conn.autocommit(True)
        except Exception, e:
            print "数据连接异常:%s"%e

        self.conn = conn
        return self.conn


    def retry(self):
        cursor = None
        for i in range(TIMEOUT_TIMES):
            self._get_conn()
            if self.conn:
                return self.conn.cursor()
            time.sleep(1)
        print "超时拉"
        return cursor

    def execute(self, sql, *args):
        cursor = self.retry()
        cursor.execute(sql, args)
        return cursor

    def query_all(self, *args):
        cur = self.execute(*args)
        result = cur.fetchall()
        cur and cur.close()
        return result



class MasterDB(DB):
    def __init__(self):
        pass

    def update(self, *args):
        cursor = self.execute(*args)
        cursor and cursor.close()
        return cursor.rowcount

    def insert(self, *args):
        cursor = self.execute(*args)
        cursor and cursor.close()
        return cursor.lastrowid

    def delete(self, *args):
        cursor = self.execute(*args)
        cursor and cursor.close()
        return cursor.rowcount

