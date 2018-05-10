from flask import Blueprint
from models.hostOperateModle import HostHandleModle
from models.treeModle import  TreeHandle
blue_print = Blueprint('hosts', __name__, template_folder="templates", static_folder="static")
import views