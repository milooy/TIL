## Daily Codewars #21
## Question
[codewars link](http://www.codewars.com/kata/5267faf57526ea542e0007fb/train/javascript)
Oh no, our Math object was "accidently" reset. Can you re-implement some of those functions? We can assure, that only non-negative numbers are passed as arguments. So you don't have to consider things like undefined, null, NaN, negative numbers, strings and so on.

Here is a list of functions, we need:
```javascript
Math.round()
Math.ceil()
Math.floor()
```

## My Solution
```javascript
Math.round = function(number) {
    return (number-parseInt(number)<0.5)? parseInt(number) : parseInt(number)+1;
};

Math.ceil = function(number) {
  return (number==parseInt(number))? parseInt(number) : parseInt(number)+1;
};

Math.floor = function(number) {
  return parseInt(number);
};
```
그냥 뭐 풀었다.
num.toFixed(3)따위 하면 3+1번째자리에서 반올림되서 나온다는 걸 배움.
제일 위에 best practice로 나온 분이 내 답이랑 같아서 방심했는데
그 밑엔 기계느님들이 계셨다.

## @drrcknlsm's Solution
```javascript
Math.round = function(number) {
  return Math.floor(number + 0.5);
};

Math.ceil = function(number) {
  return (number | 0) + (number % 1 !== 0 ? 1 : 0);
};

Math.floor = function(number) {
  return number | 0;
};
```
아아 0.5를 더하고 floor하면 반올림값 나오는구나!
근데 ceil에서 쓴 소수점과의 비트연산은 어떻게 하는걸까.
왜 %1을 하는거지. 궁금.

## @perkee's Solution
```javascript
Math.floor = function(n) {
  return ~~n;
};

Math.frac = function(n){
  return n - Math.floor(n);
};

Math.round = function(n) {
  return Math.floor(n) + (Math.frac(n) &gt;= 0.5)
};

Math.ceil = function(n) {
  return Math.floor(n) + !!(Math.frac(n))
};
```
아래 링크를 참고하면 숫자 앞에 `~~`를 붙이면 Math.floor같은 효과가 나는 걸 알 수 있다.
정수만 뽑아오는 frac이란 함수를 만든것도 인상깊다.


## Refer
[자바스크립트 물결 연산자](http://www.phpschool.com/gnuboard4/bbs/board.php?bo_table=tipntech&wr_id=74574)
