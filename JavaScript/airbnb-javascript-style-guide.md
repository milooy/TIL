# Airbnb JavaScript Style Guide
https://github.com/airbnb/javascript
[한글판(아 내가 번역하려했는데 ㅠㅠ)](https://github.com/tipjs/javascript-style-guide)

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
```javascript
/* 문자열은 큰따옴표보다 작은따옴표 */
var name = 'Josh';

/* 80자 이상 문자열은 +를 사용하여 여러 줄로 */

var errorMessage = 'This is super long error \
어쩌구 저쩌구\
저쩌구 럴럴럴.'; // bad

var errorMessage = 'This is super long error'+
    '어쩌구 저쩌구'+
    '저쩌구 럴럴럴.'; // good

/* 프로그램적으로 문자열 연결할 때에는 Array.join()을 활용 */
items.join('</li><li>');
```

## Functions
```javascript
/* (if, while 등)블록 내에서는 함수 선언 대신 함수 할당을 해라. 브라우저마다 다른방식으로 해석 */
//bad
if(cur) {
    function test() {
        console.log('hi');
    }
}

//good
var test;
if(cur) {
    test = function test() {
        console.log('hi');
    }
}

/* 매개변수에 arguments라 쓰지 말자. 예약어이다. (함수 범위로 전달 될 arguments 객체 덮어씀) */
function hi(name, arguments) { //말고 args든 뭐든으로 써라

}
```

## Properties
```javascript
/* 속성 접근하려면 []대신 . */
var foo = nameArr['Josh']; //bad
var foo = nameArr.Josh; //good

/* 변수 사용하여 속성 접근시 [] */
var foo = nameArr[name]; //bad
```

## Variables
```javascript
/* 여러 변수 선언 시엔 하나의 var 사용 */
var items = getItems(),
    foo = true,
    zoo,
    hoo; // 정의되지 않은 변수를 마지막으로 선언

/* 변수 선언은 스코프 시작부분에서 */
function() {
    var name = 'foo';

    if(name) {
        //blabla
    }

    var foo = 3; //여기 두지 말고 맨 위에 두어라!
}
```

## 조건식과 등가식
- `==`, `!=`보단 `===`, `!==`를 사용


