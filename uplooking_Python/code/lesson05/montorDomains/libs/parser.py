#!/usr/bin/env python
# -*- coding: utf-8 -*-
import re
from conf.config import register_reg, expire_reg
import datetime

class ParseTime(object):

    def __init__(self, timeStr):
        self.timeStr = timeStr

    def parse_time(self):
        parsed_funcs = [self.parsed_ymd, self.parsed_ymd2, self.parsed_dmyhms,
                self.parsed_dmy, self.parsed_dmy2, self.parsed_ymdhms]
        for func in parsed_funcs:
            t = func()
            if not t:
                continue
            return t
        raise Exception("Not Fount available parser for [%s]"%self.timeStr)

    def parsed_ymd(self):
        try:
            parsed_time = datetime.datetime.strptime(self.timeStr, "%Y-%m-%d")
        except Exception, e:
            return False
        return parsed_time

    def parsed_ymd2(self):
        try:
            parsed_time = datetime.datetime.strptime(self.timeStr, "%Y/%m/%d")
        except Exception, e:
            return False
        return parsed_time

    def parsed_dmy(self):
        try:
            parsed_time = datetime.datetime.strptime(self.timeStr, "%d/%m/%Y")
        except Exception, e:
            return False
        return parsed_time

    def parsed_dmy2(self):
        try:
            parsed_time = datetime.datetime.strptime(self.timeStr, "%d-%m-%Y")
        except Exception, e:
            return False
        return parsed_time

    def parsed_ymdhms(self):
        try:
            parsed_time = datetime.datetime.strptime(self.timeStr, "%Y-%m-%d %H:%M:%S")
        except Exception, e:
            return False
        return parsed_time

    def parsed_dmyhms(self):
        try:
            parsed_time = datetime.datetime.strptime(self.timeStr, "%d-%b-%Y %H:%M:%S")
        except Exception, e:
            return False
        return parsed_time


def getExprDays(t):
    expTime = (t - getLoaclTime()).days
    return expTime

def getLoaclTime():
    return datetime.datetime.now()

def register_parser(info):
    for reg in register_reg:
        result = re.search(reg, info)
        if result:
            rtime = re.sub(r'T', " ", result.group(1))
            return rtime
        continue
    return False

def expire_parser(info):
    for reg in expire_reg:
        result = re.search(reg, info)
        if result:
            rtime = re.sub(r'T', " ", result.group(1))
            return rtime
        continue
    return False

if __name__ == '__main__':
    p = ParseTime("2018/01/23")
    print p.parsed_ymd3()
