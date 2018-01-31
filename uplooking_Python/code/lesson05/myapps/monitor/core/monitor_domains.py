#coding:utf8

from conf.exprie_domains import exprie_domains
from utils.whois_commands import sys_call
from utils.expire_time import expire_time
from utils.register_time import register_time

class Monitor_Domain(object):

    def __init__(self):
        self.info = None

    def whois(self,domain_name):
        cmd = "whois %s" % domain_name
        info = sys_call(cmd)
        self.info = info
        self.domain_name = domain_name


    def get_register_time(self):
        register_time(self.info,self.domain_name)

    def get_expire_time(self):
        expire_time(self.info,self.domain_name)

    def get_update_time(self):
        pass




if __name__ == '__main__':
    md = Monitor_Domain()
    for domain in exprie_domains:
        md.whois(domain)
        md.get_register_time()
        md.get_expire_time()
        md.get_update_time()
