#coding:utf8


import re
import commands
from libs.parser import expire_reg #导入正则模块


def expire_time(info,domain_name):
        for reg in  expire_reg:
            try:
                result = re.search(reg,info)
                expire_time = result.group(1)
                expire_day = expire_time
                print "域名：%s,到期时间：%s" % (domain_name,expire_day)
                return expire_day

            except Exception,e:
                continue



