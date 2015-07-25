# Daily Codewars #29
## Question
[codewars link](http://www.codewars.com/kata/pick-peaks/javascript)
In this kata, you will create an object that returns the positions and the values of the "peaks" (or local maxima) of a numeric array.

For example, the array `arr = [ 0 , 1 , 2 , 5 , 1 , 0 ]` has a peak in position 3 with a value of 5 (arr[3] = 5)

The output will be returned as an object with two properties: pos and peaks. Both of these properties should be arrays. If there is no peak in the given array, then the output should be `{pos: [], peaks: []}`.

Example: `pickPeaks([3,2,3,6,4,1,2,3,2,1,2,3])` returns `{pos:[3,7],peaks:[6,3]}`

All input arrays will be valid numeric arrays (although it could still be empty), so you won't need to validate the input.

The first and last elements of the array will not be considered as peaks (in the context of a mathematical function, we don't know what is after and before and therefore, we don't know if it is a peak or not).

Also, beware of plateaus !!! `[1,2,2,2,1]` has a peak while [1, 2, 2, 2, 3] does not. In case of a plateau-peak, please only return the position and value of the beginning of the plateau. For example: `pickPeaks([1,2,2,2,1])` returns `{pos:[1],peaks:[2]}`

have fun!
> 배열에서 언덕을 찾아 그 수와 index를 찾는 문제이다.
> 고원이면 고원이 생긴 처음 수와 index를 반환한다.

## My Solution
```javascript
function pickPeaks(arr){
  var pSlope = 0, pi = 0;
  var result = {pos:[],peaks:[]};
  if(arr.length==0) return result;

  arr.reduce(function(p, c, i) {
    if(pSlope>0 && c-p<0) {
      result.peaks.push(p);
      result.pos.push(pi);
    }
    if(c-p != 0){
      pi = i;
      pSlope = c-p;
    }
    return c;
  });
 return result;
}
```
Array.reduce로 current-prev 기울기를 저장했다.
기울기가 양수에서 음수로 바뀌면 그 때를 result에 저장한다.
0이 아닐때만 i와 previous Slope를 저장한다.

## manvel7650's Solution
```javascript
function pickPeaks(arr){
  var result = {pos: [], peaks: []};
  if(arr.length > 2) {
    var pos = -1;
    for(var i=1; i<arr.length;i++){
      if(arr[i] > arr[i-1]) {
        pos = i;
      } else if(arr[i] < arr[i-1] && pos != -1) {
        result.pos.push(pos);
        result.peaks.push(arr[pos]);
        pos = -1;
      }
    }
  }
  return result;
}
```
for문을 돌려서 풀었구낭.
