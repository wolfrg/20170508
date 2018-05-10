#coding:utf-8
import json
from servicetree.models import *
from config.development import NODE_TYPE
from servicetree.models.hosts import Hosts
from libs.cache.cache import Cache
from servicetree.models.tree_host_relation import TagsHostRelation
from libs.error import ParamError, ServerError

class HostApi(object):

    @classmethod
    def getNodesByHostname(cls,hostname):
        hostId = Hosts.getHostIdByHostname(hostname)
        if hostId:
            treeIds = TagsHostRelation.getTreeIdByDeviceId(hostId)
            tagstrings = Cache.getTagstringsByTreeIds(treeIds)
            hostTags = {hostname:tagstrings}
            return hostTags
        message = "[%s]主机不存在!"%str(hostname)
        #message = "{}主机不存在".format(hostname)
        raise(ServerError(message))
