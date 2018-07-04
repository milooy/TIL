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
```

## logical Assignment
```javascript
this.swords = this.swords || []; // this.swords가 있으면(참이면) 넣고 없으면 빈 어레이 생성

var result = undefined && 42; //undefined나온다. short-circuit때문. 앞에 false가 나오면 무슨 연산을 해도 false니까.
var result = "king" && "Arthur"; // Arthur나온다. 둘 다 참이면 뒤에꺼가 나옴
var weapon = isKnight && retrieveSword("katana"); // 나이트가 맞으면, 뒤에꺼가 나오고, 나이트가 아니면 false반환된다.
```

## Switch
```javascript
switch(req) {
    case 1:
        this.weapon = 1;
        break;
    case 2: //이렇게 쌓을 수 있다.
    case 3: 
        this.weapon = "multy"
        break;
}
```

## Loop Optimization
인덱스에 접근할 필요가 있을 때만 for문 쓰고 아니면 for in쓰자.
```javascript
var x = treasure.necklaces.length; //미리 cache해놔야 매번 접근하지 않는다.
for(var i=0; i<x; i++) {
    console.log(treashre.necklaces[i]);
}

// 혹은
for(var i=0, x = treasure.necklaces.length; i<x; i++) { //for안에서만 쓸꺼니까 여기서 정의
    console.log(treashre.necklaces[i]);
}

Array.prototype.removeAll = function() {
    // 여기 enumerable을 추가해주지 않으면 for in 루프에서 이것까지 다 센다!
}

var list = treasure.necklaces;
for(p in list) {
    console.log(list[p]); //removeAll메서드까지 찍힘 ㅠㅠ
}
```

## Script Execution
`async`키워드를 써주면 js가 위에 있어도 HTML렌더링이 끝난 다음에 받는다.
```html
<script src="어쩌구" async></script> 
```

## Performance Tips
1. 공유되는 메서드들은 prototype 사용하기
2. DOM에 접근하는 것들(document.getElementById(), appendChild 등등 ) 추가될때마다, DOM에 접근하게 되고 전체 문서가 reflow가 된다. 느리다. -> `frament`사용
```javascript
var frament = document.createDocumentFragmant();
for(어쩌구저쩌구) {
    fragment.appendChild(element);
}
list.appendChild(fragment); //한번에 대입!
```
3. String Concatenation
```javascript
var turn = "";
turn += "hey1"; //간단한거 결합할땐 이거 써라. 웬만한 브라우저에서 제일 잘 최적화 되어있음.

// array의 인자들처럼 많은걸 결합할땐 join을 써라.
var arr = [1, 2, 3, 4];
arr.join("\n");
```

## Measuring Performance
### 시간 재기
`console.time`을 활용한다.
두 타이머를 묶으려면 parameter labels가 같아야 한다.
브라우저별로 다를 수 있다. 중첩도 가능(하지만 중첩하면 밖의 타이머는 안의 타이머까지 한번 더 더한다!).
그리고 돌릴때마다 미세하게 속도가 다르다.
```javascript
console.time("Time to add: " + arr.length);
for(어쩌구) {
    저쩌구
}
console.timeEnd("Time to add: " + arr.length);
// Time to add 3: 0.036ms 자동으로 계산해서 :뒤에 넣어준다.
```

### 시간 관련 클래스로 시간 재기
```javascript
var rightNow = new Date();
console.log(rightNow); // Mon Apr 10 2014 17:02:31 GMT-0500 (EST)
console.log(+rightnow); // 1392072557874
// 위는 console.log(new Number(rightNow))와 같다.

var rightNow = +new Date();
var endTime = +new Date();
console.log(endTime - rightNow); //87874
```

스피드 테스트 클래스 만들기
```javascript
function SpeedTest(tstImplement, testParams, repetitions) {
    this.testImplement = testImplement;
    this.testParams = testParams;
    this.repetitions = repetitions || 10000;
}

SpeedTest.prototype = {
    startTest: function() {
        var beginTime, endTime, sumTimes = 0;
        for(var i=0, x=this.repetitions; i<x; i++) {
            beginTime = +new Date();
            this.testImplement(this.testParams);
            endTime = +new Date();
            sumTimes ++ endTime - beginTime;
        }
        this.average = sumTimes / this.repetitions;
        return console.log("Average execution across " +this.repetitions+": "+this.average);
    }
}

var noBP = function(listOfParams) {
    for(var i=0l i<listOfParams[0].length; i++) {
        어쩌구
    }
}

var noBPtest = new SpeedTest(noBP, arr, 10000);
bTest.startTest();
```

## The Crystal of Caution
`===`은 타입까지 검사한다.
```javascript
'4' == 4 // true
'4' === 4 // false

true == 1 //true
false == 0 //true
true === 1 //false
false === 0 //false

"\n \n \t" == 0 //true
```

`instanceOf`로 상속받아온거에 있는지 확인(프로토타입 포함)
```javascript
kingsMail instanceof Armor; // true
```

### Exceptions
런타임 에러는 `try~catch`로 잡는다.
에러가 나지 않지만 우리가 예상할 수 있는 오류상황에서는 try문 안에서 `throw`해준다.
`finally`는 try가 success되든, failure되든 마지막에 불려짐.
```javascript
alert(alarm); //알람 변수가 없는 상태에서 호출. 런타임 에러.이건 그냥 콘솔에 자동으로 나오지 않음. 잡아야 한다. 

try {
    alert(alarm);
    if(list === undefined) {
        throw new ReferenceError();
    }
} catch(error) {
    try { //이 안에 중첩해도 됨.

    } 
    alert("에러다: "+error);
    if(error instanceof ReferenceError) {
        alert("레퍼런스 에러다");
    }
    if(error instanceof TypeError) {
        alert("타입에러다!");
    }
}
finally {
    console.log(list);
}
```

### Stuff that sucks
1. `with`키워드는 파라미터의 encapsulated된 환경을 받아 그 안 블록 안과 합쳐 새로운 `local`스코프를 만든다. 이는 processing-expensive하다.
이게 뭐지.
```javascript
var drawbridge = {
    soldiers: 8,
    capacity: 20,
    open: function() {
        alert("bang");
    }
}

with(drawbridge) {
    open(); //뱅 나온다!

    close = function() { //생각처럼 안돌아감
        alert("ahahahah")
    }
}
```

2. `eval`은 string을 파라미터로 받아 그 스트링을 코드처럼 생각하여 execute한다.
함부로 쓰지 말아라.
```javascript
function foo(number, moto) {
    eval("haha" + number + ".moto='" + moto+"'");
}

foo(1, "The Kings' Own"); // haha1.moto = 'The Kings's Own'이라 되버려 '가 중첩되어 오류가 난다.
```

3. `JSON.parse()`는 JSON이 accepted될때만 써라
```javascript
JSON.parse(regiments);
```

4. 웬만하면 한줄짜리 코드라도 {}를 빼먹지 말아라.

5. 
