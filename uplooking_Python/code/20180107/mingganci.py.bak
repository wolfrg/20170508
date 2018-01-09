#coding:utf8

user_input = raw_input("你想说什么？")
with open("./filtered_words.txt","r+") as f :
    mgc = f.readlines()
    #循环列表的两种方法

    #方法一：
    for i in range(len(mgc)):
        new_mgc = mgc[i].strip("\n")
        #print new_mgc
        if new_mgc in user_input:
            user_input  = user_input.replace(new_mgc,"**")

   # 方法二：
    #for words in mgc:
    #    new_mgc = words.strip('\n')
    #    if new_mgc in user_input:
    #        user_input  = user_input.replace(new_mgc,"**")
print user_input


