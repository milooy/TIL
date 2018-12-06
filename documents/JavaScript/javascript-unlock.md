## Short-circuit evaluation 활용하기

 활용.
```js
/* 함수 인수 디폴트 값 */
function stub(foo) {
    return foo || "default value";
}

function stub(foo = "default value";) { // ES6
}

/* 조건부 호출 */
var age = 20;
age >= 18 && console.log("참일때 호출된다");
age >= 18 || console.log("거짓일때 호출된다");

function fn(cb) {
    cb && cb(); // 함수가 제공될 때만 함수 호출
}
```

## 화살표 함수
```js
var that = this;
button.addEventListener("click", function() {
    that.onClick(); // 크로스-커팅 문제: 외부에 핸들러를 바인딩하거나 클로저를 통해 변수로 전달해야함
});

button.addEventListener("click", () => {
    this.onClick(); // 화살표 함수 쓰면 자신의 컨텍스트를 생성하는 대신 주변 객체의 컨텍스트를 사용 가능
    });
```

## 메서드 정의
```js
var foo = {
    bar: function(a, b) { // 기존
    }
}

let foo = {
    bar (a, b) { // ES6에선 함수 키워드와 콜론을 제거 가능
    }
}
```

## 나머지 연산자(rest operator)
```js
let cb = function(a, b, ...args) {
    console.log(a, b, args);
}
cb("foo", "bar", 1, 2, 3); // foo bar [1, 2, 3]

let [bar, ...others] = ["bar", "foo", "baz", "qux"];
console.log([bar, others]); // ["bar", ["foo", "baz", "qux"]]
```

## 펼침 연산자
```js
let args = [2015, 6, 17];
let relDate = new Date(...args); // 배열 요소를 인수로 확산 가능
```

## 템플릿 리터럴
멀티라인 문자열은 js에서 사용하기 힘들었음. ES6에 Template literal 도입되고 편해짐.
```js
var foo = "hi";
var str = `첫번째 줄 \n
두번째 줄 \n
변수 참조 가능: ${foo}
`
```

## ES6의 배열 메서드
```js
/* 배열 채우기 */
var arr = Array(3);
console.log(arr.fill("foo")); // ["foo","foo","foo"]

/* 배열에 인자 있나 검사 */
arr.includes("foo"); // arr.indexOf(val) !== -1 과 동일

/* 배열 찾기 */
arr.find(val => {
    return val.length < 3; // Array.prototype.filter는 배열이나 null을 반환하고 이건 하나의 요소를 반환
});
```

## 객체 탐색하기
```js
for(key in options) {
    console.log(key, options[key]); // 이러면 객체 prototype에 있는것까지 for문을 돌고 말아부려. 그래서 Object.proptotype.hasOwnProperty메서드로 해결했어야 했다.
}

Object.keys(options).forEach(key => {
    // 이러면 나 자신만의 문자열 키-값만 검색함. 성능도 더 좋다.
    });
```

## 배열 같은 객체의 열거
arguments나 nodeList(node.querySelectorAll, document.forms)같은 객체는 배열처럼 보이지만 실제로는 배열이 아님. 배열과 유사하게 length속성 가지며 for루프로 반복할 수 있지만 배열 조작 메서드(map 등)을 지원 안 함.
```js
var nodes = document.querySelectorAll("div");
var arr = Array.prototype.slice.call(nodes); // 배열 변환법 1
var arr = [].slice.call(nodes); // 배열 변환법 2
var arr = Array.from(nodes); // 배열 변환법 3

```

## ES6의 컬렉션
구문이 클래스 기반처럼 보이지만, 사실은 기존 프로토타입의 신택틱 슈거다.
```js
class ConcreteClass extends AbstractClass {
    constructor() {
        super();
        this.bar = 3;
    }
    baz() {
        return "baz";
    }
}
let instance = new ConcreteClass();
instance.bar; // 3
instance.baz(); // baz
```

## 돔 스크립팅과 AJAX

- `document.querySelector('#bar')`로 발견된 요소는 NodeList로 표현된다. 배열처럼 보이지만 실제 배열은 아님. DOM이 리플로(reflow)될 때마다 업데이트되는 라이브 콜렉션.
    + 라이브 콜렉션(NodeList.HTMLCollection)에서의 반복은 느리며 상당히 비싼 자원 소비한다. 따라서 콜렉션이 라이브일 필요 없을땐 `[].slice.call(NodeList)`와 같은 배열로 변환한다. ES6에선 `[...nodeList]spread`연산자를 사용해 수행 가능

```javascript
var lis = document.querySelector('.class');
foo = [].slice.call(lis); // ES5방식 배열 변환
foo = [...lis]; // ES6방식 배열 변환
```

- el.innerHTML을 변경하거나 요소에 자식을 추가할 때마다 DOM리플로가 발생한다. 리플로가 반복적으로 발생하면 애플리케이션이 느려진다.
    + 브라우저는 el.innerHTML로 HTML을 처리할 때 문자열을 먼저 파싱해야 한다. 이는 자원을 많이 소모하는 작업. 그러나 명시적으로 요소 생성보단 훨 빠름.
    + 유사한 요소를 배치(batch)로 만들면, 처리는 더 최적화 가능.
    + 루프에서 모든 요소를 생성하는 대신 원본에서 복제(el.cloneNode)하면 더 빨라지게 할 수 있다.

## DOM 스타일링
- 스타일이 필요할 땐 가능한 한 CSS클래스 사용하는게 좋다. 이는 상속 및 구성, 분리와 같은 더 좋은 유지보수 제공.
```js
el.classList.add('is-hidden');
el.classList.remove('is-hidden');
el.classList.toggle('is-hidden', !isAvailable);
if(el.classList.contains('is-hidden'))

