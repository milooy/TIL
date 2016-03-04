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
