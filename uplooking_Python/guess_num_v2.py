'''
author:wolfrg
date:201712.25
给出一个随机数整数，让用户一直猜下去，直到猜对退出
'''
import random

num = random.randint(1,100)
while True:
	#num = random.randint(1,100)
	guess = int(input('Please input you guess number:'))

	if guess > num:
		print('猜大了')

	elif guess < num:
		print('猜小了')
	else:
		print('恭喜，猜对了')
		break #猜对后就退出循环	

