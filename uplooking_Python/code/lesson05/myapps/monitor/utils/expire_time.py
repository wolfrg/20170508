#coding:utf8


import re
import commands
from libs.parser import expire_reg
from logger.logger import get_logger

def expire_time(info,domain_name):
        for reg in  expire_reg:
            try:
                result = re.search(reg,info)
                expire_time = result.group(1)
                expire_day = expire_time
                #print "域名：%s,到期时间：%s" % (domain_name,expire_day)
                if expire_day is not None:
                    if expire_day == "No matching record":
                        #return "No matching record."
                        logger.info("域名:%s没查到有效信息" % (domain_name))
                    elif expire_day == "The queried object does not exist: DOMAIN NOT FOUND":
                        #return "The queried object does not exist: DOMAIN NOT FOUND"
                        logger.info("域名:%s没查到有效信息" % (domain_name))
                    else:
                        return expire_day
            except Exception,e:
                continue



