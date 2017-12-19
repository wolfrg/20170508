from django import forms
#引入Django 默认的用户模型User类
from django.contrib.auth.models import User
from .models import UserProfile,UserInfo

class LoginForm(forms.Form):

	username = forms.CharField()
	password = forms.CharField(widget=forms.PasswordInput)


class RegistrationForm(forms.ModelForm):
	password = forms.CharField(label="Password",widget=forms.PasswordInput)
	password2 = forms.CharField(label="Confirm Password",widget=forms.PasswordInput)
	
	#内部类
	class Meta:
		model = User
		fields = ("username","email")


	def clean_password2(self):
		cd = self.cleaned_data
		if cd['password'] != cd['password2']:
			raise forms.ValidationError("passwords do not match.")
		return cd['password2']


class UserProfileForm(forms.ModelForm):
	class Meta:
		model = UserProfile
		fields = ("phone","birth")


#个人信息的表单
class UserInfoForm(forms.Form):
	class Meta:
		model = UserInfo
		fields = ("school","company","profession","address","aboutme")

class UserForm(forms.ModelForm):
	class Meta:
		model = User
		fields = ("email",)
