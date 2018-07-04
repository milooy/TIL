function swap(arr, firstIdx, secondIdx) {
    let temp = arr[firstIdx];
    arr[firstIdx] = arr[secondIdx];
    arr[secondIdx] = temp;
}

function idxOfMin(arr, startIdx) {
    let minVal = arr[startIdx];
    let minIdx = startIdx;

    for(let i = startIdx+1; i< arr.length; i++) {
        if(arr[i] < minVal) {
            minIdx = i;
            minVal = arr[i];
        }
    }
    return minIdx;
}

function selectionSort(arr) {
    for(let i=0; i<arr.length; i++) {
        // 배열 길이 n번의 루프를 도는데, 각 루프에선 n번, n-1번, n-2번 루프를 돈다
        // 즉 배열 8이라면, 8+7+...+1은 n^2/2+n/2이므로 O(n^2)이다
        let minIdx = idxOfMin(arr, i);
        if(arr[i] > arr[minIdx]) {
            swap(arr, i, minIdx);
        }
    }
}


var array = [22, 11, 99, 88, 9, 7, 42];
var array2 = [22, 11, 99, 88, 9, 6, 42];
var array3 = [22, 11, 99, 88, 9, 5, 42];
selectionSort(array);
selectionSort(array2);
selectionSort(array3);
console.log("Array after sorting:  " + array);

// Program.assertEqual(array, [7, 9, 11, 22, 42, 88, 99]);
// Program.assertEqual(array2, [6, 9, 11, 22, 42, 88, 99]);
// Program.assertEqual(array3, [5, 9, 11, 22, 42, 88, 99]);
