#!/usr/bin/python
#coding:utf-8
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, BooleanField


class LoginForm(FlaskForm):
    username = StringField('username:')
    password = PasswordField('passwd:')
    remember_me = BooleanField('repasswd')
    submit = SubmitField('login')


class RegistrationForm(FlaskForm):
    username = StringField('username')
    password = PasswordField('passwd')
    submit = SubmitField('login')
