#coding:utf-8
from servicetree.models.db_tree import MapTree

class Cache(object):
    node_tags = []
    @classmethod
    def _build_cache(cls):
        tree = MapTree.get_all()
        node_hash = {int(item["id"]): item for item in tree}
        return node_hash

    @classmethod
    def getTagstringsByTreeIds(cls, treeIds):
        node_hash = cls._build_cache()
        tagstrings = []
        for treeId in treeIds:
            cls.node_tags = []
            tagstring = cls.getTreePath(treeId, node_hash)
            print ">>>>", tagstring
            tagstrings.append(tagstring)
        return tagstrings

    @classmethod
    def getTreePath(cls, treeId, node_hash):

        #cop.uplooking_dep.sre_pdl.sys
        #sys  10         pid 2
        #sre: 2          pid 1
        #uplooking: 1    pid 0
        node = node_hash.get(int(treeId))
        pid = node.get("pid")
        node_type = node.get("node_type")
        name = node.get("name")
        cls.node_tags.insert(0,".".join([node_type, name]))
        #1 -> [cop.uplooking, dep.sre, pdl.sys]
        if int(pid) == 0:
           tagstring = "_".join(cls.node_tags)
           return tagstring
        return cls.getTreePath(pid, node_hash)


