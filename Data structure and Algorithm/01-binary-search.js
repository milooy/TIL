/*
이진 검색의 실행 시간은 `Θ(log n)`.
n이 두배씩 커질때마다 연산 수가 하나씩 늘어나니까(2의 2제곱 = 연산 2번, 2의 3제곱 = 연산 3번)
*/
doBinarySearch = function(arr, target) {
  let min = 0, max = arr.length-1, guess;
  while(min<=max) {
    guess = Math.floor((min + max)/2);
    if(arr[guess] == target) {
      return guess;
    } else if(arr[guess] > target) {
      max = guess - 1;
    } else if(arr[guess] < target) {
      min = guess + 1;
    }
  }
  return -1;
}


var primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37,
41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];

var result = doBinarySearch(primes, 97);
console.log("바이너리 서치로 찾은 index는 " + result);
