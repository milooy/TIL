# 함수형 프로그래밍

## 함수형 프로그래밍이란?
- 순수한 함수. 외부의 값에 접근하지 않아야 한다. 인자만 가지고 조물조물. 공유된 상태와 변경 가능한 데이터 및 부작용을 피하여 소프트웨어를 작성하는 프로세스.
- 애플리케이션의 상태가 공유되는 OOP랑은 대조된다.

## High Order Functions(HOC, 고차 함수)
- 다른 함수를 인자로 사용하거나 함수를 반환하는 함수. (또는 둘 다)
- 사용 예시
    + 비동기 등 제어를 추상화한다 (콜백함수, promise 등을 사용)
    + 다양한 데이터 유형에 대해 작동할 수 있는 유틸리티를 생성

```js
const numbers = [1,2,3,4];
const isEven = x => !(x % 2); // '배열'을 처리하는 로직이 필요 없으며, 배열을 순환하며 재사용된다.
const evenNumbers = numbers.filter(isEven);

```

## Currying (커링)
여러 인자를 받는 함수에서 인자를 각각 하나씩 사용하여 함수 순서를 변환.
람다 표현식과 클로저로 구현.

```js
// Not curried function
function sumOfThree(x, y, z) {
    return x + y + z;
}

// Curried function
function sumOfThreeNew = (x) => {
    return (y) => {
        return (z) => {
            return x + y + z;
        }
    }
}

sumOfThreeNew(1)(2)(3); // 6

// 간단 표기
function SumOfThreeSimple = x => y => z => x + y + z;

```

## Auto-currying
lodash와 Ramda는 `curry`메소드를 가지고 있다. 이는 여러개의 인수를 가지는 함수를 커링된 함수로 만들어줌.
```js
// Use lodash or ramda
const curry = _.curry || R.curry

const add = (x, y) => x + y;
const curriedAdd = curry(add);

curriedAdd(1)(2) // 3
curriedAdd(1) // (y) => 1+ y
curriedAdd(1, 2) // 3
```

## Function composition (합성함수)
두 가지 이상의 함수가 합성됨.
두 함수 f와 g가 있고 `f(g(x))`와 같이 사용된다 할 때, 이를 `f ∘ g(x)`와 같이 표현 가능.
아이고 헷갈려.
```js
const compose = (f, g) => {
    return (x) => {
        return f(g(x));
    }
};

// simple version
// const compose = (f, g) => x => f(g(x));

const add = x => y => x + y;
const pow = x => y => y ** x;

const addTwo = add(2); // (y) => y + 2
const square = pow(2); // (y) => y ** 2

const addTwoThenSquare = compose(square, addTwo);

addTwoThenSquare(10); // (10 + 2) ^ 2
// 인자에 2를 더하는 addTwo함수의 결과를 인자를 제곱하는 square함수
```

## Point free notation
함수를 작성할 때 매게변수를 정의하지 않는 것. 함수를 간결하게 해준다.
```js
const map => fn => list => list.map(fn)
```



## Refer
- https://wonism.github.io/what-is-fp/
- https://flaviocopes.com/javascript-functional-programming/