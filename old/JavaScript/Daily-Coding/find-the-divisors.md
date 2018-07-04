# Daily Codewars #15
## Question
http://www.codewars.com/kata/544aed4c4a30184e960010f4/train/javascript
Create a function named divisors that takes an integer and returns an array with all of the integer's divisors(except for 1 and the number itself). If the number is prime return the string '(integer) is prime' (use Either String a in Haskell).

Example:
```javascript
divisors(12); //should return [2,3,4,6]
divisors(25); //should return [5]
divisors(13); //should return "13 is prime"
```
You can assume that you will only get positive integers as inputs.

## My Solution
```javascript
function divisors(integer) {
    var i=0, arr = [];
    for(n=2; n<Math.ceil(Math.sqrt(integer)); n++) {
        if(integer%n==0){
            arr.splice(i,0,n);
            if(integer/n!=Math.sqrt(integer)) arr.splice(i+1,0,integer/n);
            i++;
        }
    }
    return (arr.length!=0)? arr : integer + " is prime";
};
```
> 제곱근만큼 for문을 돌리며 정확한 위치에 한번에 들어가도록 짰다.

## @mortonfox's Solution
```javascript
function divisors(integer) {
  var res = []
  for (var i = 2; i <= Math.floor(integer / 2); ++i) if (integer % i == 0) res.push(i);
  return res.length ? res : integer + ' is prime'
};
```
> for문을 n/2만큼 돌려야 하지만, 간단하게 끝난다는 이점이 있다.

## Michaellaszlo's Solution
```javascript
function divisors(x) {
  var result = [];
  for (var a = 2; a*a <= x; ++a) {
    if (x%a == 0) {
      var b = x/a;
      result.push(a);
      if (b != a) {
        result.push(b);
      }
    }
  }
  if (result.length == 0) {
    return x+' is prime';
  }
  result.sort(function (a, b) {
    return a - b;
  });
  return result;
};
```
> sqrt안쓰고 저렇게 제곱근만큼 돌리기도 하네. 나중에 sort로 정렬하는 방법도 있겠구나!
