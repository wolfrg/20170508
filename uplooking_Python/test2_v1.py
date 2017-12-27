'''
author:wolfr
date:20171227
fun:100以内能被3和5同时整除就输出FizzBuzz，能被3整除就输出Fizz，能被5整除就输出Buzz
'''

my_list = list(range(101))
#print(my_list)
for i in my_list:
	if i == 0:
		print(0)
	elif i % 3 == 0:
		print('Fizz')
	elif i%5 == 0:	
		print('Buzz')
	elif (i%3 == 0 and i%5 == 0):
		print('FizzBuzz')	
	else:
		print(i)	

		
		

