#encoding:utf8
#author:wolfrg
#date:20180103
#func:二分查找

'''
二分搜索也称折半搜索，是一种在有序数组中查找某一特定元素的搜索算法

'''

#定义一个列表
L = [1,2,5,4,3]
print L
print "序列的长度为 %d " % len(L)
print "序列的第一个元素为 %d ,索引为0" % L[0]
print "序列的最后一个元素为 %d ，索引为 %d" %(L[len(L) -1],len(L) -1)
print "序列中间的元素为 %d " % L[0 + (len(L) - 1) - 0]
#start = 0
#end = L[len(L) -1]
#mid = start + (end - start)/2
#print L[mid]
#while True:

