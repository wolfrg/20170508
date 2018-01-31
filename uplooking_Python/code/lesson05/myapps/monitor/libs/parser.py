#coding:utf8

#这是里正则表达式


register_reg = [

            r'Updated\sDate:\s(\d{4}-\d{2}-\d{2})',

               ]


expire_reg = [

#    r'Expiration\sTime:\s(\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2})',
#    r'Expiration\sTime:\s(\d{4}-\d{2}-\d{2})',
#    r'Registry\sExpiry\sDate:\s(\d{4}-\d{2}-\d{2})',
#    r'Registry\sExpiry\sDate:\s(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)',
    'Expiration Time:\s(\d{4}-\d{2}-\d{2})',
    'Registry Expiry Date:\s(\d{4}\-\d{2}\-\d{2})',
    'Record expires on\s(\d{4}\-\d{2}\-\d{2})',
    'Registry Expiry Date:\s(\d{4}\-\d{2}\-\d{2})',
    'Expiration Date:\s{2}(\d{2}\-\S{3}\-\d{4})',
    'Expiry Date:\s(\d{2}-\d{2}\-\d{4})',
    'Expiry Date:\s(\d{2}\/\d{2}\/\d{4})',



     ]
