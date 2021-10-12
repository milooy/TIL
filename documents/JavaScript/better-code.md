# Better code

with Grokking simplicity (단순에 대한 완전한 이해)

## 머리말

- 프로그래밍 스타일의 진화: 구조적 -> 객체지향 -> 함수형
- 예전엔 코드짜기 전에 순서도 그림: but 스파게티코드가 만들어짐
  - '제어 흐름'(if/else, switch, while, for )을 구성하는 기술도 발전합니당
  - 이 책에선 새로운 다이어그램/냄새/발견법 등 제시할거임
- 함수형
  - '부작용 없음'이 다가 X(현실적이지 않고 제대로 이해한 말이 아님)
    - idea 1: 외부세계에 영향미치지않는 작업 / 실행시마다 다른결과&약간부작용 작업 두개를 구분하자.
    - idea 2: 항목별로가 아닌 한번에 데이터 모음을 처리하는 기술 집합. 이는 부작용 없이 항목을 독립적으로 처리할 수 있을때 가장 효과적.

## Ch.4 Action에서 Calculation 뽑아내기

- Testable 코드(=재사용 가능한 코드)의 조건
  - DOM업뎃에서 비즈니스 규칙 분리
  - 공유 변수(e.g. 전역변수) 의존
  - 답이 어딘가(DOM 등)에 있다 가정하지 말아라

> 재사용이 가능하려면 전역변수 의존하면 안되는군. 그게 순수한것.
> React에서 state도 일종의 전역변수같다 코드를 implicit하게 만드는..

- 함수에서 코드들을 Implicit한지 Explicit한지, 그리고 Input인지 Output인지 구분하자.
  - Implicit한 input (암묵적인 인자 - e.g. global변수 접근), output(암묵적인 아웃풋 - e.g. 함수 중간에 들어가는 console.log, 데이터베이스 접근 등)이 함수를 Action으로 만든다.
    - 이 input은 argument로, output은 return value로 변경하자
    - 함수형 세계에서는 이들(implicit input/output)을 `Side effects`라 부른다. Main effect가 아니잖어 ㅋ
- 요약: 암시적 입력 및 출력 최소화

> 리팩터링 책에서 이야기하는거랑 비슷하군 ㅎ

## Ch.5 Action 디자인 개선

```js
// Bad smell
// 무료배송 여부를 알고싶은데 총금액, 상품금액을 인자로 받는게 이상함 (코드스멜이 남)
function gets_free_shipping(total, item_price) {
  return item_price + total >= 20;
}

// Good
get_free_shipping(cart);
```

- 이렇게 변경하는건 '리팩터링'이라고 하면 안됨. 행동 자체를 바꾸는거니.

```js
// Code smell: 카트의 구조, 카트아이템의 구조 모두를 알고있어야 하는 함수
function add_item(cart, name, price) {
  var new_cart = cart.slice();
  new_cart.push({
    name: name,
    price: price,
  });
  return new_cart;
}

// 개선: make_cart_item는 카트아이템 구조만, add_item은 카트구조만 알아도 된다. 그럼 각각 독립적으로 발전시키고 개발할 수 있다.
function make_cart_item(name, price) {
  return {
    name: name,
    price: price,
  };
}

function add_item(cart, item) {
  var new_cart = cart.slice();
  new_cart.push(item);
  return new_cart;
}
```

```js
// Code smell: 장바구니에 구체적인 변수이름
function add_item(cart, item) {
  var new_cart = cart.slice();
  new_cart.push(item);
  return new_cart;
}

// 개선: 일반적인 이름
function add_element_last(array, elem) {
  var new_array = array.slice();
  new_array.push(elem);
  return new_array;
}
```

> 코드를 슥 따라갔을 때 기존 배경지식 없이 내가 보고 있는 코드만으로도 어떤 일을 하는지 이해할 수 있어야겠구먼

- 요약: 최소한의 데이터 구조만을 아는 함수를 만들자. 그래야 더 재사용 가능. 단일 책임!

## Ch.6 가변언어에서 불변성(immutability) 지키기

- Q. 면접질문: 왜 가변성보다 불변성이 좋은가요?
- copy-on-write 법칙: 원본수정 대신 복사본을 만들어 수정하고 return.
- 함수형 프로그래밍에서 immutable이 필요한 이유: 변경가능한 데이터에 대해 Calculation한다는건 말이 안됨.

## Ch.7 신뢰불가한 코드(e.g. 변경어려운 레거시, 외부API콜)에서 imuutablity 지키기

- 신뢰불가한 코드를 한번 deepCopy본을 만들어서 세이프존을 구성 (스냅샷 뜨는 느낌) (defensive copy)
  - 참고: deepCopy vs shallowCopy:

> payrollCalcSafe 란 네이밍 싫네. 차라리 기존코드를 payrollCalcUnsafe라고 하지.
