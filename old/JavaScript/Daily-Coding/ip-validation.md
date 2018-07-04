# Daily Codewars #30
## Question
[codewars link](http://www.codewars.com/kata/ip-validation/javascript)
Write an algorithm that will identify valid IPv4 addresses in dot-decimal format. Input to the function is guaranteed to be a single string.

Examples of valid inputs: 1.2.3.4 123.45.67.89

Examples of invalid inputs: 1.2.3 1.2.3.4.5 123.456.78.90 123.045.067.089
> ip주소 validation을 하는 문제다. 참고로 0<=숫자<=255 의 범위내의 4개의 숫자이다.
> 이게 왜 4kyu이지?

## my Solution
```javascript
function isValidIP(str) {
  var arr = str.split('.');
  if(arr.length == 4) {
    return validLen = arr.filter(function(x) {
      return x !== (+x).toString() ? false : x>=0 && x<=255 ? true : false;
    }).length == arr.length;
  }
  return false;
}
```
split으로 나눠서 삼항연산자로 비교했다. 
지금 보니 arr.length랑 filter로 나온 length를 비교할 필요 없이 그냥 4면 되는건데 바보바보 인증.

## ryanzyy's Solution
```javascript
function isValidIP(str) {
  return /^(([1-9]?\d|1\d\d|2[0-4]\d|25[0-5])(\.(?!$)|$)){4}$/.test(str);
}
```
으익 나도 정규식으로 풀걸. 그리 복잡하지 않았을텐데!

## yaphi1's Solution
```javascript
function isValidIP(str) {
  return str.split('.').filter(function(v){return v==Number(v).toString() && Number(v)<256}).length==4;
}
```
앗 맞아(+x)라고 할필요 없었는데! 그리고 3항연산도 할필요 없었는데!
바보바보 인증
