#coding:utf8

import commands

def sys_call(cmd):

    status,output = commands.getstatusoutput(cmd)
    if status == 0:
        return output


#if __name__== "__main__":
#    for ex in exprie_domains:
#        sys_call(ex)
