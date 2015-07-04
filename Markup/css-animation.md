# CSS animation
## JS animation과의 비교
- 간단히 만들 수 있다.
- 최대한 부드럽게 렌더링됨.
- 성능을 효율적으로 최적화할 수 있다.

## animation적용
- 이 속성은 애니메이션의 중간상태를 기술하진 않음.
    + 이는 @keyframes규칙을 이용해 기술함.
- animation-delay: 엘리먼트 로드되고 언제 시작할지 지정
- animation-direction: 종료되고 다시 첨부터 시작할지 혹은 역방향으로 진행할지
- animation-duration: 한 싸이클의 애니메이션이 얼마에 걸쳐 일어날지
- animation-iteration-count: 애니메이션이 몇 번 반복될지. infinite 가능.
- animation-name: 중간 상태 지정. @keyframes규칙을 이용해 기술.
- animation-play-state: 멈추거나 다시 시작 가능
- animation-timing-function: 중간 상태들의 전환을 어떤 시간간격으로 진행할지 지정.
- animation-fill-mode: 애니메이션이 시작되기 전이나 끝나고 난 후 어떤 값이 적용될지 지정.

## 키프레임
- CSS스타일을 이용해 중간 상태에 어떻게 보일지 정의했다면
    + 이 중간 상태가 전체 애니메이션에서 언제 등장할지 `percentage`로 지정함.
    + 0%~100% = from~to = 시작~끝 

## 예제1 - 텍스트가 브라우저 가로질러 움직이기
(오래된 브라우저들은 -webkit이나 -moz 등 접두어 필요.)
```css
h1 {
  animation-duration: 3s;
  animation-name: slidein;
  animation-iteration-count: infinite; //무한반복
  animation-direction: alternate; //끝나고 반대방향
}

@keyframes slidein {
  from {
    margin-left: 100%;
    width: 300%
  }

  75% {
  font-size: 300%;
  margin-left: 25%;
  width: 150%;

  to {
    margin-left: 0%;
    width: 100%;
  }
}
```

## 제조사별 전용 속성(Vendor Specify Prefix)
```css
div {
    transition-property: width, color;
    transition-duration: 1s;
    transition-timing-function: ease;
    transition-delay: 3s;
 
    -webkit-transition-property: width, color;
    -webkit-transition-duration: 1s;
    -webkit-transition-timing-function: ease;
    -webkit-transition-delay: 3s;
}
```

## Transition
- 간단한 애니메이션.
- 특정 객체를 부각시키는 인스턴트적인 상황이나 화면 전환에 적합.
- 기존에 가지고 있던 속성이 다른 값으로 변할 때만 표현됨.
    + `:hover`와 같은 가상 클래스 선택자(pseudo-class), 혹은 js의 `onclick`이벤트 따위의 부수적인 액션에 의해 발동.
```css
.ex-01 {
    display: inline-block;
    margin: 0;
    padding: 20px;
    text-decoration: none;
    font-size: 12px;
    color: white;
    background-color: black;
    transition: all 1s; //hover될때 지정한 속성 모두로 1s동안 서서히 바꿔줌.
}
 
.ex-01:hover {
    padding: 30px;
    color: yellow;    
    background-color: red;
}
```
- 단축형: `{transition: 속성(property) 지속시간(duration) 타이밍(timing) 지연시간(delay) }
    + property: transition효과를 적용할 속성들 나열
    + duration: 지속시간. 1s는 1초
    + timing: 변화의 시작과 끝 타이밍. 
        + ease: 느림~빠름~느림
        + linear: 등속
        + ease-in: 느림~등속
        + ease-out: 등속~느림
        + ease-in-out: 느림~느림
        + cubic-bezier(n,n,n,n): 처음과 끝의 속도를 0과 1 사이 수치 이용해 4단계로 지정
    + delay: 효과의 지연시간. 3s라면 페이지가 로드되고 나서 3초후에 시작됨.
```css
div{transition: all 1s ease 3s}
div{transition: width 1s ease 3s}
div {
    transition: background 2s ease 1s,
                padding 1s linear 2s;
}

/*기본형*/
div {
    transition-property: width, color;
    transition-duration: 1s;
    transition-timing-function: ease;
    transition-delay: 3s;
}

/*대입형*/
div {
    transition-property: width, height, border-width, color;
    transition-duration: 1s, 2s, 1s, 3s;
    transition-timing-function: ease ease-in ease-out linear;
    transition-delay: 3s, 1s, 1s, 2s;
}
```

## 2D Transform
- CSS3에서 새로 생긴 명세.
- 발동 조건: 정의된 속성이 곧바로 화면에 적용되어 나타남. 
- `:hover`나 js의 `onclick`이벤트 따위의 부수적인 액션에 의해 변화 발생도 가능.
- transition이나 animation속성을 통해 움직임 줄 수 있음
```css
/*ex-03에 바로 적용되어 보여짐*/
.ex-03.skew { transform: skew(20deg,10deg); }

/*45도의 회전각과 10도의 수평 기울기 주기*/
.myclass { transform: rotate(45deg) skew(10deg,0deg); }
```
- translate(x, y): 객체의 위치를 가로 세로 방향 정의해 이동시킴. px,%, em등 단위 사용. `translate(100px, 100px)`은 객체를 우측으로 100px, 하단으로 100px만큼 이동.
- translateX(n): 위치를 가로로만
- translateY(n)
- scale(x, y): 크기를 늘리거나 줄이기. 너비, 높이. 2는 2배 크기, 0.9는 90%크기. 음수 사용이 아니고 소숫점 사용.
- scaleX(n)
- scaleY(n)
- rotate(angle): 객체 회전. `rotate(45deg)`는 시계방향으로 45도 돌리기
- skew(x-angle, y-angle): 기울이기. 수평축기울임, 수직축기울임. `skew(10deg, -10deg)`
- matrix(scaleX, tanY, tanX, scaleY, translateX, translateY): 한꺼번에 정의
```css
.myClass:hover {
  transform: scaleY(2);
}
```
- transform-origin: 50% 50%
    + 객체의 기준점 정의.

## CSS 가상 선택자
```css
a:link{color:blue}
```
- :link: 링크가 걸려있는 항목
- :visited: 클릭해서 방문했던 링크
- :active: 클릭했을 때
- :hover: 마우스 커서 올릴때
- :focus: input같은 form활성화
- :first-letter: 첫번째 문자
- :first-line: 첫번째 줄
- :first-child: 첫번째 자식 요소
- :before: 특정 태그가 시작되기전 바로 앞
- :after: 특정 태그가 끝나는 곳 바로 뒤

## RequestAnimatedFrame
https://msdn.microsoft.com/ko-kr/library/hh920765(v=vs.85).aspx
http://beautifulcode.tistory.com/12

## Refer
[MDN CSS animation](https://developer.mozilla.org/ko/docs/Web/CSS/Using_CSS_animations)
[웹 애니메이션 파헤치기](http://beautifulcss.com/archives/2231)
[beautiful CSS - 2D Transform](http://beautifulcss.com/archives/2136)
[CSS 가상 선택자](http://onasaju.tistory.com/249)
[CSS 가상요소](http://s2junn.tistory.com/58)
[before after로 animation](https://cssanimation.rocks/pseudo-elements/)
[creative list effects 만들기](http://sarasoueidan.com/blog/creative-list-effects/)
[transition on DOM removal](http://stackoverflow.com/questions/7000648/css3-transition-on-dom-removal)
