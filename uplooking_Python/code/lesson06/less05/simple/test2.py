#!/usr/bin/env python
# -*- coding: utf-8 -*-

class T(object):

    _instance = None

    def __init__(self, name):
        self.name = name

    def __new__(cls, *args, **kwarg):
        if not cls._instance:
            cls._instance = super(T, cls).__new__(cls, *args, **kwarg)
        return cls._instance

    def set_name(self, name):
        self.name = name

    def get_name(self):
        print self.name


t1 = T("bigv")
t2 = T("xiaoqiang")







