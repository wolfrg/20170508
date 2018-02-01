#coding:utf8

import datetime
from expire_time import expire_time
#from expire_register import expire_register

#技术域名到期天数的函数

def expire_days(expire_date):
    now = datetime.datetime.now()
    today = now.strftime('%Y-%m-%d')
    time1 = datetime.datetime.strptime(today,'%Y-%m-%d')
    if expire_date == None:
         return  "(没有查询到过期时间)"
    else:
        time2 = datetime.datetime.strptime(expire_date,'%Y-%m-%d')
        totaldays = (time2-time1).days
        return totaldays
