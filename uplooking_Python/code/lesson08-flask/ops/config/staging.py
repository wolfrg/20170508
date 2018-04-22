# coding: utf-8
DEBUG = False
APP_DEV_PORT = 8888

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
            'dbfile': {
                'class': 'logging.FileHandler',
                'filename': 'db.log',
                'level': 'DEBUG',
                'formatter': 'simple'
                },

            'httpfile': {
                'class': 'logging.FileHandler',
                'filename': 'http.log',
                'level': 'DEBUG',
                'formatter': 'simple'
                },
            },
        'loggers':{
            'db':{
                'handlers': ['dbfile'],
                'level': 'INFO',
                },
            'http':{
                'handlers': ['httpfile'],
                'level': 'INFO',
                }
            }
        }