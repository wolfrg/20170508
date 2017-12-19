#coding:utf8
'''
Created on 2017年8月24日

@author: Ops
'''


import os

def my_rsync(source):

        os.chdir(source)

        if os.path.isfile("package.json"):
                f = open("package.json").readlines()
                for build in f:
                        os.system("npm install")
                        os.system("npm  run build")
                if os.path.isdir("dist"):
                        #src = "/data/jenkins_workspace/jenkins_8001/workspace/zm-mobile-h5-spa_all/alliance_add/dist/"
                        source = os.path.join(source,"dist/")
                        dst_ma = "tomcat@192.168.0.221:/webapps/zm.gaiay.net.cn-ma/www/spa/alliance_add/"
                        dst_reader = "tomcat@192.168.0.223:/webapps/zm.gaiay.net.cn/www/spa/alliance_add/"

                        os.system("rsync -vzrtopg --progress -e ssh  source  dst_ma" )
                        os.system("rsync -vzrtopg --progress -e ssh  source  dst_reader")


        else:

                if os.path.isdir("src"):
                    source = os.path.join(source,"src/")
                    dst_ma = "tomcat@192.168.0.221:/webapps/zm.gaiay.net.cn-ma/www/spa/live-message/"
                    #dst_reader =   

my_rsync("/data/jenkins_workspace/jenkins_8001/workspace/zm-mobile-h5-spa_all/alliance_add/")

my_rsync("/data/jenkins_workspace/jenkins_8001/workspace/zm-mobile-h5-spa_all/live-message/")