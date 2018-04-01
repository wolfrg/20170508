# coding: utf-8
from flask import Flask, render_template
from hosts import blue_print as hosts_bp
from domains import blue_print as domains_bp
from deploy import blue_print as deploy_bp
from servicetree import blue_print as tree_bp
app = Flask(__name__)
# 从环境变量指定的配置文件获取配置
#app.config.from_envvar('APP_CONFIG_FILE')
app.config.from_object('config.development')
# 注册蓝图
app.register_blueprint(hosts_bp, url_prefix="/hosts")
app.register_blueprint(domains_bp, url_prefix="/domains")
app.register_blueprint(deploy_bp, url_prefix="/deploy")
app.register_blueprint(tree_bp, url_prefix="/tree")

@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")


if __name__ == '__main__':
    APP_DEV_PORT = 8888
    try:
        APP_DEV_PORT = app.config['APP_DEV_PORT']
    except:
        pass
    app.run(host='0.0.0.0', port=APP_DEV_PORT, debug=app.config["DEBUG"])


