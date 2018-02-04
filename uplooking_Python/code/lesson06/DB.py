#coding:utf8
#封装DB操作

import MySQLdb

class DB(object):

    def __init__(self):
        self.conn = None

    def _get_conn(self):
        conn = MySQLdb.connect(
            host = '127.0.0.1',
            port = 3306,
            user = 'root',
            passwd = '123456',
            db = 'python_test',
            connect_timeout = 10,
            charset = 'utf8'
        )
        self.conn = conn
        return conn

    def _get_cur(self):
        conn = self._get_conn()
        conn.autocommit(True)
        cur = conn.cursor()
        #print cur
        return cur


    def _get_execute(self,sql):

        cur = self._get_cur()
        cur.execute(sql)
        return cur


    def _get_fetchall(self,sql):

        cur1 = self._get_execute(sql)
        result = cur1.fetchall()
        #print result
        return result


class HANDELDB(DB):

    def __init__(self):
        pass


    def insert(self,sql):
        result = self._get_execute(insert_sql)


    def update(self):
        pass

    def delete(self):
        pass

    def select(self,select_sql):
        result = self._get_fetchall(select_sql)
        return result


if __name__ == '__main__':
    use_db = HANDELDB()
    insert_sql = "insert into frg values(4,'zjq')"
    select_sql =  'select * from  python_test.frg'

    select = use_db.select(select_sql)
    use_db.insert(insert_sql)
    print select
