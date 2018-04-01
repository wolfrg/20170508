# -*- coding: utf-8 -*-
import sys, traceback
from flask import make_response

def error_handler(error):
    if isinstance(error, Error):
        return make_response(error.message, error.code)
    else:
        exc_type, exc_value, exc_msg = sys.exc_info()
        exc_info = traceback.format_exception(exc_type, exc_value, exc_msg)
        return make_response(exc_info, 500)


class Error(Exception):
    code = 500
    message = ""
    def __init__(self, message):
        self.code = 500
        self.message = message

class DBError(Error):
    def __init__(self, message = "数据库错误"):
        self.message = message

class HTTPError(Error):
    def __init__(self, message = "http请求错误"):
        self.message = message

