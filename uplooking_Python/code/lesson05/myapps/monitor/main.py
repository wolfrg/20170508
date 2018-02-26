#coding:utf8
from core.monitor_domains import Monitor_Domain
from logger.logger import get_logger
from conf.exprie_domains  import exprie_domains

def main():
    md = Monitor_Domain()
    logger = get_logger("whois domains")
    for domain in exprie_domains:
        md.whois(domain)
        r_time = md.get_register_time()
        e_time = md.get_expire_time()
        my_days = md.get_expire_days()
        if e_time == None:
            logger.info("没查到 %s的有效信息."%(domain))
        else:
            print "==================================================================================="
            print "域名：%s,注册时间：%s,到期时间：%s,到期天数：%s天" % (domain,r_time,e_time,my_days)




if __name__ == '__main__':
    main()
