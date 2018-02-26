#!/usr/bin/env python
# -*- coding: utf-8 -*-
import logging
import json
from conf.config import app_log_path

#LOG_FILE = "../log/app.log"
def get_formatter():
    fmt = '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    formatter = logging.Formatter(json.dumps(fmt))
    return formatter

def get_logger(logger_name):
    logger = logging.getLogger(logger_name)
    logger.setLevel(logging.INFO)
    formatter = get_formatter()
    ch = logging.FileHandler(app_log_path)
    ch.setLevel(logging.INFO)
    ch.setFormatter(formatter)
    logger.addHandler(ch)
    return logger

app_logger = get_logger("montor_domain")
db_logger = get_logger("db")

app_logger.info("lsa")
