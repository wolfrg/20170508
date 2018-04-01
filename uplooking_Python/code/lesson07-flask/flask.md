return make_response

ipython交互模式下查看url
from app import app
app.url_map

flask 蓝图：
http://docs.jinkan.org/docs/flask/blueprints.html <br>

http://dormousehole.readthedocs.io/en/latest/tutorial/dbcon.html <br>

http://docs.jinkan.org/docs/flask/appcontext.html 上下文

from hosts import blue_print as hosts_bp

app.register_blueprint(hosts_bp,url_prefix="hosts")
 
定义一个蓝图：


__init__.py


========================================================================<br>
request
http://docs.python-requests.org/zh_CN/latest/user/quickstart.html