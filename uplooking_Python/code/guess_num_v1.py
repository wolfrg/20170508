'''
author:wolfrg
date:2017.12.25
猜数字游戏,V1版,被猜的数字不是随机的
'''
flag =30
while True:
	#flag = 30
	num = int(input('please input your number:'))

	if  num > flag:
		print('大了')
	elif num < flag:	
		print('小了')
	else:
		print('猜对了')
			

