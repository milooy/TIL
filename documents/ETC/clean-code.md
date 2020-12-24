# 클린 코드

> 로버트 C.마틴의 클린코드를 읽고 인상깊은 구문 정리

- 46p. 코드는 위에서 아래로 이야기처럼 읽혀야 조음. 최대한 추상화 수준이 하나인 함수를 구현해라. 위에서 아래로 프로그램을 읽으면 추상화 수준이 한 단계씩 낮아짐
  (추상화 수준이 하나 - 라는 표현에 살짝 충격. 내가 모호하게 생각하고 있던 판단 기준을 명료하게 정리함)
- 52p. 플래그 인수 피하기. 나는 함수 안에 여러가지를 처리할거예요~ 라 말하는거임.

  ```js
  // bad
  render(isFood);

  // good
  if (isFood) {
    renderFood();
  } else {
    renderOther();
  }
  ```

- 53p. 함수의 인수는 최대한 줄이기. 같은 개념이라면 객체로라도 묶기

  ```js
  // bad
  makeCircle((x: number), (y: number), (radius: number));

  // good
  type Center = { x: number, y: number };
  makeCircle((center: Center), (radius: number));
  ```

- 56p. 출력 인수 피하기

  ```js
  // bad
  appendFooter(s); // s에 푸터 추가인지, 푸터에 s추가인지. 함수 선언 봐야 앎.
  // 인수(s)를 (변경하든 해서)리턴하는건 일반적으로 어색함.

  // good
  report.appendFooter(); // 상태를 변경해야 한다면 이렇게 속한 객체상태를 변경하도록 호출
  ```

- 59p. 함수는 한 번 흩어보고 넘어갈 수 있어야 함. 안 그러면 읽기 지루해지고 파악이 어려움. 한 함수에서 한 일만 하도록(e.g. 오류를 처리하는 함수는 오류만 처리해!)
