'''
Created on 2017年9月6日

@author: Ops
'''
import os


def find_files(path,wanted):
    try:
        dir_list = os.listdir(path)
        for filename in dir_list:
            new_path = os.path.join(path,filename)

            if os.path.isdir(new_path):
                find_files(new_path,wanted)

            elif os.path.isfile(new_path):
                if wanted.lower() in filename.lower():
                    #print(filename)
                    print(new_path)    
    except Exception as e:
        raise e


find_files('F:\\Python\\spa','mp4')