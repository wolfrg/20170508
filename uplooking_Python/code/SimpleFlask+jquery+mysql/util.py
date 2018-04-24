#!/usr/bin/python
import MySQLdb as mysql
# from config import ST,DB_PORT,DB_USER,DB_PASSWD,DB_DBNAME,DB_CHARSET
# db = MySQLdb.connect("localhost", "root", "123321", "python01",charset='utf8')

ST = "localhost"
DB_PORT = "3306"
DB_USER = "root"
DB_PASSWD = "123321"
DB_DBNAME = "python01"
DB_CHARSET = "charset='utf8'"




sql_all = 'select * from user'
sql_login = 'select * from user where (username="%s") and (password="%s")'
sql_delete = 'delete from user where username="%s"'
sql_adduser = 'insert into user values ("%s","%s")'
sql_updatepw = 'update user set password="%s" where username="%s"'
sql_getpw = 'select password from user where username="%s"'


def app_index():
    con = mysql.connect(host=ST,port=DB_PORT,user=DB_USER,passwd=DB_PASSWD,db=DB_DBNAME,charset=DB_CHARSET)
    con.autocommit(True)
    cur =con.cursor()
    cur.execute(sql_all)
    res = cur.fetchall()
    cur.close()
    con.close()
    return res

def app_login(username,passwd):
    con = mysql.connect(host=ST,port=DB_PORT,user=DB_USER,passwd=DB_PASSWD,db=DB_DBNAME,charset=DB_CHARSET)
    con.autocommit(True)
    cur =con.cursor()
    cur.execute(sql_login%(username,passwd))
    res = cur.fetchone()
    cur.close()
    con.close()
    return res

def app_delete(username):
    con = mysql.connect(host=ST,port=DB_PORT,user=DB_USER,passwd=DB_PASSWD,db=DB_DBNAME,charset=DB_CHARSET)
    con.autocommit(True)
    cur =con.cursor()
    cur.execute(sql_delete%(username))
    res = cur.fetchone()
    cur.close()
    con.close()

def app_adduser(username,passwd):
    con = mysql.connect(host=ST,port=DB_PORT,user=DB_USER,passwd=DB_PASSWD,db=DB_DBNAME,charset=DB_CHARSET)
    con.autocommit(True)
    cur =con.cursor()
    cur.execute(sql_adduser%(username,passwd))
    res = cur.fetchone()
    cur.close()
    con.close()

def app_updatepw(passwd,username):
    con = mysql.connect(host=ST,port=DB_PORT,user=DB_USER,passwd=DB_PASSWD,db=DB_DBNAME,charset=DB_CHARSET)
    con.autocommit(True)
    cur =con.cursor()
    cur.execute(sql_updatepw%(passwd,username))
    res = cur.fetchone()
    cur.close()
    con.close()

def app_getpw(username):
    con = mysql.connect(host=ST,port=DB_PORT,user=DB_USER,passwd=DB_PASSWD,db=DB_DBNAME,charset=DB_CHARSET)
    con.autocommit(True)
    cur =con.cursor()
    cur.execute(sql_getpw%(username))
    res = cur.fetchone()
    cur.close()
    con.close()
    return res