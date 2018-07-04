## HCJ
- 링크
    - 비동기
    - 와이너리
- JS의 핵심개념
    - URL
        - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript
        - http://bonsaiden.github.io/JavaScript-Garden/ko/   (객체,함수 부분)
        - http://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript
    - 모듈
    - namespace
    - Scope
    - closure
    - hoisting
    - this
    - binding
- 컴포넌트 기반의 UI 프로그래밍
    - URL
    - 개발한 UI요소 중 특정 기능은 재사용 목적으로 범용화 할 수 있다(컴포넌트 제작)
    - 외부 컴포넌트(jQuery Plugin같은 위젯개념. 캘린더, 자동완성기능 등)를 활용해 서비스에 적용할 수 있다
- 디버깅
    - URL
        - https://developers.google.com/chrome-developer-tools/docs/dom-and-styles
        - https://developers.google.com/chrome-developer-tools/docs/javascript-debugging
https://developers.google.com/chrome-developer-tools/docs/console
https://developers.google.com/chrome-developer-tools/docs/tips-and-tricks
--> (tips-and-tricks에서는 console , source , element, setting 부분을 학습)
    - 크롬 개발자 도구의 사용법에서 Elements탭, Sources탭, Consle탭의 기능 이용해 디버깅 가능
- 웹 UI 성능향상
    - url
        - https://developers.google.com/chrome-developer-tools/docs/cpu-profiling
        - https://developers.google.com/chrome-developer-tools/docs/timeline
https://developers.google.com/chrome-developer-tools/docs/tips-and-tricks
--> (tips-and-tricks에서는 Timeline, profiles,Network 부분을 학습)
https://docs.google.com/presentation/d/1z49qp03iXAJIkbXaMtCmWW_Pnnq-MzXGW139Xw8-paM
http://www.igvita.com/slides/2013/fluent-perfcourse.pdf
https://docs.google.com/presentation/d/1IRHyU7_crIiCjl0Gvue0WY3eY_eYvFQvSfwQouW9368/present#slide=id.p19
    - 성능에 관련된 JS의 특성과 web의 특성을 알고 있고
    - 네트워크 프로파일링, 스크립트 프로파일링이 가능하고
    - 병목지점을 찾아 개선 가능. 몇가지 적당한 도구의 사용법 알고있다.
- Javascript 테스트 코드
    - url
        - http://qunitjs.com/intro/
        - http://qunitjs.com/cookbook/
    - 테스트코드를 왜 구현해야 하는지 알고,
    - JS 테스트코드시 알아야 할 몇가지 특성과 구현방법을 알고 있으며(이벤트, 비동기테스트 등)
    - IE9를 포함한 4개이상의 브라우저에서 주요기능 최소 3가지 이상에 대해 테스트케이스가 성공하게 구현가능.

## mobile web
- 모바일 웹 환경을 이해하고 개발
    - url
        - http://www.quirksmode.org/mobile/metaviewport/
        - http://www.quirksmode.org/mobile/metaviewport/
http://www.sitepen.com/blog/2012/05/14/basic-mobile-layout/
http://codeflow.co.kr/question/756/%EB%91%90%EA%B0%9C%EC%9D%98-viewport-%EC%97%90-%EB%8C%80%ED%95%98%EC%97%AC-part-1-viewport-window-html-%EC%9D%98-%ED%81%AC%EA%B8%B0/
http://codeflow.co.kr/question/760/%EB%91%90%EA%B0%9C%EC%9D%98-viewport-%EC%97%90-%EA%B4%80%ED%95%98%EC%97%AC-part-2/
https://developer.apple.com/library/safari/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html
    - 공통적 모바일웹 환경(meta tag, viewport, 해상도)이해, android와 iOS의 차이를 알아 다양한 모바일웹환경에서 개발가능
- 반응형 웹 구현가능
    - http://coding.smashingmagazine.com/2011/01/12/guidelines-for-responsive-web-design/
    - 미디어쿼리 사용해 2개 이상의 다른 레이아웃 개발가능
- 터치이벤트 기반 UI개발
    - url
        - https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Touch_events
        - http://helloworld.naver.com/helloworld/80243
http://www.html5rocks.com/en/mobile/touch/
    - swipe guesture 인터렉션을 터치이벤트 이용해 iOS, android에서 개발가능
- 모바일웹 환경에서 디버깅
    - url
        - http://www.cantoni.org/2013/11/06/capture-android-web-traffic-fiddler
        - http://people.apache.org/~pmuellr/weinre/docs/latest/
http://webdesign.tutsplus.com/articles/quick-tip-using-web-inspector-to-debug-mobile-safari--webdesign-8787
https://developers.google.com/chrome-developer-tools/docs/remote-debugging?hl=ko
    - 크롬개발자도구
    - safari개발자도구
    - wenire
    - fiddler
- 모바일웹 UI 성능을 좀더 향상 가능
    - url
        - https://docs.google.com/presentation/d/1z49qp03iXAJIkbXaMtCmWW_Pnnq-MzXGW139Xw8-paM
        - http://www.igvita.com/slides/2013/fluent-perfcourse.pdf
https://docs.google.com/presentation/d/1IRHyU7_crIiCjl0Gvue0WY3eY_eYvFQvSfwQouW9368/present#slide=id.p19
    - 네트워크 프로파일링,
    - 스크립트 프로파일링 가능
    - 병목지점 찾아 개선가능
- 중요
    - 비동기
        - http://msdn.microsoft.com/ko-kr/library/windows/apps/hh700330.aspx
        - JS는 단일 스레드 언어 => 한 프로세스 끝나기 전에 다른거 안실행됨. 이걸 피하기 위해 동기실행을 피해야함.
            - 방법: 함수가 다른 호출의 이벤트 발생시킨후 호출되는 이벤트 처리기를 사용해 나중에 실행되도록.
                - 콜백함수: 프로세스를 시작한 코드를 다시 호출하므로 비동기 처리
        - 비동기 문제점
            - 빨리 복잡해짐.
            - JS는 콜백에 많이 의지 ->디버깅 어려움
            - 비동기 인라인 함수 사용 ->호출 스택 읽는데 문제 됨.
        - 재귀호출, 반복문
            - 재귀
                - 조건달성까지 최초호출함수 종료안되고 내부호출 차곡차곡
                - 함수호출시마다 스택메모리 생성되는데 이게 모든 재귀조건 달성되야 제거
                - 스택메모리 한계 ->100번정도 내부에서 함수호축 하면 스택오버플로우 하며 뻗음
            - for, while등 반복문 사용하면
                - 각 반복 주기마다 반복문 내부의 내용을 스택에 쌓지 않고 스택 클리어
                - 반복문을 몇억번이든 반복시켜 실행가능, but 일정시간 넘으면 스크립트타임아웃 걸려 뻗음.
            - 공통점
                - 동기화 로직 : 그 문장이 실행완료 전까지는 다음문장 실행 ㄴㄴ.
                    - 순차적으로 각 문장 실행완료후 다음문장 실행
                    - 한 프레임 내에 전부 실행
                    - 호이스팅은 대표적으로 동기화로직을 흐뜨러트림.
    - 함수 선언문 /함수 표현식 / var 선언
        - http://blog.jidolstar.com/813
        - 함수 선언문(functional declaration)
            - function foo() {}
        - 함수 표현식(functional expression)
            - 익명함수 표현식
                - var a = function() {
                -   return 3;
                - }
            - 익명 즉시실행 함수 표현식
                - (function () {} )();
            - 기명함수 표현식(또한 클로저)
                - var a = function bar() {
                -   return 3;
                - }
            - 기명 즉시 실행 함수 표현식(또한 클로저)
                - (function bar() {
                -   alert(‘hello’);
                - })();
        - 차이
            - 자바스크립트 인터프린터가 함수 선언문을 만나면 부모함수 vo라는 key-value공간(scope공간)에 이 함수 객체를 참조함
            - 함수 선언문은 해석시 바로 vo에 참조
                - 함수 표현식은 안그럼.
                    - 실행 때 해석하고 동작시킨다는 말.
            - 인터프리터에 의해 다른 시점에 해석되고 구동됨.
        - var 선언
            - 함수내에 var로 선언된 변수도 vo공간에 참조됨.
            - var a, b; 라 하면 a, b는 vo공간에 편입.
            - 함수 내에선 a와 b에 값을 할당하지만 이 둘 값은 함수를 해석할때가 아닌 실행할때 할당됨.
        - 함수 선언문과 var선언문은 블록 내에서 반드시 호이스팅됨.
            - 함수 블록의 중간에 정의되더라도 항상 함수 머리에 정의된것처럼 실행됨
            - 함수 표현식은 var foo부분만 호이스팅될뿐이지 그 정의 자체는 함수 실행 타임에 해석됨.
    - 콜백
        - 옵저버 패턴에서 나옴
            - 옵저버패턴: 한 객체의 상태가 바뀌면 그 객체에 의존하는 다른 객체들에게 연락이 가고 자동으로 내용이 갱신. 일대다 의존성.
        - 콜백
            - http://youngman.kr/?p=635
            - 객체의 상태변화(이벤트) 발생시 이러한 사실을 함수를 통해 전달하도록.

            - 키보드나 마우스 클릭같은 디바이스 이벤트뿐만 아니라 Ajax, 데이터 처리 등 많은 부분에서 사용.

            - 시계의 알람 기능과 비슷.

        - 콜백으로 넘기는 방법

            - 매개변수를 통해 함수를 받고, 그 함수를 통해 결과값 다시 호출하면 됨.

    - 프로토타입
- JS의 핵심개념
    - URL
        - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript
        - http://bonsaiden.github.io/JavaScript-Garden/ko/   (객체,함수 부분)
        - http://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript

    - 모듈
        - var someSharedValue = 10;
        - var myFunction = function(){ //do something }
        - var anotherImportantFunction = function() { //do more stuff }

            - 이렇게 전역 네임스페이스를 지저분하게 만들지 않기 위해 모듈화 한다.

            - 위 코드는 소스코드내의 모든 영역에서 참조가 가능하기 때문에 여러 소스를 함께 로드할 경우 같은이름 가지면 맛감.
        - IIFE방식으로 실행된 익명함수는 그 자체로 스코프를 제한하게 됨. =>전역 네임스페이스 건드리지 않음.
        - http://blog.javarouka.me/2012/02/javascripts-pattern-2-module-pattern.html
        - ex

    - namespace
        - http://www.nextree.co.kr/p7650/
    - Scope
        - http://blog.jidolstar.com/813

        - 지역변수의 유효영역(scope)는 함수의 블록레벨에만 국한(함수 레벨 유효 영역)
        - C는 if블록도 하나의 유효영역 됨(블록 레벨 유효 영역)
    - closure
        - http://youngman.kr/?p=675

        - 클로저

            - 함수 내에 선언된 로컬 변수를 외부에서도 참조할 수 있는 함수

            - 어찌보면 JS의 모든 함수가 클로저라 할 수 있다.

    - hoisting
        - http://mohwaproject.tistory.com/33

        - 끌어올리기
        - var 선언문 전에 변수 사용해도 이미 선언된 것으로 간주.

        - 함수 선언문으로 선언된 변수는 호이스팅 동작에서 정의된 값이 위로 끌어 올려짐.

            - var  a 없애면 지역변수처럼 안보임.

        - 함수 선언문과 var 선언문은 함수 블로내에서 반드시 호이스팅 됩니다. 이들은 함수 블록의 중간에 정의 되더라고 항상 함수 머리에 정의된 것처럼 함수가 실행 됩니다. 호이스팅을 언급하기 전에 앞에서 함수 선언문과 var 선언된 변수는 모두 함수의 vo 공간에 함수가 해석될 시에 편입된다고 했습니다. 이제야 호이스팅의 진실을 알게 되었습니다. 결국 호이스팅이란 자바스크립트 인터프리터가 해석할 때 함수의 스코프 영역(vo)에 var로 선언한 변수와 함수 선언문의 참조를 key-value로 잡아주는 것 이상도 이하도 아닙니다. 호이스팅은 단지 끌어올린다는 개념은 너무 추상적인 것이고 불편한 진실인 셈이죠.
    - this
        - http://codeflow.co.kr/question/956/javascript-%EC%9D%98-this-%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80/

    - binding

            - 여기서 bind함수가 하는일: 실행될때 함수를 특정개체의 스코프 체인에 묶어버리는 기능(=this객체를 결정하는 것)

- 컴포넌트 기반의 UI 프로그래밍

    - 개발한 UI요소 중 특정 기능은 재사용 목적으로 범용화 할 수 있다(컴포넌트 제작)

    - 외부 컴포넌트(jQuery Plugin같은 위젯개념. 캘린더, 자동완성기능 등)를 활용해 서비스에 적용할 수 있다

- 디버깅
    - URL
        - https://developers.google.com/chrome-developer-tools/docs/dom-and-styles

        - https://developers.google.com/chrome-developer-tools/docs/javascript-debugging
https://developers.google.com/chrome-developer-tools/docs/console
https://developers.google.com/chrome-developer-tools/docs/tips-and-tricks
--> (tips-and-tricks에서는 console , source , element, setting 부분을 학습)

    - 크롬 개발자 도구의 사용법에서 Elements탭, Sources탭, Consle탭의 기능 이용해 디버깅 가능
        - element

            - 돋보기로 눌러보고 확인

            - 해당 element의 break on 속성
        - sources

            - 자바스크립트 디버깅할때 씀

            - 밑에 동그라미안에일시정지 있는 아이콘 : 익셉션이 발생할때 멈추기
            - element탭에서

                - 원하는 라인 누르고
                - Event Listener누르면 할당된 이벤트 볼 수 있음

            - 해당 엘리먼트 누르고 EventListener에서 >click이 할당되있구나 볼 수 있음

            - 아님 소스코드에서 debugger; 써서 멈출수도 있다.

            - 무튼 멈춘후엔 밑에 부분이 중요
            - |> : 다음 브렉포인트로 이동

            - 그다음거: 한 라인씩 이동

            - 그다음거: 다음 라인으로 가되 함수 안으로

            - 그다음거: 함수 밖으로

            - 그다음: 브렉포인트 건너뛴다
            - Breakpoints

                - 내 브렉포인트들 볼 수 있음
            - Call stack

                - 어떻게 실행되는지를 보여줌
            - Scope variables

                - 현재 스콥 변수, 메서드들
            - Watch Expression

                - 주기적으로 확인하고 싶은 변수 쳐놓으면

                - 계속 확인가능

- 웹 UI 성능향상
    - url
        - https://developers.google.com/chrome-developer-tools/docs/cpu-profiling

        - https://developers.google.com/chrome-developer-tools/docs/timeline
https://developers.google.com/chrome-developer-tools/docs/tips-and-tricks
--> (tips-and-tricks에서는 Timeline, profiles,Network 부분을 학습)
https://docs.google.com/presentation/d/1z49qp03iXAJIkbXaMtCmWW_Pnnq-MzXGW139Xw8-paM
http://www.igvita.com/slides/2013/fluent-perfcourse.pdf
https://docs.google.com/presentation/d/1IRHyU7_crIiCjl0Gvue0WY3eY_eYvFQvSfwQouW9368/present#slide=id.p19

    - 성능에 관련된 JS의 특성과 web의 특성을 알고 있고

    - 네트워크 프로파일링, 스크립트 프로파일링이 가능하고

    - 병목지점을 찾아 개선 가능. 몇가지 적당한 도구의 사용법 알고있다.

    - 정리

        - 큰축 2개

            - 넷웍

                - 로딩성능

            - 렌더링

                - 인터렉션성능(dom, composite)

        - 브라우저 동작
            - document.wirte는 굉장한 고비용 코드. 처음으로 가서 다 쓴다.

        - 네트워크
            - Bandwidth: 적정수준으로
            - Latency: 무조건 짧게

            - 성능개선
                - 1. 횟수줄이기
                    - redirect피하기

                        - 완전 고비용.

                        - 반드시 서버에서 리다이렉트 하셈(뒤로가기 활성화)
                    - keep-alive
                        - keep-alive 헤더 지정

                        - 한번 맺은 커넥션은 어느정도 시간이 지나도 맺고 있음.

                        - 같은 url로 들어온 애들 저장

                        - 서버에 부담있는 작업이라 잘 사용

                    - 파일 합치기
                        - JS합치기(uglifyjs) CSS(CleanCSS) 이미지(CSS sprite)

                        - 변경이 잦은 파일은 분리하는게 좋음.
                        - js, css크기가 작으면 차라리 인라인으로 넣어
                        - CSS sprite

                            - 합쳐서 내려받고 포지션으로 찾음

                            - 자주 변하는 이미지는 합치면 오히려 성능 감소

                            - 접근성 문제

                    - 재활용

                        - 이미받은 파일은 변경안되면 재활용(cache)

                        - 헤더에 Cache-control, Last-modified, Etag등 설정해 가능하면 재활용(웹브라우저 캐시)

                    - 적당한 URL분리

                        - 도메인이 다르면 병렬로 받을 수 있어 효율
                - 2. 크기 줄이기
                    - minified

                        - 합쳐서 http요청횟수 줄이고 공백 제거해 사이즈 줄임
                        - JS, CSS, HTML, Image모두 줄임

                        - 이미지 품질 75%
                    - gZip

                        - 압축해서 전송

                        - 서버에 부담일수 있으나 네트웍비용이 훨 중요
                    - Cookie삭제

                        - 쿠키는 헤더에 포함되기 때문에 크기 차지.

                        - 정적파일인 경우 쿠키가 없는 도메인 만들자.
                    - on-demand pattern

                        - 특정 필요 시점에 Js, CSS등 가져옴
                - 3. 도구 사용

                    - 크롬개발자도구-audits, Pagespeed, WebPageTest
        - DOM

            - 웹어플리케이션이 느리면, JS때문에 느린경우는 거의 없고 DOM사용 잘못해서 그럼.
            - css는 renderTree만드는걸 막아서 앞에.
            - js 는 Dom트리 만드는걸 막아서 마지막에.

            - 로딩이벤트
                - Load: 페이지의 모든파일이 로드된 이후에 발생
                - DOMContentLoaded: DOM Tree 완성 후 발생

            - 돔과 관련한 작업은 비쌈

                - 최대한 줄여라.

                - 색상 등 색과 기하학적 수정X(Repaint, Redraw) <<다시 그리면 됨. 비용 쌈

                - 위치 값 수정(Reflow, Layout) <다시 layout, paint해야함. 비쌈.

            - 비용 줄이기

                - 수정할땐 한번에.
                    - cssText

                - 동기 레이아웃은 비용이 무지 큼
                    - div.offsetHeight; :높이값 구하면 다~재계산

            - 도구 사용
                - Spped tracer, dynatrace, 크롬개발자도구-timeline

                - 특정 지점이 문제인지 알려주는 도구는 없음

                - 느리다고 판단하는 부분에 프로파일링 해서 drill down 해서 찾아봐야함.

                - 데스크탑의 성능을 좌우하는 포인트는 비동기 레이아웃과 적은 렌더링 트리의 변경임
- Javascript 테스트 코드
    - url
        - http://qunitjs.com/intro/

        - http://qunitjs.com/cookbook/

    - 테스트코드를 왜 구현해야 하는지 알고,
    - JS 테스트코드시 알아야 할 몇가지 특성과 구현방법을 알고 있으며(이벤트, 비동기테스트 등)
    - IE9를 포함한 4개이상의 브라우저에서 주요기능 최소 3가지 이상에 대해 테스트케이스가 성공하게 구현가능.

[ ] mobile web

- 모바일 웹 환경을 이해하고 개발
    - url
        - http://www.quirksmode.org/mobile/metaviewport/

        - http://www.quirksmode.org/mobile/metaviewport/
http://www.sitepen.com/blog/2012/05/14/basic-mobile-layout/
http://codeflow.co.kr/question/756/%EB%91%90%EA%B0%9C%EC%9D%98-viewport-%EC%97%90-%EB%8C%80%ED%95%98%EC%97%AC-part-1-viewport-window-html-%EC%9D%98-%ED%81%AC%EA%B8%B0/
http://codeflow.co.kr/question/760/%EB%91%90%EA%B0%9C%EC%9D%98-viewport-%EC%97%90-%EA%B4%80%ED%95%98%EC%97%AC-part-2/
https://developer.apple.com/library/safari/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html

    - 공통적 모바일웹 환경(meta tag, viewport, 해상도)이해, android와 iOS의 차이를 알아 다양한 모바일웹환경에서 개발가능

- 반응형 웹 구현가능
    - http://coding.smashingmagazine.com/2011/01/12/guidelines-for-responsive-web-design/

    - 미디어쿼리 사용해 2개 이상의 다른 레이아웃 개발가능

- 터치이벤트 기반 UI개발
    - url
        - https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Touch_events

        - http://helloworld.naver.com/helloworld/80243
http://www.html5rocks.com/en/mobile/touch/
    - swipe guesture 인터렉션을 터치이벤트 이용해 iOS, android에서 개발가능

- 모바일웹 환경에서 디버깅
    - url
        - http://www.cantoni.org/2013/11/06/capture-android-web-traffic-fiddler

        - http://people.apache.org/~pmuellr/weinre/docs/latest/
http://webdesign.tutsplus.com/articles/quick-tip-using-web-inspector-to-debug-mobile-safari--webdesign-8787
https://developers.google.com/chrome-developer-tools/docs/remote-debugging?hl=ko

    - 크롬개발자도구
        - chrome://inspect/#devices
    - safari개발자도구
    - weinre
        - milooy:bin yurim$ weinre --httpPort 8001 --boundHost 127.0.0.1
http://127.0.0.1:8001/client/ 들어가면 나옴
        - <script src="http://127.0.0.1:8001/target/target-script-min.js#anonymous"></script>
    - fiddler
- 모바일웹 UI 성능을 좀더 향상 가능
    - url
        - https://docs.google.com/presentation/d/1z49qp03iXAJIkbXaMtCmWW_Pnnq-MzXGW139Xw8-paM
        - http://www.igvita.com/slides/2013/fluent-perfcourse.pdf
https://docs.google.com/presentation/d/1IRHyU7_crIiCjl0Gvue0WY3eY_eYvFQvSfwQouW9368/present#slide=id.p19
    - 네트워크 프로파일링,
    - 스크립트 프로파일링 가능
    - 병목지점 찾아 개선가능
