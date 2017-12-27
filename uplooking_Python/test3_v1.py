'''
author:wolfrg
date:20171227
fun:随机生成16位的验证码
'''
import string
import random


my_list = list(range(16))
#print(range(0,16))
#print(c)
v_code = string.ascii_lowercase + string.ascii_uppercase + string.digits


for i in my_list:
	my_list[i] = random.choice(v_code)
	print(my_list[i])

my_code	= "".join(my_list)
print(my_code)
