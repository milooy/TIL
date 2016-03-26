# Airbnb JavaScript Style Guide
https://github.com/airbnb/javascript
한글판(아 내가 번역하려했는데 ㅠㅠ)https://github.com/tipjs/javascript-style-guide

## types
```javascript
// primitive type은 값 직접 조작
var foo = 1,
    bar = foo;
bar = 9;
console.log(foo, bar); // 1, 9

// 참조형(complex)는 참조를 통해 값 조작
var foo = [1, 2],
    bar = foo;
bar[0] = 9;
console.log(foo[0], bar[0]); //9, 9
```

## Objects
```javascript
var item = new Object(); //bad
item = {}; //good. 리터럴 구문을 사용

/* 예약어보다 동의어 사용. 예약어를 키로 사용하면 IE8에서 동작 X */
var superman = {
    default: { clark: 'kent'}, //bad
    private: true, //bad

    defaults: { clark: 'kent'}, //good
    hidden: true, //good
}
```

## Arrays
```javascript
var items = new Array(); //bad
var items = []; //good. 리터럴 구문 사용.

/* 길이를 알 수 없는 경우엔 push */
arr[arr.length] = 'aa'; //bad
arr.push('aa'); //good

/* 배열 복사하고 싶을 땐 slice */
for(i=0; i<len; i++) { //bad
    itemsCopy[i] = items[i];
}

itemsCopy = items.slice(); //good

/* array-like object를 Array에 변환 */
var args = Array.prototype.slice.call(arguments);
```

## Strings
``


