#!/usr/bin/env python
# -*- coding: utf-8 -*-


class MyException(Exception):
    pass

class HttpError(MyException):
    def __init__(self, code, message):
        self.code = code
        self.message = message

class DBError(MyException):
    def __init__(self, code, message):
        self.code = code
        self.message = message
