from flask import Blueprint
blue_print = Blueprint("domain",__name__,template_folder='templates',static_folder='static')

import views