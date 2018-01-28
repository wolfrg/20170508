'''
author:wolfrg
date:201712.25
功能：给出一个随机数整数，让用户去猜，猜对退出，并统计用户猜的次数
'''

import random
num = random.randint(1,100)
big_count = 0
low_count = 0
right_count = 0 

while True:	
	#num = random.randint(1,100)
	guess = int(input('Please input a int number:'))

	if guess > num:
		#print('猜大了 ')
		big_count += 1
		print('猜大了%d次' % big_count)
	elif guess < num:
		#print('猜小了')
		low_count += 1
		print('猜小了%d次' % low_count)
	

	else:
		print('恭喜你，猜对了')
		right_count += 1
		print('你一共猜对了%d次' % right_count)
		break
	
total_count = right_count + big_count + low_count
print('你一共猜了%d' % total_count)