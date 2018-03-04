#!/usr/bin/env python
# -*- coding: utf-8 -*-

class Test(object):
    Name = None
    instance = None
    def __init__(self, age):
        self.age = age
        self.name = None

    def __new__(cls, *args, **kwargs):
        if not cls.instance:
            cls.instance = super(Test, cls).__new__(cls, *args, **kwargs)
        return cls.instance

    def set_age(self, age):
        self.age = age

    def get_age(self):
        print self.age

    def set_name(self, name):
        self.name = name

    def get_name(self):
        return self.name

t1 = Test(18)
t2 = Test(30)
t1.set_name("bigv")
print t2.get_name()
