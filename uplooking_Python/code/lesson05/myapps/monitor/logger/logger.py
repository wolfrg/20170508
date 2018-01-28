#coding:utf8
#logger.py
#处理日志的模块

def get_formatter():
    fmt = '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    formatter = logging.Formatter(fmt)
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


app_logger = get_logger("monitor_domain")
