# Daily Codewars #24
## Question
[codewars link](http://www.codewars.com/kata/52685f7382004e774f0001f7/train/javascript)
Write an algorithm that takes an array and moves all of the zeros to the end, preserving the order of the other elements.
```javascript
moveZeros([false,1,0,1,2,0,1,3,"a"]) // returns[false,1,1,2,1,3,"a",0,0]
```

## My Solution
```javascript
//success code
var moveZeros = function (arr) {
  for(var i = arr.length; i--;) {
      if(arr[i] === 0) {
          arr.splice(i, 1);
          arr.push(0);
      }
  }
  return arr;
}
```
```javascript
//error code
  arr.map(function(item, i) {
    if(item===0){
        arr.splice(i, 1);
        arr.push(0);
    }
  });
```
처음에는 두번째 코드처럼 map으로 짰다. 하지만 이는 배열에서 0을 삭제할때마다 index가 꼬이는 문제가 있어서 간단한 for loop를 돌렸다.

## @jakber's Solution
```javascript
var moveZeros = function (arr) {
  return arr.filter(function(x) {return x !== 0}).concat(arr.filter(function(x) {return x === 0;}));
}
```
이야아... filter로 0이 아닌것과 0인걸 나누어서 concat했다.
