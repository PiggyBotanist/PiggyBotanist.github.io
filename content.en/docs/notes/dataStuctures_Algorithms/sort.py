import random
import time

# Concept of loop invariant: conditions that holds true before, during, and after every iteration of a loop.



# Time Complexity O(n^2) --> This method is still better than the "unknown sort"
def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while(j >= 0 and arr[j] > key):
            arr[j+1] = arr[j]
            j-=1
        arr[j+1] = key
    return arr

# Time Complexity O(n^2) --> 
def unknown_sort(array):
    output = [0] * len(array)
    
    for i in range(len(array)):
        num = array[i]
        # case 1: it is the start
        if(i == 0):
            output[i] = num
        # case 2: it is not the start
        if(i > 0):
            for j in range(len(array)-1, 0, -1):
                if(output[j-1] != 0):
                    output[j] = output[j-1]
                    if(output[j] < num):
                        output[j] = num
                        break
                    if(j == 1):
                        output[j-1] = num
                        break
    return output


array = [random.randint(1, 10) for _ in range(10000)]

start = time.time()
sorted_unknown = unknown_sort(array)
end = time.time()
print("Time for unknown sort: ", (end-start)*10**3, "ms")

start = time.time()
sorted_insertion = insertion_sort(array)
end = time.time()
print("Time for insertion sort: ", (end-start)*10**3, "ms")

#print(sorted_unknown)
#print(sorted_insertion)
    