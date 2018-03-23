#!/usr/bin/python
#coding:utf-8
from flask_login import UserMixin
from index import db
from werkzeug.security import generate_password_hash, check_password_hash


class User(UserMixin, db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), unique=True, index=True)  # unique 代表唯一 ， index查询=效率更高
    password_hash = db.Column(db.String(255))

    @property
    def password(self):
        raise AttributeError('不能获取明文密码！')

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return '用户名{}'.format(self.username)

    def __init__(self, username, password):
        self.username = username
        self.password = password
