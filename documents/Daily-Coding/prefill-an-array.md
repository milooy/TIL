# Daily Codewars #27
## Question
[codewars link](http://www.codewars.com/kata/prefill-an-array/javascript)
Create the function prefill that returns an array of n elements that all have the same value v. See if you can do this without using a loop.

You have to validate input:

v can be anything (primitive or otherwise)
if v is ommited, fill the array with undefined
if n is 0, return an empty array
if n is anything other than an integer or integer-formatted string (e.g. '123') that is >=0, throw a TypeError
When throwing a TypeError, the message should be n is invalid, where you replace n for the actual value passed to the function.

Code Examples
```javascript
prefill(3,1) --> [1,1,1]

prefill(2,"abc") --> ['abc','abc']

prefill("1", 1) --> [1]

prefill(3, prefill(2,'2d'))
  --> [['2d','2d'],['2d','2d'],['2d','2d']]

prefill("xyz", 1)
  --> throws TypeError with message "xyz is invalid"
```

> 1번째 인자만큼 2번째 인자로 배열을 채우는 문제이다.

## My Solution
```javascript
function prefill(n, v) {
  try {
    var arr = Array.apply(null, Array(typeof n=='boolean'? parseInt(n): +n));
    return arr.map(function() {
      return v;
    });
  } catch (e) {
    throw new TypeError(n+' is invalid');
  }
}
```
try catch문을 직접 써본건 처음이다!
`Array.apply(null, Array(5))`와 같이 배열을 초기화한다.
그냥 new Array(3)하면 length는 3이지만 생긴건 []인 배열이 나오니까.
그리고 맵 돌려줬다.

## @abhiaiyer91's Solution
```javascript
function prefill(num, value) {
  if(typeof num === 'boolean' || ~~num != num || +num < 0) throw new TypeError(num + ' is invalid')
  return Array.apply(null, Array(+num)).map(function (d,i) { return value })
}
```
같은 방식으로 map을 돌려주되, 앞에 boolean, float등을 처리하는 if를 넣어주었다 . 그냥 throw를 던지면 되는구나.

## @handyCAPS's Solution
```javascript
function prefill(n, v) {
  if (/\D/g.test(n) || n < 0) {throw new TypeError(n + ' is invalid')}
  return Array.apply(null, new Array(parseInt(n, 10))).map(function() {return v;});
}
```
이사람은 정규표현식으로 처리!
