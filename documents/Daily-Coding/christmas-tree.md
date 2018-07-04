# Daily Codewars #18
## Question
http://www.codewars.com/kata/52755006cc238fcae70000ed/train/javascript
Create a function `christmasTree(height)` that returns a christmas tree of the correct height

`christmasTree(5)` should return:
```
    *    
   ***   
  *****  
 ******* 
*********
```
Height passed is always an integer between 0 and 100.

Use `\n` for newlines between each line.

Pad with spaces so each line is the same length. The last line having only stars, no spaces.

## My Solution
```javascript
function christmasTree(height) {
    var arr = [];
    for(i=1; i<=height; i++){
        var space = Array(height-i+1).join(' ');
        arr.push(space + Array(2*i).join('*') + space);
    }
    return arr.join('\n');
}
```
> ECMA6부터 String.repeat을 지원한다. 'a'.repeat(3)처럼 쓸 수 있다.
> 하지만 지금은 아직 보편적이지 않으므로, Array(n).join('a')의 꼼수를 썼다.
> 처음에는 space를 '\xa0'로 join시켰는데 값이 똑같이 나오는데도 테스트가 통과 안해서 혹시 ' '로 바꿨더니 바로 통과되어 허무.

## @noLan's Solution
```javascript
function christmasTree(height) {
  var tree = [];
  for(var i = 1; i <= height; i++) {
    tree.push(" ".repeat(height - i) + "*".repeat((i - 1) * 2 + 1) + " ".repeat(height - i));
  }
  return tree.join("\n");
}

String.prototype.repeat = function(n)
{
    return new Array(n+1).join(this);
}
```
> 이 사람은 내가 한 Array(n)에 넣는걸 String 프로토타입에 확장시켜 집어넣었다.
