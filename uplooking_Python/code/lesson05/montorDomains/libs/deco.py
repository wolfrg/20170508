#!/usr/bin/env python
# -*- coding: utf-8 -*-
from logger.logger import app_logger
from functools import wraps

def recordLog(func):
    def wapper(*args, **kwargs):
        app_logger.info("[%s started][param:%s]"%(wraps.func_name, args))
        return func(*args, **kwargs)
    return wapper
