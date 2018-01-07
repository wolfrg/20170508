#coding:utf8
#author:wolfrg
#date:20180103
#func:二分查找

'''
二分搜索也称折半搜索，是一种在有序数组中查找某一特定元素的搜索算法

'''

L = [1,2,3,4,5,6,7,8,9,10]

start = 0
end = len(L) -1
while start <= end:
    hkey = int(raw_input("输入你要查找的数："))
    print "要查找的数：%d " % hkey
    mid = start + (end - start)/2
    guess = L[mid]
    if guess == hkey:
        print "你查的数的索引为%d" % mid
        break
    if guess > hkey:
        print "中间数%d > 查找的数 %d ，去中间数前面的数查找继续" % (guess, hkey)
        end = mid - 1
    else:
        print "中间数%d < 查找的数%d ，去中间数后面的数查找继续" % (guess,hkey)
        start = mid + 1









