#coding:utf8
#监控域名

import commands
import re
import time
import datetime
#from datetime import datetime

def get_register_time():

    reg = r'Registration\sTime:(\s\d{4}-\d{2}-\d{2})'
    status,register = commands.getstatusoutput('whois gaiay.net.cn')
    if status == 0:
        register = re.search(reg,register).group(1)
        return  register


def get_expire_time():

    reg = r'Expiration\sTime:(\s\d{4}-\d{2}-\d{2})'
    status,output = commands.getstatusoutput('whois gaiay.net.cn')
    if status == 0:
        expire = re.search(reg,output).group(1)
        return  expire


def get_update_time():

    reg = r'Updated\sDate:\s\d{4}-\d{2}-\d{2}'
    status,update = commands.getstatusoutput('whois baidu.com')
    if status == 0 :
        update = re.search(reg,update)
        return update.group()
    else:
        print "No match domain"
#def get_expire_days():
#    #到期天数=到期时间-现在的时间
#    today = datetime.date.today()


domain_name='gaiay.net.cn'
expire_time = get_expire_time()
register = get_register_time()
today = datetime.date.today()

#print date_time
#days = (expire_time - today).days
#print today #这个日期格式为：2018-01-29

#today = today.replace('-',',')
#print today
print "域名：%s,注册时间：%s,到期时间：%s"% (domain_name,register,expire_time)
#print "域名：%s，到期时间：%s"% (domain_name,expire_time)
