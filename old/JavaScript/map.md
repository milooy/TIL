#Javascript Map
```
>The map() method creates a new array with the results of calling a provided function on every element in this array.
```

```javascript
arr.map(callback[, thisArg])
```

##Examples
```javascript
//1
var numbers = [1, 4, 9];
var roots = numbers.map(Math.sqrt); //[1, 2, 3]
var roots = numbers.map(function(num){
    return num*2;
}); //[2,8,18]

//2
var map = Array.prototype.map;
var a = map.call('Hello World', function(x) { return x.charCodeAt(0); });
// a now equals [72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100]

##reference
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map