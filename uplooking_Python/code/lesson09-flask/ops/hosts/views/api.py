# coding: utf-8
from flask import render_template
from flask import request
from hosts import blue_print

@blue_print.route("collect/hosts", methods=["POST"])
def collect():
    pass