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
- 주석
  - 68p. 주석은 기껏해야 필요악. 코드로 의도를 표현하지 못할 때 사용.
  - 77p. 주석이 코드 내용 그대로 중복이면 달 필요x
- 139p. 메서드에서 null반환은 나중에 이를 사용하는 입장에서 매번 null체크를 해줘야하는 귀찮&위험이 있음. throw를 하거나 특수 사례 객체를 반환하셈. 이미 null반환하는 외부 라이브러리들은 한 번 감싸든지 해서 throw해라.
  ```js
  function get직원() {
    //...
    if (직원없음) {
      // return null; // 안좋음
      return Collections.emptyList(); // java의 특수사례객체
    }
  }
  ```
