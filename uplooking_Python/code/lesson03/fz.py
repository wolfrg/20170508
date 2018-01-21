#coding:utf8
var = "no"
_var1_ = 'single'

def _print_one_(self):
    print "单下划线"

class A(object):

    __var2__ = 'double'

    def __print_two__(self):
        print "双下划线"

if __name__ == "__main__":
    a = A()
    #a._var1_
    print a.__var2__
    #a._print_one_()
    #a.__print_two__()

