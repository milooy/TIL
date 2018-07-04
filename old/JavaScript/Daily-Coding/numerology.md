# Daily Codewars #12
## Question
http://www.codewars.com/kata/525b4164eb636fb2f90002a0/train/javascript
```
In numerology, every number has a certain meaning
that expresses someones connection to the universe!
This single digit integer can be calculated by
adding up every digit in the birthdate: year, month, and date.
Each time the sum exceeds 10, add up the 2 digits.

For example, new Date('06/14/2010') = 5
So, what is your number?
```

## My Answer
```javascript
function solution(date){
    var newDate = String(date.getFullYear())+String(date.getMonth())+String(date.getDate());
    var sum = 1;
    for(var i=0; i<newDate.length; i++) sum += +newDate.charAt(i);
    return (sum>9)? +sum.toString().charAt(0)+ +sum.toString().charAt(1) : sum;
}
```
- 처음에는 `date.toISOString()`으로 반환된 `2010-06-13T15:00:00.000Z`를
- T를 기준으로 split하고
- 앞의 숫자들에서 정규표현식으로 숫자만 뽑아와 넣은 배열을
- pop()하며 하나씩 더하는 방법을 썼었다.
- 그래서 답을 구했더니 이상하게 6월 14일인데 6월 13일이라고 나오는 문제가 있었다.
- 알고보니 지역에 따라 하루 전날로 나오는 곳도 있고 넣은대로 나오는 곳도 있다더라.
- 그래서 `toXXXString`과 같은 메서드는 쓰지 못하고, `getXX`로 받아오는 걸로 교체하였다.
- `sum`에 처음 1을 넣는 것은 `date.getMonth`가 0부터 카운팅하기 때문이다.
- String으로 바꿨다가 Number로 바꿨다가 다시 String의 charAt메서드를 쓰는 식이라 비효율적이라 맘에 썩 들진 못한 코드다.

## minus7's Answer
```javascript
function solution(date){
  var sum = date.getDate() + date.getMonth()+1 + date.getFullYear();
  while(sum > 9) sum = Math.floor(sum/10) + (sum%10);
  return sum;
}
```
- `Date('06/14/2010')`이라 생각해보자.
- 2010+14+6+1 =2030은 10이상이니 10으로 나누고 나머지를 버림한 203과 나머지 0을 더하면 203... 그걸 다시 반복.
- 대다나다.

## kimhyunkang's Answer
```javascript
function solution(date){
    return (date.getFullYear() + date.getMonth() + date.getDate() - 1) % 9 + 2;
}
```

## Refer
https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date
http://blog.outsider.ne.kr/361
