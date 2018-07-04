function insertionSort(arr) {
  let length = arr.length;

  for(var i=1; i<length; i++) {
    let temp = arr[i+1];
    for(var j=i-1; j>=0 && arr[j]>temp; j--) {
      arr[j+1] = arr[j];
    }
    arr[j+1] = temp;
  }
}


var ul = [5, 3, 1, 2, 4];
insertionSort(ul);
console.log(ul);
