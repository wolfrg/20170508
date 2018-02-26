#coding:utf8
import time
from datetime import datetime

#统一时间格式


def convert_time(tstr):
    try:
        time.strptime(tstr,"%Y-%m-%d")
        return tstr
    except:
        try:
            time_convert = datetime.strptime(tstr,"%d-%b-%Y").strftime("%Y-%m-%d")
            return time_convert
        except Exception,e:
            try:
                time_convert = datetime.strptime(tstr,"%d-%m-%Y").strftime("%F")
                return time_convert
            except Exception,e:
                time_convert = datetime.strptime(tstr,"%d/%m/%Y").strftime("%F")
                return time_convert




