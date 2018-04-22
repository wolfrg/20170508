from flask import Blueprint
from models.tree_host_relation import TagsHostRelation
blue_print = Blueprint("tree", __name__, template_folder="templates", static_folder="static")
import views
