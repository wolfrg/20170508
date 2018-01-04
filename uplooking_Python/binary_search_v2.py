#encoding:utf8
#author:wolfrg
#date:20180103
#func:二分查找

'''
二分搜索也称折半搜索，是一种在有序数组中查找某一特定元素的搜索算法

'''

#定义一个列表
L = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
print L
print "序列的长度为 %d " % len(L)
print "序列的第一个元素为 %d ,索引为0" % L[0]
print "序列的最后一个元素为 %d ，索引为 %d" %(L[len(L) -1],len(L) -1)
#print "序列中间的元素为 %d " % L[0 + (len(L) - 1) - 0]


#start = 0 #索引的开始
#end = len(L) -1 #索引的结束
#mid = start + (end - start)/2
#print L[mid]
#while True:

start = 0
end = len(L) -1
while start <= end:
    hkey = int(raw_input("输入你要查找的数："))
    print "要查找的数：%d " % hkey
    mid = start + (end - start)/2
    print "中间的数：%d" % mid
    #hkey = int(raw_input("输入你要查找的数："))
    if L[mid] == hkey:
        print "你猜的数的索引为%d" % mid
    elif L[mid] > hkey:
        end = mid - 1
        print "猜小了"
    else:
        start = mid + 1
        print "猜大了"









