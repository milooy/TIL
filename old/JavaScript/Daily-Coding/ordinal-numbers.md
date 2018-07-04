# Daily Codewars #15
## Question
http://www.codewars.com/kata/52dda52d4a88b5708f000024/train/javascript
You know how sometimes there are two letters at the end of a number? Like 1st, 2nd, 3rd, and so on? Those numbers are called "ordinal numbers"; numbers used to refer to a position in a series. It might be useful to have a function that returns those two letters so we can print it out and what-have-you.

Your task is to write the ordinal(number, brief) function. number will be an integer, and brief will be an optional parameter. Sometimes 2nd and 3rd are shown as 2d and 3d, in certain fields (like legal or military stuff). So take this into account when you're writing your function. ordinal(number, brief) should return a string containing those two characters (or one character) that would be tagged onto the end of the number.

The units number (the last digit) should be used to determine the correct ordinal suffix. The following table should be used:

0  1  2  3  4  5  6  7  8  9
th st nd rd th th th th th th
If the "brief" notation is used, 2 and 3's suffix should be "d".

If the tens number (the second from last digit) is a 1 (from 10 to 19), the suffix should be "th".

Some examples would be: 1st 11th 111th 121st 20th 52nd 903d (brief), and so on...
```javascript
Test.assertEquals(ordinal(1), "st");
Test.assertEquals(ordinal(11), "th");
Test.assertEquals(ordinal(111), "th");
Test.assertEquals(ordinal(121), "st");
Test.assertEquals(ordinal(20), "th");
Test.assertEquals(ordinal(52), "nd");
Test.assertEquals(ordinal(903, true), "d");
```

## My Solution
```javascript
function ordinal(number, brief) {
  var num = number+'';
  var a = num.charAt(num.length-1);
  var b = num.charAt(num.length-2);

  if(b=='1') return 'th';
  else if(a=='1') return 'st';
  else if(a=='2') return brief? 'd' : 'nd';
  else if(a=='3') return brief? 'd' : 'rd';
  else return 'th';
}
```
> 맨뒤, 그 앞 수를 미리 구해두고
> 좁혀가며 return하는 간단한 방식이다.

## @neil9999's Solution
```javascript
function ordinal(number, brief) {
  var lastDigit = number % 10;
  var penultimateDigit = ((number - lastDigit) / 10) % 10;
  
  if(penultimateDigit === 1 || lastDigit === 0 || lastDigit >= 4) return "th";
  if(lastDigit === 1) return "st";
  if(brief) return "d";
  if(lastDigit === 2) return "nd";
  if(lastDigit === 3) return "rd";
}
```
> 맞아, %로 1의자리 수를 구하는게 더 대수학적이다.
> 각 리턴문을 한번씩만 쓰는것도 나보다 더 효율적인듯 하다.

## @ColbyDauph's Solution
```javascript
function ordinal(number, brief) {
  var n = ['th','st','nd','rd'],
      m = number % 100,
      k = ( n[( m - 20 ) % 10] || n[m] || n[0] );
  return (brief && k[1] == 'd') ? 'd' : k;
}
```
> 변태식들이 참 많다. 나도 이 경지로 나아가고 싶다.
