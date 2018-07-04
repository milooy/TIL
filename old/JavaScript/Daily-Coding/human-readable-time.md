# Daily Codewars #23
## Question
[codewars link](http://www.codewars.com/kata/52685f7382004e774f0001f7/train/javascript)
Write a function, which takes a non-negative integer (seconds) as input and returns the time in a human-readable format (HH:MM:SS)

- HH = hours, padded to 2 digits, range: 00 - 99
- MM = minutes, padded to 2 digits, range: 00 - 59
- SS = seconds, padded to 2 digits, range: 00 - 59
The maximum time never exceeds 359999 (99:59:59)

You can find some examples in the test fixtures.
> 초를 받아서 시:분:초 로 만드는 문제이다.
> 예를 들어 359999는 '99:59:59'가 된다. 시는 100이하이다.

## My Solution
```javascript
function humanReadable(seconds) {
  // TODO
  var arr = [];
  var q = seconds, r=0;

  for(var i=0; i<2; i++) {
    r = q%60;
    q = Math.floor(q/60);
    arr.unshift(r);
    if(i==1) arr.unshift(q);
  }
  return arr.map(function(n){
    return (n<10) ? '0'+n : n;
  }).join(':');

}
```
처음엔 계속 60으로 나누어 범위에 따라 집어넣는 recursive함수를 생각했었다. 하지만 실패. 
그래서 2번 도는 for문으로 풀었지만 썩 맘에 들진 않았다.

## @Chathurga's Solution
```javascript
function humanReadable(seconds) {
  var pad = function(x) { return (x < 10) ? "0"+x : x; }
  return pad(parseInt(seconds / (60*60))) + ":" +
         pad(parseInt(seconds / 60 % 60)) + ":" +
         pad(seconds % 60)
}
```
그래. 내가 왜 for를 돌렸을까. 짜피 3번인데.
