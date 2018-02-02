#coding:utf8

#这是里正则表达式


register_reg = [

            r'Updated\sDate:\s(\d{4}-\d{2}-\d{2})',
            r'Registration Time:\s(\d{4}-\d{2}-\d{2})',
            r'Creation Date:\s(\d{4}\-\d{2}\-\d{2})',
            r'Record created on\s(\d{4}\-\d{2}\-\d{2})',
            r'Creation Date:\s(\d{4}\-\d{2}\-\d{2})',
            r'Creation Date:\s{2}(\d{2}\-\S{3}\-\d{4})',
            r'Domain Name Commencement Date:\s(\d{2}-\d{2}\-\d{4})',
            r'created:\s\s{4}(\d{2}\/\d{2}\/\d{4})',
               ]


expire_reg = [

#    r'Expiration\sTime:\s(\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2})',
#    r'Expiration\sTime:\s(\d{4}-\d{2}-\d{2})',
#    r'Registry\sExpiry\sDate:\s(\d{4}-\d{2}-\d{2})',
#    r'Registry\sExpiry\sDate:\s(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)',
    r'Expiration Time:\s(\d{4}-\d{2}-\d{2})',
    r'Registry Expiry Date:\s(\d{4}\-\d{2}\-\d{2})',
    r'Record expires on\s(\d{4}\-\d{2}\-\d{2})',
    r'Registry Expiry Date:\s(\d{4}\-\d{2}\-\d{2})',
    r'\s\s\sRegistry\sExpiry\sDate:\s(\d{4}-\d{2}-\d{2})',
    r'Expiration Date:\s{2}(\d{2}\-\S{3}\-\d{4})',
    r'Expiry Date:\s(\d{2}-\d{2}\-\d{4})',
    r'Expiry Date:\s(\d{2}\/\d{2}\/\d{4})',



     ]
