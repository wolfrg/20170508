#!/usr/bin/env python
# -*- coding: utf-8 -*-

from db import MasterDB
db = MasterDB()

def  query_all_test():
    # 测试select
    sql = "select * from test"
    result = db.query_all(sql)
    column = ["id", "name"]
    parsed_result = [dict( (value, line[index]) for index, value in enumerate(column) ) for line in result]
    return parsed_result

def update_test():
    # 测试update
    table = "test"
    name = "xxxx"
    id_ = 5
    sql = "update %s set name=%%s where id=%%s"%table
    print db.update(sql, name, id_)


def insert_test():
    # 测试insert
    column = "id, name"
    table = "test"
    name = "xxxx"
    sql = "insert into test values(%s, %s)"
    db.insert(sql, 5, name)

if __name__ == "__main__":
    print insert_test()
