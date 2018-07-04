## Question
http://www.codewars.com/kata/534d0a229345375d520006a0/train/javascript
Write a function that determines if given number is a power of two. A power of two means a number of the form 2^n where n is an integer, i.e. the result of exponentiation with number two as the base and integer n as the exponent. I.e. 1024 is a power of two: it 2^10.
```javascript
isPowerOfTwo(4096) // -> true

isPowerOfTwo(333)  // -> false
```
Pay attention: hidden tests are using extremmely big numbers

## My Solution
```javascript
function isPowerOfTwo(n){
    if(n==2){return true;} 
    else if(n%2==1){return false;}
    else {return isPowerOfTwo(n/2);}
}
```
> 처음엔 재귀함수를 돌 때 앞에 `return`을 쓰지 않으니 
> 마지막에 불리우는 `return`문에서 함수를 빠져나가는게 아니라 재귀함수를 빠져나가버렸다.
> 그래서 계속 `undefined`가 나왔다.

## @BinaryPanda 's Solution
```javascript
function isPowerOfTwo(n) {
  return n && !(n & (n - 1));
}
```
>이진법 연산이다. 이런 사람들 보면 내가 미워진다.

```
For example: 
 1 is 000001
 2 is 000010
 4 is 000100
 8 is 001000
16 is 010000
32 is 100000
```
So, we need a way to verify that only a single digit is set. A bitwise and (the single &) will compare the digits in the positions they are in. So 10 & 01 is 00, but 11 & 10 is 10. Only if both spots contain a 1, does the result contain a 1.

If a number is a power of two, subtracting one will result in something like this:
```
8 = 001000
7 = 000111
```
7 & 8 will be 0, because they share no 1's in the same spot. Then by using a !, we invert the answer.

What if the number is not a power of two? Like what about 7?

```
7 = 000111
6 = 000110
7 & 6 = 000110 (6)
```

## @PandaCoder's Solution
```javascript
function isPowerOfTwo(n){
    return Math.log(n)/Math.log(2) % 1==0;
}
```
