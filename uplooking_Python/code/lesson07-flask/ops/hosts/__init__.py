from flask import Blueprint
blue_print = Blueprint('hosts', __name__, template_folder="templates", static_folder="static")
import views