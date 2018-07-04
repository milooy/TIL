# Daily Codewars #26
## Question
[codewars link](http://www.codewars.com/kata/hello-w-dot-dot-dot-wait-what/javascript)
In order to stop too much communication from happening, your overlords declare that you are no longer allowed to use certain functionality in your code!

Disallowed functionality:

- Strings
- Numbers
- Regular Expressions
- Functions named "Hello", "World", "HelloWorld" or anything similar.
- Object keys named "Hello", "World", "HelloWorld" or anything similar.
Without using the above, output the string "Hello World!" to prove that there is always a way.

> String, Numbers, Regex, 그리고 hello world랑 비슷한 문자가 들어가는 function, object key를 쓰지 말고 Hello world!를 출력하는 문제이다.

## My Solution
```javascript
var abc = function() {
  var obj = {
    dlroW:x, olleH:hello}
  var x = new String();
  String.constructor = Object.keys(obj).shift();
  console.log(x.constructor);
  var w1 = Object.keys(obj).shift();
}
var helloWorld = abc;
```
> object의 키값으로 넣고, 그걸 reverse하는 식으로 해볼까 했는데.
> 계속 걸림돌이 되는 '!'의 문제.
> 결국 이 문제는 잠시 keep해놓기로... ㅠㅠ 빠가야로
