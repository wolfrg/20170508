#encoding:utf8

find_list = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]

def search(flist,num):
    low = 0
    hight = len(flist) - 1
    while  low <=  hight:
        mid = (low+hight)/2
        guess = flist[mid]

        if guess == num:
            return mid
        if guess > num:
            hight = mid - 1
        else:
            low = mid + 1
    return None


if __name__ == "__main__":
    print search(find_list,14)
