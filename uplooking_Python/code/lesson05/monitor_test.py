#coding:utf8
#监控域名到期时间

import commands
import re
import datetime

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

def get_days():

    domain_name='gaiay.net.cn'
    expire_time = get_expire_time()  #调用域名到期时间的函数
    register = get_register_time()   #调用获取注册时间的函数
    now = datetime.datetime.now()    #获取当前的时间
    today = now.strftime('%Y-%m-%d %H:%M:%S')
    expire_day = datetime.datetime.strptime(expire_time,'%Y-%m-%d %H:%M:%S')
    today = datetime.datetime.strptime(today,'%Y-%m-%d %H:%M:%S')
    #print expire_day
    #print today
    delta = (expire_day-today).days
    print "域名：%s,注册时间：%s,到期时间：%s,截止目前域名有效天数还剩%s天"% (domain_name,register,expire_time,delta)


if __name__ == '__main__':
    get_days()

