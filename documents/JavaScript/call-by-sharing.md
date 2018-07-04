# Call by Sharing

자바스크립트에 함수의 매개변수를 설명할 때 일반적으로 얘기하는 값으로 전달(Call by Value) 또는 참조로 전달(Call by Reference) 방식으로는 이해하기 힘들다. 아래 코드를 보자.

```js
function change(num, obj1, obj2) {
  num = num * 10;
  obj1.item = "changed";
  obj2 = {item: "changed"};
}

var num = 10;
var obj1 = {item: "unchanged"};
var obj2 = {item: "unchanged"};

change(num, obj1, obj2);

console.log(num);
console.log(obj1.item);
console.log(obj2.item);
```

실행결과는 아래와 같다.

```
10
changed
unchanged
```

값으로 전달하는 방식이라면 `obj1.item` 값이 변해서는 안 되고, 참조로 전달하는 방식이라면 `obj2.item` 값이 변해야 하지만 두 방식 모두 만족하지 못한다. Call by Sharing 방식으로 설명할 수 있고 자바 진영에서는 Pass by Value, 루비 진영에서는 Pass by Reference 라고도 한다. 참조로 전달하는 방식과 차이점은 함수 안에서 인자를 새로 할당했을 때 호출한 곳에서 접근할 수 없다는 점이다.

## 결론

- 함수에 문자열, 숫자 등의 기본 형태의 인자를 넘기면 값을 복사한 지역 변수로 사용한다.
- 함수에 객체 형태의 인자를 넘기면 속성은 공유하지만 새로 객체를 할당할 수는 없다.

## 참고

- [Evaluation strategy - Wikipedia](http://en.wikipedia.org/wiki/Evaluation_strategy#Call_by_sharing)
- [Is JavaScript a pass-by-reference or pass-by-value language?](http://stackoverflow.com/questions/518000/is-javascript-a-pass-by-reference-or-pass-by-value-language)
