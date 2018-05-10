# -*- coding: utf-8 -*-
import logging
import logging.config
from config.development import config_log
logging.config.dictConfig(config_log)

hosts_logger = logging.getLogger("hosts")
db_logger = logging.getLogger("mysql-db")
deploy_logger = logging.getLogger("deploy")
srvtree_logger = logging.getLogger("srvtree")
priv_logger = logging.getLogger("priv")


