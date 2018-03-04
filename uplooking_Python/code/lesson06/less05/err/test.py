#!/usr/bin/env python
# -*- coding: utf-8 -*-

from error import DBError


def test():
    try:
        int("aaaaa")
    except Exception, e: 
        raise DBError("500", "%s to %s 类型转换失败"%("str", "int"))

def main():
    try:
        test()
    except DBError, e:
        print e.code, e.message

if __name__ == "__main__":
    main()
