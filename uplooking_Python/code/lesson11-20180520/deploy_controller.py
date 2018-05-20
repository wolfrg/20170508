#coding:utf-8
from deploy.models.job import Job
from libs.http import net
from config.development import Token, PorjectsUrl, CommitLogUrl, PROJECT_WORK_PATH
from libs.error import ParamError, ServerError
from utils.iokits import pCheck, fTar
import os
import shutil
from commands import getstatusoutput
from fabric import *

class Deploy(object):
    header = {"PRIVATE-TOKEN": Token}
    @classmethod
    def job_add(cls, *args):
        # model 入库
        return Job.add_job(*args)

    @classmethod
    def getVersion(cls, git_url, branch):

        allProjects = net.request(PorjectsUrl, cls.header)
        idPrj = projectsHandle(allProjects)
        pid = idPrj.get(git_url)
        if not pid:
            raise (ParamError("部署的项目不存在"))

        commitLogs = cls.getProjectCommitLog(pid, branch, header)

    @classmethod
    def getProjectCommitLog(cls, pid, branch, header):
        r = net.request(CommitLogUrl%(pid, branch), header)
        print r

    @classmethod
    def deploy(cls, git_url, branch, machines):
        '''
        1. 校验project是否存在
        2. clone project
        3. 编译
        4. 打包
        5. put到部署的设备
        6. 解压-部署
        :param git_url:
        :param branch:
        :param meachines:
        :return:
        '''
        project_name = git_url.split("/")[1].split(".")[0]
        path = PROJECT_WORK_PATH + project_name
        tar_file = "/tmp/%s"%project_name
        if cls._clone(git_url, branch, path):
            fTar(path, tar_file)

        cls._put(tar_file+".tar.gz", machines)

    @classmethod
    def _put(cls,tar_file, machines):
        g = machines.split(",")
        for host in g:
            c = Connection(host)
            # 传输文件
            try:
                c.put(tar_file, tar_file)
            except Exception,e:
                raise (ParamError("文件传输出错了! err:%s"%e))

            # 解压部署
            try:
                result = c.run("/bin/tar xvf %s -C /"%tar_file)
            except Exception, e:
                raise (ServerError("解压异常, err:%s"%result.stdout))

            if result.exited != 0:
                raise (ParamError("解压失败！"))

            #启动项目

    @classmethod
    def _clone(cls, git_url, branch, path):
        if pCheck(path):
            shutil.rmtree(path)
        clone_cmd = "/usr/bin/git clone -b %s %s %s"%(branch, git_url, path)
        status, message = getstatusoutput(clone_cmd)
        print status, message
        if int(status) != 0:
            raise (ServerError("项目拉取失败:%s"%message))

        return True


def projectsHandle(projects):
    prjs = {}
    for i in projects:
        prjs[i["ssh_url_to_repo"]] = i["id"]
    return prjs


