#coding:utf8
import datetime
from conf.exprie_domains import exprie_domains
from utils.whois_commands import sys_call
from utils.expire_time import expire_time
from utils.register_time import register_time
from utils.expire_days import expire_days

class Monitor_Domain(object):

    def __init__(self):
        self.info = None

    def whois(self,domain_name):
        cmd = "whois %s" % domain_name
        info = sys_call(cmd)
        self.info = info
        self.domain_name = domain_name


    def get_register_time(self):
        register_date = register_time(self.info,self.domain_name)
        self.register_date = register_date
        return self.register_date



    def get_expire_time(self):
        expire_date = expire_time(self.info,self.domain_name)
        self.expire_date = expire_date
        return self.expire_date

    def get_update_time(self):
        pass


    def get_expire_days(self):
        my_expire_days = expire_days(self.expire_date)
        self.my_expire_days = my_expire_days
        return self.my_expire_days





        #now = datetime.datetime.now()
        #today = now.strftime('%Y-%m-%d')
        #time1 = datetime.datetime.strptime(today,'%Y-%m-%d')
        #if self.expire_date == None:
        #    print "没有获取到到期时间"
        #else:
        #    time2 = datetime.datetime.strptime(self.expire_date,'%Y-%m-%d')
        #    totaldays = (time2-time1).days
        #    return totaldays
        #now = datetime.datetime.now()
        #today = now.strftime('%Y-%m-%d %H:%M:%S')
        #d2 = datetime.datetime.strptime(expire_time,'%Y-%m-%d %H:%M:%S')
        #d1 = datetime.datetime.strptime(today,'%Y-%m-%d %H:%M:%S')






if __name__ == '__main__':
    md = Monitor_Domain()
    for domain in exprie_domains:
        md.whois(domain)
        r_time = md.get_register_time()
        e_time = md.get_expire_time()
        my_days = md.get_expire_days()

        print "==================================================================================="
        print "域名：%s,注册时间：%s,到期时间：%s,到期天数：%s天" % (domain,r_time,e_time,my_days)
        #print "============================================================="
        #md.get_update_time()
