#coding:utf8

import commands

def sys_call(cmd):

    status,output = commands.getstatusoutput(cmd)
    if status == 0 or status == 256:
        if output == "No whois server is known for this kind of object.":
            return None

        else:
            return output
    else:
        return None

