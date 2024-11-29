#include <iostream>

// This is not even an insertion sort
void unkonwn_sort(int arr[], int size){
    int output[size];

    // Initialize
    for (int i = 0; i < size; ++i) {
        output[i] = arr[i];
        arr[i] = 0;
    }

    // Loop through all numbers
    for(int i = 0; i < size; i++){
        int num = output[i];

        // For each number first shift it right
        for(int j = size-1; j > 0; j--){
            arr[j] = arr[j-1];
            // if the currently iterating number in the array is smaller, we add it
            // in front of it
            if(arr[j] != 0 && arr[j] < num){
                arr[j] = num;
                break;
            // if we did not find number bigger, we put it to the first position
            } else if (j == 1){
                arr[j-1] = num;
            }
        }
    }
}

void reverse_insertion_sort(int arr[], int size){
    for(int i = 1; i < size; i ++){
        int key = arr[i];
        int j = i - 1;
        while(j >= 0 && arr[j] < key){
            arr[j+1] = arr[j];
            j--;
        }
        arr[j+1] = key;
    }
}

// Time Complexity O(n^2)
void insertion_sort(int arr[], int size){
    for(int i = 1; i < size; i++){
        int key = arr[i];
        int j = i - 1;
        while(j >= 0 && arr[j] > key){
            arr[j+1] = arr[j];
            j--;
        }
        arr[j+1] = key;
    }
}

int main() {
    int arr[] = {6,2,7,4,1,10,3,8,5,9};
    int size = sizeof(arr) / sizeof(arr[0]);

    std::cout << "Before sorting: ";
    for (int i = 0; i < size; i++) {
        std::cout << arr[i] << " ";
    }
    std::cout << std::endl;

    //unkonwn_sort(arr, size);
    //insertion_sort(arr, size);
    reverse_insertion_sort(arr, size);

    std::cout << "After sorting: ";
    for (int i = 0; i < size; i++) {
        std::cout << arr[i] << " ";
    }
    std::cout << std::endl;

    return 0;
}

/* Testing:
int test(){
    int arr[] = {1, 2, 3, 4, 5, 6};
    int size = sizeof(arr) / sizeof(arr[0]); --> in this case size = 6

    // Returns: total byte size: (e.g: 6 elements x 4 bytes = 24)
    std::cout << sizeof(arr) << std::endl;

    // Returns: memory addresss (e.g: 0x5ffe80)
    std::cout << arr << std::endl;

}
*/