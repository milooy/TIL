## Javascript Design Pattern
## 1. 개요
- JSLint (JShint)
- console.dir

## 2. 기초
- 전역 변수 최소화 
- 단일 var 패턴
```javascript
var foo=1,
    a=0,
    b=foo+a;
```
변수 선언시 초기 값을 주어 초기화하는 것 역시 좋은 습관

- for loop
```javascript
for(var i=0, max=myArray.length; i<max; i++) {
    //sth
}
```
length값을 한 번만 구하기. (하지만 루프 내에서 돔이 추가되거나 해서 계속 length를 구해야 할 땐 제외)

```javascript
var i, myArray = [];
for(i=myArray.lengthl i--) {
    //myArray를 다루는 코드
}
```
for문 미세 최적화(max라는 변수 안 씀, 카운트를 거꾸로 해서 0으로 내려가서 조금 더 빠름)

```javascript
var myArray = [],
    i = myArray.length;
while(i--) {
    //myArray를 다루는 코드   
}
```
이런 미세 최적화는 성능이 결정적 요소가 되는 작업에서만 차이가 두드러짐

- for-in 루프
배열이 아닌 객체를 순회할 때만 사용. (배열엔 일반 for loop 권장)
```javascript
for(var i in man) {
    if(man.hasOwnProperty(i)) {
        console.log(man[i]);
    }
}
```
`hasOwnProperty`하지 않으면 혹 프로토타입에서 추가한 객체들도 나올 수 있다.
객체와 객체 프로토타입 체인의 내용을 보장할 수 없다면 이 확인을 추가해라.

- 내장 생성자 프로토타입 확장하기/확장하지 않기
확장 안하는게 최선. 다른 개발자들이 혼동할 가능성 높음.

- switch 패턴
```javascript
switch(foo) {
case 0:             // 들여쓰기를 이러면 가독성 향상
    result = "zero";
    break;          // break 꼭 쓰기
case 1:
    result = "one";
    break;
default:            // default 꼭 쓰기
    result = "zero";
    break;
}
```

- ==대신 ===사용하기
코드의 일관성을 지키고 읽는데 들어가는 정신적 수고를 덜어줌(이건 의도된 ==인가?)

- parseInt()
```javascript
var month = "06";
month = parseInt(month, 10);
```
뒤에 10을 써주지 않으면 8진수로 변환해버림(앞에 0붙어있어서)
혹은 
```javascript
+"08"; //이건 8이 된다.
Number("08")//8
```
이렇게 변환해도 된다. parseInt보다 빠른다.

- 명명 규칙
    + 생성자는 대문자로 시작하기: `var adam = new Person();`
    + 단어 구분: 함수는 카멜케이스, 변수는 언더바로 구분해도 좋다. 상수나 전역변수는 모두 대문자. 내부에서만 쓰는 메서드 앞엔 언더바(`_getFirst: function()...`)

## 3. 리터럴과 생성자
- 정규식
```javascript
var re = /\\/gm; //정규식 리터럴
var re = new RegExp("\\\\", "gm"); //생성자
```
리터럴을 권고

## 4. 함수
- 콜백과 유효범위
```javascript
var myApp {};
myApp.color = 'green';
myApp.paint = function(node) {
    node.style.color = this.color;
}

var find = function(callback) {
    if(typeof callback === 'function') {
        callback(found);
    }
}
find(myapp.paint); //에러. this.color가 저 스코프 내에 없기 때문.

var find = function(callback, callback_obj) {
    if(typeof callback === 'function') {
        callback(callback_obj, found); //객체를 전달해주고 바인딩해준다.
    }
}
find(myApp.paint, myApp); //혹은 call,apply를 쓴다.
```

- 함수 반환하기
```javascript
var setup = function() {
    alert(1);
    return function() {
        alert(2);
    };
};
var my = setup();//1.반환된 함수를 감싸고 있기 때문에 클로저 생성.
my(); //2

var setup = function() {
    var count = 0;
    return function() {
        return (count += 1);
    };
};
var next = setup();
next(); //1
next(); //2
next(); //3
```
클로저는 반환되는 함수에선 접근 가능하지만 코드 외부에선 접근할 수 없기 때문에, 비공개 데이터 저장을 위해 사용 가능.

- 자기 자신을 정의하는 함수
```javascript
var scareMe = function() {
    alert("boo1");
    scareMe = function() {
        alert("boo2");
    };
};
scareMe(); //boo1
scareMe(); //boo2
```
함수가 어떤 초기화 준비 작업을 단 한 번만 수행할 경우에 유용.
단점은 자기 자신을 재정의한 이후엔 이전에 원본 함수에 추가했던 프로퍼티들을 모두 찾을 수 없게 됨.

- 즉시 실행 함수
```javascript
(function() {
    alert('watch out');
}());

(function() {
    alert('watch out');
})(); // 위랑 같지만 jslint는 위를 더 선호
```
함수가 선언되자마자 실행.
초기화 코드에 유효범위 샌드박스를 제공. 모든 코드를 지역 유효범위로 감싸고 밖으로 새어나가지 않게 함.

```javascript
(function(who, when) {
    alert('watch out, '+ who);
}('Josh', new Date()));

//응용
(function(global) {
    //전역 객체를 'global'로 참조
}(this));
```
즉시실행함수 인자전달
