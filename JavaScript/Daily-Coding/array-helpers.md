# Daily Codewars #13
## Question
http://www.codewars.com/kata/525d50d2037b7acd6e000534/train/javascript
```javascript
This kata is designed to test your ability to extend the functionality of built-in ruby classes. 
In this case, we want you to extend the built-in Array class with the following methods:
square(), cube(), average(), sum(), even() and odd().

var numbers = [1, 2, 3, 4, 5];
numbers.square(); // must return [1, 4, 9, 16, 25]
numbers.cube(); // must return [1, 8, 27, 64, 125]
numbers.average(); // must return 3
numbers.sum(); // must return 15
numbers.even(); // must return [2, 4]
numbers.odd(); // must return [1, 3, 5]
```


## My Answer
```javascript
Array.prototype.square = function() {
    return this.map(function(item) {
        return Math.pow(item, 2);
    });
}

Array.prototype.cube = function() {
    return this.map(function(item) {
        return Math.pow(item, 3);
    });
}

Array.prototype.average = function() {
    if(this.length==0){return NaN}
    return this.reduce(function(p, c) {return p+c;}) / this.length;
}

Array.prototype.sum = function() {
    if(this.length==0){return 0}
    return this.reduce(function(p, c) {
        return p+c;
    });
}

Array.prototype.even = function() {
    return this.filter(function(item) {
        return item%2==0;
    });
}

Array.prototype.odd = function() {
    return this.filter(function(item) {
        return item%2==1;
    });
}
```

reduce에 빈 배열이 넘어왔을 때의 코드를 따로 처리했는데
```javascript
Array.prototype.average = function () { return this.sum() / this.length; }
Array.prototype.sum     = function () { return this.reduce(function(a, b) { return a + b; }, 0); }
```
사실 이렇게 두번째 인자로 처리만 해줘도 되었다.


## Refer
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
