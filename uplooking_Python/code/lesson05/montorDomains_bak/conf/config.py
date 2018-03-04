#!/usr/bin/env python
# -*- coding: utf-8 -*-
# 日志路径
app_log_path = "log/app.log"

# 监控的域名
exprie_domains = [
        'bivyy.cn',
        'mi-idc.commiui.com',
        'miliao.com',
        'tjqonline.cn',
        'xiaomi.tw',
        'hada.me',
        'wlimg.cn',
        'aleenote.com',
        'alinotes.cn',
        'x9m.cn',
        'midoujiang.com',
        'duokan.com',
        'mi-ae.cn',
        'mi-ae.net',
        'zhimi.com',
        'mizhuanqian.com',
        'miot-spec.org',
        'google.com.sg',
        'google.com.hk',
        'google.fr'

        ]

'''
Registration Time: 2017-11-10 09:48:36
Expiration Time: 2018-11-10 09:48:36


Creation Date: 2004-04-29T15:50:45Z
Registry Expiry Date: 2020-04-29T15:50:45Z

Record expires on 2018-09-13 (YYYY-MM-DD)
Record created on 2011-09-13 (YYYY-MM-DD)

Creation Date:		05-Jul-2002 17:42:32
Modified Date:		03-Jun-2017 17:20:53

Domain Name Commencement Date: 14-07-2001
Expiry Date: 20-11-2018

Expiry Date: 30/12/2018
created:     27/07/2000


'''

# register reg
register_reg = [
        "Registration Time:\s(\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2})",
        "Creation Date:\s(\d{4}-\d{2}-\d{2}.\d{2}:\d{2}:\d{2})",
        "Record created on\s(\d{4}-\d{2}-\d{2})",
        "Domain Name Commencement Date:\s(\d{2}-\d{2}-\d{4})",
        "Creation Date:\s+(\d{2}-\w{3}-\d{4}\s\d{2}:\d{2}:\d{2})",
        "created:\s+(\d{2}/\d{2}/\d{4})"
        ]

# expire reg 
expire_reg = [
        "Expiration Time:\s(\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2})",
        "Registry Expiry Date:\s(\d{4}-\d{2}-\d{2}.\d{2}:\d{2}:\d{2})",
        "Record created on\s(\d{4}-\d{2}-\d{2})",
        "Expiry Date:\s(\d{2}-\d{2}-\d{4})",
        "Expiration Date:\s+(\d{2}-\w{3}-\d{4}\s\d{2}:\d{2}:\d{2})",
        "Expiry Date:\s+(\d{2}/\d{2}/\d{4})"

        ]
