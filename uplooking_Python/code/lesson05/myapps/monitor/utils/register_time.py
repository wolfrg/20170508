#coding:utf8

import re
import commands
from libs.parser import register_reg
from convert_time import convert_time

#获取域名注册时间的函数


def register_time(info,domain_name):

    for reg in register_reg:
        try:
            result = re.search(reg,info)
            register_time = result.group(1)
            #register_day = register_time
            register_day = convert_time(register_time)
            return register_day
        except Exception,e:
            continue




