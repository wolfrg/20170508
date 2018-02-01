#coding:utf8
#监控域名

import commands
import re
import datetime

def get_register_time():

    reg = r'Registration\sTime:\s(\d{4}-\d{2}-\d{2})'
    status,register = commands.getstatusoutput('whois miliao.com')
    if status == 0:
        register = re.search(reg,register).group(1)
        return  register


def get_expire_time():

    reg = r'Registry\sExpiry\sDate:\s(\d{4}-\d{2}-\d{2})'
    #reg = r'Expiration\sTime:\s(\d{4}-\d{2}-\d{2})'
    #status,output = commands.getstatusoutput('whois gaiay.net.cn')
    status,output = commands.getstatusoutput('whois miliao.com')
    print status
    if status == 0 or status == 256:
        if output == "No whois server is known for this kind of object.":
            return None
        else:
            expire = re.search(reg,output).group(1)
            print expire
            return  expire
    else:
        return None

def get_update_time():

    reg = r'Updated\sDate:\s\d{4}-\d{2}-\d{2}'
    status,update = commands.getstatusoutput('whois baidu.com')
    if status == 0 :
        update = re.search(reg,update)
        return update.group()
    else:
        print "No match domain"

def get_days():

    domain_name='miliao.com'
    expire_time = get_expire_time()
    #print expire_time
    register = get_register_time()
    now = datetime.datetime.now()
    today = now.strftime('%Y-%m-%d')
    d2 = datetime.datetime.strptime(expire_time,'%Y-%m-%d')
    d1 = datetime.datetime.strptime(today,'%Y-%m-%d')
    delta = (d2-d1).days
    print "域名：%s,注册时间：%s,到期时间：%s,截止目前域名有效天数还剩%s天"% (domain_name,register,expire_time,delta)




if __name__ == '__main__':
    get_days()

