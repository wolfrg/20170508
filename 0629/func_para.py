#coding:gbk
'''
Created on 2017��3��7��

@author: Ops
'''
import paramiko
import os



def func_paramiko(server,hostname,commands):
    
    sshkey= os.path.expanduser('E:\\����\\��������\\����������key�ļ�\\fengruigang_tomcat_20150427')
    username = "tomcat"

    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(hostname=hostname,username=username,key_filename=sshkey,password="tomcat@fengruigang")
    
    stdin,stdout,stderr = ssh.exec_command(commands)
    
    for std in stdout.readlines():
        print server,std
        
        
    ssh.close()
 

#���ú���
func_paramiko("192.168.0.221:","192.168.0.221","uptime")
func_paramiko("192.168.0.222:","192.168.0.222","uptime")     
func_paramiko("192.168.0.223:","192.168.0.223","uptime")
func_paramiko("192.168.0.224:","192.168.0.224","uptime")
func_paramiko("192.168.0.226:","192.168.0.226","uptime")