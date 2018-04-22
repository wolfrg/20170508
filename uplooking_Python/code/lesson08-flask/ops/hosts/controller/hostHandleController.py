# coding: utf-8
import json
from hosts import HostHandleModle, TreeHandle
from servicetree import TagsHostRelation
from libs.error import ParamError, BindError

class HostHandle(object):

    def __init__(self):
        pass

    @classmethod
    def host_add(cls, *args):
        '''
        :param hostname:
        :param host_type:
        :param ip:
        :param location:
        :return:
        '''
        # hostinfo = cls.parser(assests)
        addResult = HostHandleModle.host_add(*args)
        return addResult

    @classmethod
    def host_bind(cls, hostnames, tagstring):
        '''
        1. 不允许绑定到顶级节点pid = 0 的节点
        2. 绑定前要校验，资产是否已经存在了
        :param tagstring: 产品线 cop.uplooking_dep.sys_pdl.ops
        :param hostnames: 绑定的主机名
        :return:
        '''

        hostnameList = []
        if isinstance(hostnames, str):
            hostnameList.append(hostnames)
        if isinstance(hostnames, unicode):
            hostnameList.append(str(hostnames))
        if isinstance(hostnames, list):
            hostnameList = hostnames

        bindInfo = {}
        for hostname in hostnameList:
            bindResult = cls.exec_bind(hostname, tagstring)
            if not bindResult:
                bindInfo[hostname] = "failed"
            else:
                bindInfo[hostname] = "sucess"

        print ">>>>bindInfo:", bindInfo
        return bindInfo


    @classmethod
    def exec_bind(cls, hostname, tagstring):
        tagId = query_tagstring_id(tagstring)
        hostId = query_host_id(hostname)
        if hostId == 0:
            return False
        bindId = TagsHostRelation.bind(tagId, hostId)

        if bindId > 0:
            return True
        return False


    @classmethod
    def parser(cls, assests):
        '''
        :param params:  主机信息参数
        :return:  主机列表[hostname, type, ip, location]
        '''

        host_name = assests["hostname"]
        host_type= assests["type"]
        host_ip = assests["ip"]
        host_loc = assests["location"]

        return host_name, host_type, host_ip, host_loc

def query_tagstring_id(tagstring):
    # 产品线 cop.uplooking_dep.sre_pdl.ops

    nodes = tagstring.split("_")
    tagId = 0
    # 获取最后一级Node的Pid
    for i in range(len(nodes)):
        type_name = nodes[i].split(".")
        if len(type_name) < 2:
            raise (ParamError("传入的tag有误请检查后重试！"))
        tagId = TreeHandle.queryTagIdByPidAndNameAndType(type_name[0], type_name[1], tagId)
        if tagId == 0:
            raise (BindError("不允许绑定到根节点,或您的tagstring不存在！"))
    return tagId


def query_host_id(hostname):
    ''' 通过主机名获取对应id
    :param hostname: 主机名
    :return: hostid
    '''
    return HostHandleModle.queryIdByHostname(hostname)




