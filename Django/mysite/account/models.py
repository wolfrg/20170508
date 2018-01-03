from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
	user = models.OneToOneField(User,unique=True)
	birth = models.DateField(blank=True,null=True)
	phone = models.CharField(max_length=20,null=True)

	def __str__(self):
		return 'user {}'.form(self.user.username)

#个人信息的数据模型类
class UserInfo(models.Model):
	user = models.OneToOneField(User,unique=True)
	school = models.CharField(max_length=100,blank=True)
	company = models.CharField(max_length=100,blank=True)
	profession = models.CharField(max_length=100,blank=True)
	address = models.CharField(max_length=100,blank=True)
	aboutme = models.TextField(blank=True)  #在前端页面中允许用户不填写


	def __str__(self):
		return "user:{}".format(self.user.username)