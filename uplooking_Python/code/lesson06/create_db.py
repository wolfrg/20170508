#coding:utf8

#创建数据库和表

import MySQLdb

conn = MySQLdb.connect(
    host='127.0.0.1',
    port=3306,
    user='root',
    passwd="123321",
    db='test',
    connect_timeout=10,
    charset='utf8'


)

conn.autocommit(True)

cur = conn.cursor()

#cur.execute("create databases test")
cur.execute("use test; create table frg (id int,username varchar(10))")
cur.close()
conn.commit()
