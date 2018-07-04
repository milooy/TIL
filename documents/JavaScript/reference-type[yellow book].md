# Javascript Reference Type(참조타입)
#### javascript for web developers ch.5

## 참조타입
- 참조 값(객체)는 특정 '참조 타입'의 인스턴스!
- 참조타입: 데이터와 기능을 그룹으로 묶는 구조
- 참조타입을 클래스라 부르지 마세요.

## Object 타입
- 가장 많이 쓰임
```javascript
//1 (잘 안씀)new연산자로 생성하기
var person = new Object();
person.name = "Lezhin";
//2 (많이 씀)객체 리터럴 표기
var person2 = {
    name : "Lezhin",
    age: 13 
};
person2.age2 = 14;
alert(person2[age2]); //대괄호 표기법. 프로퍼티 이름에 변수랑 공백 등 쓸 수 있다. 
```

## Array 타입
```javascript
//1(잘 안씀)Array 생성자로 생성
var colors = new Array();
//2(많이씀)배열 리터럴 표기법
var colors = ["red", "blue", "green"];
alert(colors[0]);

//굳이 배열 날리고 싶을때
colors.length = 0;
//배열 마지막에 데이터 추가
colors[colors.length] = "black";

//객체와 배열을 구분하기- 1. instanceof연산자
if(value instanceof Array) {...}; //근데 실행컨텍스트가 여러개 있다면 의도치않은 결과
//객체와 배열을 구분하기- 2. isArray()메서드
if(Array.isArray(value)) {...}; //이걸로 써랑!

//변환메서드
var colors = ["red", "blue", "green"];
alert(colors.toString());   //red, blue, green
alert(colors.valueOf());   //red, blue, green 위 두개는 명시적으로 배열의 각 슬롯을 쉼표로 구분한 문자열을 반환

//다른 구분자를 써서 배열을 문자열로 나타내기(꽤 유용히 쓴다)
alert(colors.join("||"));   //red||green||blue

//스택
colors.push("black", "olive");  //5
colors.pop();   //"olive"
//큐
colors.push("kakao");   //5
colors.shift()  //"red"

//정렬메서드
var values = [1, 2, 3, 4, 5];
values.reverse();   //5,4,3,2,1
var values = [0, 1, 5, 10, 15];
values.sort();  //0,1,10,15,5 예상대로 안나온다!->비교함수를 넘겨야함
function compare(a, b){
    if(a<b){
        return -1;
    } else if(a>b){
        return 1;
    } else {
        return 0;
    }
}   //거꾸로 하면 역순정렬
values.sort(compare);
//단순히 숫자형값 반환하는 객체에선 더 단순히 비교함수 만들 수 있다
function compare(val1, val2) {
    return val2-val1;
}

//조작 메서드
var lc = ["lezhin", "com"];
var lc2 = lc.concat("inc", ["good", "bravo"]);  //lezhin,com,inc,good,bravo의 새 배열 반환
var lc3 = lc.slice(1);  //com
var lc4 = lc2.slice(1, 3);  //com, inc
//강력한 메서드 splice(인덱스부터, 몇개를삭제, 삽입할데이터)
var nums = [1,2,3,4];
var removed = nums.splice(0,1); //nums는 2,3,4 removed는 1
removed = nums.splice(1,0,"a","b"); //nums는 2,a,b,3,4 removed는 빈 배열

//위치 메서드
var nums = [1,2,3,4,5,4,3,2,1];
alert(nums.indexOf(4)); //3
alert(nums.lastIndexOf(4)); //5

//반복 메서드 - 많이 쓴다 
var everyResult = nums.every(function(item, index, array) {
    return (item>2);
}); //false

var someResult = nums.some(function(item, index, array) {
    return (item>2);
}); //true

var filterResult = nums.filter(function(item, index, array) {
    return (item>2);
}); // [3,4,5,4,3]

var mapResult = nums.map(function(item, index, array) {
    return item*2;
}); // [2,4,6,8,10,8,6,5,2]

nums.forEach(function(item, index, array) {
    console.log(item);
}); //해당 배열에서 for문을 실행한 것과 마찬가지 

//감소 메서드(많이 쓴다) - 배열을 순회하며 콜백함수를 실행하고 값을 하나 만들어 반환. 두번째 인자는 initial value
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
var values = [1,2,3,4,5];
var sum = values.reduce(function(prev,cur,index,array) {
    return prev + cur;
}); //15
```
- 배열 길이보다 큰 인덱스 지정 -> 배열 길이가 자동으로 늘어남, 빈슬롯엔 undefined

## Date 타입
```javascript
var now = new Date(Date.parse("May 25, 2004"));//넘긴 문자열이 올바르지 않으면 NaN반환
var now = new Date("May 25, 2004");//사실 이면에서 Date.parse호출하므로 위에거랑 같음.

//코드의 프로파일링 작업 측정 
var start = Date.now(); //현재 시간을 밀리초로 반환. +new Date()해서 숫자로 변환도 가능
doSomething();
var stop = Date.now(), result = stop-start;
/*브라우저에 따라 각 메서드가 반환하는 형식에 상당한 차이 있다*/

//날짜 표시 메서드
toDateString(); //요일,월,일,년
toTimeString(); // 시, 분, 초, 타임존
toLocaleDateString();
...
```

### tip from @fallroot
- .toLocaleString같은건 잘 안씀
- month구할때 1월이 0이라는거 주의
- 일요일이 0
- 타임스탬프 뽑을때 말고는 잘 안씀
- Moment.js 많이 씀.
- 브라우저마다 많이 다르다.
- 사파리는 yyyy-mm-dd이런식 안지원해서 /로 써야한다.
- comic date코드 살펴봐라 
- 일일코딩 - 두 날짜 주고 며칠 전 후 구하기

## RegExp 타입
[regular expression](./regular-expression.md)항목 참조

### tip from @fallroot
- [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)에 있는 항목 정독하는게 좋음.
- replace에서도, split에서도 정규식 사용 가능
- base.js에서 정규식 찾아서 봐라 commaize <<어려운 정규식
- 코드에서 정규식 찾아서 봐라

## Function 타입
- 함수가 사실 객체. 
- 모든 함수는 Function 타입의 인스턴스. 프로퍼티와 메서드가 있다.
- js엔진은 코드를 평가할 때 제일 먼저 함수 선언을 찾은 다음 이들을 맨 위에 올린다.(hoisting)
- 함수 내부에는 arguments, this라는 특별한 객체가 있다.
    + arguments : 배열과 비슷한 객체. 함수에 전달된 매개변수를 모두 포함.
        * callee: arguments객체의 소유자인 함수를 가리키는 포인터
- 모든 함수에 공통인 프로퍼티:
    + length: 함수가 넘겨받을 것으로 예상하는 이름 붙은 매개변수의 숫자
    + prototype: 모든 참조 타입의 인스턴스 메서드가 존재하는 곳.
        * toString()이나 valueOf()같은 메서드 존재.
        * 열거할 수 없는 프로퍼티라 for-in문에 나타나지 않음.
- 함수 메서드
    + apply(): 객체/배열 넘김
    + call(): 매개변수 각각 나열
    + 둘다 함수 내부에서 this객체의 값을 바꾸는 역할
    + bind(): 새 함수 인스턴스를 만드는데 그 this는 bind() dp wjsekfehls rkqt
    
```javascript
//함수 선언
function sum(n1, n2) {
    return n1 + n2;
}
//함수 표현식
var sum = function(n1, n2) {
    return n1 + n2;
};

//이러면 에러남! 선언식으로 하면 안에러남
alert(sum(10, 10));
var sum = ....;

//함수가 함수를 반환 <<이 패턴 매우 유용
function createComparisonFunction(propertyName) {
    return function(obj1, obj2){
        var val1 = obj1[propertyName];
        var val2 = obj2[propertyName];

        if(val1<val2){
            return -1;
        } else if(val1>val2){
            return 1;
        } else {
            return 0;
        }
    };
}
var data = [{name: "Zake", age:28}, {name: "Nick", age:28=9}];
data.sort(createComparisonFunction("name"));
alert(data[0].name);    //Nick
data.sort(createComparisonFunction("age"));
alert(data[0].name);    //Zake

//함수의 내부 구조
return num * arguments.callee(num-1); //처럼 하면 재귀 함수가 함수 이름에 의존하는 약점 극복가능. strict mode에서는 에러남.

//apply(), call()
function sum(n1, n2){
    return n1+n2;
}

function callSum1(n1, n2){
    return sum.apply(this, arguments);  //arguments객채 넘김
}
function callSum2(n1, n2){
    return sum.apply(this, [n1, n2]);  //배열 넘김
}
function callSum3(n1, n2){
    return sum.call(this, n1, n2);
}

//this바꾸기
window.color = "red";
var o = {color:"blue"};

function sayColor(){alert(this.color)};
sayColor(); //red
sayColor.call(this);    //red
sayColor.call(window);    //red
sayColor.call(o);    //blue

var objectSayColor = sayColor.bind(o);
objectSayColor(); //blue
```

## 원시 래퍼 타입
```javascript
//글자 메서드
var stringValue = "hello world";
stringValue.charAt(1); //e
stringValue[1]; //e

var result = stringValue.concat("js", "!"); //근데 사실 +연산자로 하는게 더 빠름.
alert(result);  //hello worldjs!

var stringValue2 = "      hello world       ";
stringValue2.trim(); //hello world

stringValue.toUpperCase();
stringValue.toLowerCase();

var pattern = /.llo/;
var matches = stringValue.match(pattern);   //배열 반환. pattern.exce(text)와 같다. 
matches[0]; //"hello"
var pos = stringValue.search(pattern);
alert(pos); //0

//문자열 일부 바꾸기
text.replace("at", "ond"); //첫번째 at을 찾아 ond로 바꿈. 정규표현 /at/g 쓰면 모두 바꿈.

//HTML에서 사용할 수 있도록 특수문자를 이스케이프
alert(hemlEscape("<p class=\"greeting\">Hello world!</p>"));

//텍스트를 구분자를 기준으로 분리해서 배열에 담아 변환
var colorText = "red,blue,green";
var colors1 = colorText.split(","); //["red", "blue", "green"]
var colors2 = colorText.split(",", 1); //["red"]
```

### 내장된 싱글톤 객체
```javascript
//Math 객체
Math.E;
Math.PI;
Math.sqrt(num);

Math.max(3,54,32);  //54
var values = [1,2,3,4,5];
var max = Math.max.apply(Math, values);

Math.ceil(25.6);    //26 올림
Math.floor(25.6);   //25 내림
Math.round(25.6);   //26 반올림

Math.random();  //0과 1사이 난수 반환. 0이나 1은 제외
number = Math.floor(Math.random() * total_number_of_choices + first_possible_value);    //원하는 범위의 정수 얻기
number = Math.floor(Math.random() * 9 + 2);    //2와 10 사이의 난수. 경우의 수는 9고 작은값은 2
var colors = ["red", "green", "blue", "yellow"];
var color = colors[selectFrom(0, colors.length-1)]; //가장 큰값과 작은값 난수얻기
```
