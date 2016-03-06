# javascript roadtrip part3

### 메모리
function을 그냥 쓰는것보다 변수에 할당해주면 그 변수가 불릴 때만 메모리에 할당됨(그냥 function쓰면 프로그램 로드될때 바로 메모리 할당)
```javascript
var diff = function diffOfSquares(a, b) {
    return a*a - b*b;
}; //뒤에 세미콜론 붙여주기

diff(9, 5);
```

### 익명함수
함수를 한 번만 쓸 때 유용
```javascript
var diff = function(a, b) {
    return a*a - b*b;
}

diff(4, 2)
```

## 함수에 함수 넘기기
```javascript
var greeting = function() {
    alert("Hi!")
};

closeTerminal(greeting);

function closeTerminal(message) {
    message();
}
```

## 즉시실행함수
```javascript
(function() {
    alert("haha");
})();
```

## Hoisting
변수들은 위로 쫙쫙 올린다.
```javascript
function sum(a,b) {
    var x = add(a*a, b*b);
    return x;

    function add(c,d) {
        var a = c+d;
        return a
    };
}

// 위 함수는 사실은 이렇게 로드된다.

function sum(a,b) {
    var x = undefined; //변수는 위로 호이스팅!
    function add(c,d) { // 함수 선언도 위로 호이스팅!
        var a = c+d;
        return a
    };
    
    x = add(a*a, b*b); //호이스팅 되었던 변수에 대입
    return x;
}
```

유념할 점은, Function Expressions는 호이스팅되지 않는다는것!
```javascript
function getNum() {
    var foo = function() {
        return 1;
    }

    return foo();

    var foo = function() {
        return 2;
    }
}

// 위 함수는 이렇게 로드된다.

function getNum() {
    var foo = undefined; // 변수만 위로 호이스팅
    var foo = undefined; // 얘도 마찬가지

    foo = function() { // 그 foo에 대입
        return 1;
    }

    return foo(); // 여기서 1 반환하고 끝나버림

    foo = function() { // 여기까지 오지 않는다.
        return 2;
    }
}
```

## Object Functionality
```javascript
var aquarium = {
    Nemo: {type: "fish", species: "clownfish"...},
    Dory: {type: "fish", species: "blue tang"...},
    addCritter: function(name, type, species) {
        this[name] = {type:type, species...}
        // 여기서 this는 'aquarium'을 가리킨다.
    }
}
```

## Object Construnctors
Object를 만드는 또 하나의 방법
```javascript
var shoe = {size:6, gender:"woman"};
var magicShoe = Object.create(shoe);
magicShoe.jewels = "ruby";
console.log(magicShoe);
```

Object를 생성하는 공장같은 `Constructor`를 만들기
```javascript
function Shoe(size, color, gender) { //대문자 사용
    this.size = size;
    this.color= color;
    this.gender= gender;

    this.putOn = function() {alert("hi")};
}

var beachShoe = new Show(10, 'red', 'woman'); // new 키워드로 생성
beachShoe.hasOwnProperty("color"); // true. 상속이 아니고 자체로 갖고있냐?
```

Constructor에 prototype 빼기. 위는 각 오브젝트마다 putOn 함수가 할당되어버리니 공통으로 빼서 묶는다.
```javascript
Shoe.prototype = {
    putOn: function() {alert("hi, color is"+this.color)},
    takeOff: function() {alert("ho")}
}
```

overriding prototype
```javascript
var cities = [["kansas", 300], ["Topeka", 100]];
var twister = new Tornado("F5", cities,200);
cities.push(["Olathe", 500]);

twister.constructor; // function(category, affected, wind) { this.category = category 어쩌구저쩌구}
twister.constructor.prototype; // Object {valueOf: function, toString: function...}
twister.__proto__; // 위랑 똑같음
```

# Javascript Best Practices
## conditional
```javascript
var isArthur = false;
var sth = isArthur? "참이다" : "거짓이다";
console.log("지금 상태:" + isArthur? "참이다" : "거짓이다"); //이렇게 하면 +가 먼저 실행되기에 참으로 가버린다. 오류.
console.log("지금 상태:" + (isArthur? "참이다" : "거짓이다")); //괄호 씌워주면 제대로 동작

/* 즉시실행함수 */
isArthur? function() {
        alert("true");
    }() : function() { //함수 뒤에 괄호 치는게 포인트
        alert("false");
    }();

/* 다중 적용 */
isArthur? (weapon = "excalbur", helmet="white"):
          (weapon = "longsword", helmet="black");

/* 분기 한번 더 타기 */
isArthur? (weapon = "excalbur", helmet="white"):
            isKing? (weapon = "longsword", helmet="black"):
          (weapon = "shortsword", helmet="black");
