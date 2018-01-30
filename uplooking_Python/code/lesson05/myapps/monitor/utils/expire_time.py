#coding:utf8


import re
import commands
from libs.parser import expire_reg #导入正则模块


def expire_time(info,domain_name):
    #把正则放到一个文件中，for循环匹配每一项正则
    if info is not None:
        for reg in  expire_reg:
            result = re.search(reg,info)
            if result is not None:
                expire_time = result.group(1)
                expire_day = expire_time
                print "域名：%s,到期时间：%s" % (domain_name,expire_day)
                return expire_day

    else:
        print "error!!!"


