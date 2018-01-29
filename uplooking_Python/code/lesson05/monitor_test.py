#coding:utf8
#监控域名

import commands
import re
import datetime
#from datetime import datetime

def get_register_time():

    reg = r'Registration\sTime:\s(\d{4}-\d{2}-\d{2})'
    status,register = commands.getstatusoutput('whois gaiay.net.cn')
    if status == 0:
        register = re.search(reg,register).group(1)
        return  register


def get_expire_time():

    reg = r'Expiration\sTime:\s(\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2})'
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
expire_time = expire_time
register = get_register_time()
now = datetime.datetime.now()
today = now.strftime('%Y-%m-%d %H:%M:%S')
d2 = datetime.datetime.strptime(expire_time,'%Y-%m-%d %H:%M:%S')
d1 = datetime.datetime.strptime(today,'%Y-%m-%d %H:%M:%S')
delta = d2-d1
#print "域名还有%s天有效" % delta.days
#print type(expire_time)
#print today
print "域名：%s,注册时间：%s,到期时间：%s,截止目前域名有效天数还剩%s天"% (domain_name,register,expire_time,delta.days)
#print "域名：%s，到期时间：%s"% (domain_name,expire_time)
