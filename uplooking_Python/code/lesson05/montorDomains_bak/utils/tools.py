#!/usr/bin/env python
# -*- coding: utf-8 -*-
import time
from commands import getstatusoutput
from logger.logger import app_logger
from libs.deco import recordLog

@recordLog
def sys_call(cmd):

    # 系统调用
    count = 0
    for i in range(100):
        count += 1
        status, result = getstatusoutput(cmd)
        if status == 0:
            return result
        time.sleep(1)
        if count == 3:
            app_logger.error("whois [cmd:%s] timeout!"%cmd)
            break
        continue

    app_logger.error("[sys_call timeout][cmd:%s]"%cmd)


if __name__ == "__main__":
    sys_call("whois bivyy.cn")



