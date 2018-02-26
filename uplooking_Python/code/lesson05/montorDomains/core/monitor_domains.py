#!/usr/bin/env python
# -*- coding: utf-8 -*-
import re
from conf.config import exprie_domains
from logger.logger import app_logger, db_logger
from utils.tools import sys_call
from libs.parser import register_parser, expire_parser, ParseTime, getExprDays

class DomainManager(object):
    def __init__(self):
        self.info = None

    @classmethod
    def whois(cls, domain_name):
        # 获取域名注册信息
        cmd = "whois %s"%domain_name
        info = sys_call(cmd)
        cls.info = info

    #Registration Time: 2017-11-10 09:48:36
    #Expiration Time: 2018-11-10 09:48:36
    @classmethod
    def get_register_time(cls, domain_name):
        # 获取注册时间
        reg_time = register_parser(cls.info)
        if reg_time:
            return reg_time

    @classmethod
    def get_expire_time(cls, domain_name):
        # 获取过期时间
        expire_time = expire_parser(cls.info)
        if expire_time:
            return expire_time
        #app_logger.info(["not match"]["domain:%s"%domain_name])
        #print "domain_name:%s, is not match"%domain_name

def get_domain_register_expiry_time():
    dTimes = {}
    for domain in exprie_domains:
        # 每个域名的过期和注册时间
        domain_reg_expr_time = {}
        DomainManager.whois(domain)
        registerTime = DomainManager.get_register_time(domain)
        if registerTime:
            expiryTime = DomainManager.get_expire_time(domain)
            domain_reg_expr_time["reg_time"] = registerTime
            domain_reg_expr_time["expriy_time"] = expiryTime
            dTimes[domain] = domain_reg_expr_time
        else:
            app_logger.info("[not match][domain:%s]"%domain)
            print "domain_name:%s, is not match"%domain
    print "DTime-->", dTimes
    return dTimes

def calculate_expire_days(dTimes):
    '''计算过期天数'''
    for domain_name, domain_times in dTimes.iteritems():
        pt = ParseTime(domain_times["expriy_time"])
        domain_times["expriy_days"] = getExprDays(pt.parse_time())
    return dTimes

def main():
    dTimes = get_domain_register_expiry_time()
    result = calculate_expire_days(dTimes)
    # 写入到文件或db
    print result

if __name__ == "__main__":
    main()



