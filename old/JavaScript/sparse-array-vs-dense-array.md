# Sparse Array vs Dense Array

배열을 선언할 때 `Array` 함수 또는 생성자를 사용하면 **Sparse Array**를 얻는다.

```javascript
var sa = Array(3);
// 또는
var sa = new Array(3);
```

`length` 속성은 입력한 3으로 얻을 수 있는 일반 배열처럼 보인다.

```javascript
sa.forEach(function(x) {
    console.log(x);
});
```

하지만 위 명령어를 실행해보면 콘솔에 아무 것도 출력되지 않는다. 반복문을 정상적으로 실행할 수 없는 상태의 배열이다.

이를 개선하기 위해 아래 코드처럼 `Array.apply`를 적용할 수 있다. 실행하면 콘솔에 `undefined` 값이 세 번 출력된다.

```javascript
var da = Array.apply(null, Array(3));

da.forEach(function(x) {
    console.log(x);
});
```

이 두 배열은 크롬 콘솔에서 아래처럼 구분해서 출력한다.

```
> sa
[undefined × 3]

> da
[undefined, undefined, undefined]
```

이를 활용해서 아래처럼 배열 초기화를 쉽게 할 수 있다.

```
> Array.apply(null, Array(3)).map(Function.prototype.call.bind(Number))
[0, 1, 2]
```

## 참고 문서

- [sparse arrays vs. dense arrays](http://www.2ality.com/2012/06/dense-arrays.html)
