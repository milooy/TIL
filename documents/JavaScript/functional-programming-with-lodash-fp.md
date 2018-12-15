# lodash fp로 함수형 프로그래밍 하기

## 왜 함수형으로 코드를 쓰는가
- Explicit한 코드를 Implicit(암묵적)하게 바꾼다는 이점
- Explicit하게 짠 제곱함수
```js
function squareAll(numbers) {
    var squared = [];
    for (var i=0; i < numbers.length; i++) {
        squared.push(numbers[i] * numbers[i]);
    }
    return squared;
}

squareAll([1, 2, 3, 4]); // [1, 4, 9, 16]
```

- Implicit하게 짠 제곱함수.
```js
function squareAll(numbers) {
    return numbers.map(num => num * num);
}
squareAll([1, 2, 3, 4]);
```
    - 루프를 도는것과 새로운 배열을 만드는걸 `map`메서드에 위임시켰다.
    - 읽기 쉬워지고 에러를 낼 가능성이 적어짐.
    - 하지만 numbers배열에서 이를 불러내야 함.
- lodash fp로 조금 더 Implicit하게 짠 제곱함수
```js
const map = require('lodash/fp/map');

const squareAll = map(num => num * num); // array.map으로 접근하지 않고 바로 map을 부름. 그리고 함수에 arguments도 없음(커리되어서)

squareAll([1, 2, 3, 4]);
```

- `lodash/fp`의 함수들은 기본적으로 커리되어있다. 
- 그래서 기존에 익숙했던 `map(array, function)`이 아닌 `map(function, array)` 순이라고 생각하면 된다.
- 더이상 `numbers` argument를 받지 않아도 되며, 이는 `point-free`프로그래밍의 컨셉이다.
- 또다른 이점들은 적은 라인의 코드로 읽기도 좋으며, 테스트랑 유지보수 하기도 좋다는 것이다.

## 커링(Currying)
- 어떤 함수가 특정한 개수의 인자를 기대하는데, 이보다 적게 인자를 넣었을 때 남은 인자들을 새로운 함수로 받을 수 있는것을 커링(Currying)이라 한다.
- 모든 인자들이 전달되었을 때 원하는 결과가 반환된다.

```js
const curry = require("lodash/fp/curry");

const sayMessageTo = curry((msg, name) => `${message}, ${name}!`);

sayMessageTo("Hello", "Yurim"); // 원하는 결과 바로 반환. "Hello, Yurim!"
const sayBye = sayMessageTo("Bye"); // message를 받았으니, name을 받을 수 있는 새로운 함수 반환
sayBye("Josh"); // 모든 인자 받았다. "Bye, Josh!"
```
- 아까 했던 map도 `map(num => num * num, [1,2,3,4])`처럼 한번에 호출할 수 있음

## 함수 조립하기 (Compose functions)
- 함수를 조립한다는 컨셉은 작은 함수들로 큰 함수를 만든다는 것이다. 각 함수는 리턴된 값을 다음 함수에 넘긴다.
```js
const flow = require('lodash/fp/flow');
const escape = require('lodash/fp/escape');
const trim = require('lodash/fp/trim');

const sanitise = flow(escape, trim);

sanitise('    <html>    '); // &lt;html&gt;
```
- 암묵적이고 선언적으로 함수 짜기. 어떻게 되어야하는지 코드를 짜는게 아니고 어떤 일이 일어나야하는지 선언하기.
- lodash/fp의 함수들은 기본적으로 커리가 되어있어서 더 적은 인자를 넘기면 함수를 돌려준다.
- composition이 가능한 함수들은 하나의 argument를 넘기고 하나의 value를 다음 함수로 넘기는 형태여야 한다. 맨 처음 함수는 하나 이상의 argument를 넘길 수 있지만 single value를 리턴해야 하는건 동일하다.

## Point-free
- 포인트 프리 스타일(Tacit이라고도 부름) 프로그래밍은 함수가 그들이 수행해야 하는 arguments를 명시하지 않는 패러다임이다.

```js
// Before
function isSuccess(response) {
  if (response.status === 200) {return true;}
}
isSuccess(response);

// After
const isSuccess = flow(get('status'), isEqual(200));
isSuccess(response);
```

## 순수 함수(Pure functions)
- 외부 스코프에 의존이 없는 함수. 넘긴 인자에만 영향받고 이를 변형하면 안되며 새로운 객체를 넘겨야 한다.


## Refer
https://simonsmith.io/dipping-a-toe-into-functional-js-with-lodash-fp/