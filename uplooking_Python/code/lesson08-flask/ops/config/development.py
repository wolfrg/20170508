# coding: utf-8
DEBUG = True
APP_DEV_PORT = 8888

# db
DB_HOST = "127.0.0.1"
DB_PORT = 3306
DB_NAME = "ops"
DB_USER = "root"
DB_PASSWD = ""
DB_CONNECT_TIMEOUT = 10
DB_CHARSET = "utf8"
TIMEOUT_TIMES = 3

NODE_TYPE = ["cop", "owt", "pdl", "service", "servicegroup"]
# 日志
config_log = {
        'version': 1,
        'formatters':{
            'simple':{
                'format': '%(asctime)s - %(name)s - %(levelname)s - %(message)s',
                },
            'simple2':{
                'format': '%(asctime)s - %(name)s - %(levelname)s - %(message)s',
                },
            },
        'handlers':{
            'hostfile': {
                'class': 'logging.FileHandler',
                'filename': 'log/hosts.log',
                'level': 'DEBUG',
                'formatter': 'simple'
                },

            'httpfile': {
                'class': 'logging.FileHandler',
                'filename': 'log/http.log',
                'level': 'DEBUG',
                'formatter': 'simple'
                },
            },
        'loggers':{
            'hosts':{
                'handlers': ['hostfile'],
                'level': 'DEBUG',
                },
            'http':{
                'handlers': ['httpfile'],
                'level': 'INFO',
                }
            }
        }