#OKKY Javascript Conference

## 김태곤
- 서버와 클라이언트에서 동시에 사용하는 ReactJS
- 김태곤
    - Fancy, Naver, 책번역, 한국어번역
    - taegon.kim, @taggon
- ReactJS?
    - FB에서 개발
    - 정식 명칭은 React
    - 사용자 인터페이스를 만드는 자바스크립트 라이브러리
- MVC
    - 여기서 컴포넌트를 통해 오직 View표현만 담당
    - 컴포넌트:
        - 재사용 가능한 UI구성단위
        - html5오면서 표준 됨
        - 컴포넌트는 어떤 기준으로 나눠야 하나? ->본인이 알아서 판단
- JSX
    - Javascript XML
    - JS코드에  xml을 직접 표현 -> (JSXTransformer를 통해->JS코드로 컴파일
- DOM
    - 일관성이 없다 - 브라우저마다 구현에 차이가 있다-렌더링 버그
    - 테스트하기 쉽지 않다 - JS만으로는 테스트가 어려워 반드시 브라우저가 필요
- Virtual DOM
    - 일관성이 있다-브라우저에 의존적이지 않다
    - 테스트하기 쉽다 -순수 JS만으로 구현
    - 빠르다-메모리상에 DOM구성, DOM비교를 통해 업데이트된 부분만 갱신
        - 빠른걸로 성능향상시켜보까!!
        - Ember나 Angular보다 빠르다
    - 단방향 데이터 흐름
    - 이해하기 쉽다
- 동형 자바스크립트(Isomorphic Javascript)(중요!)
    - 동형 = 같은 모양
    - 클라이언트와 서버가 같은 코드를 공유한다.
    - php-node.js렌더링 서버 구조
- 이점
    - 반복 작업 제거
    - 서버사이드에서 렌더링 해야할때 반복 제거
    - 사용자 경험 향상
    - 검색 엔진 최적화(데이터가 포함되서 나오니까!)
- React는 그 이상이댜!!!
    - React Native
        - React를 사용해 네이티브 모바일 앱 작성: eg)Facebook Groups
        - 모바일OS의 네이티브 UI를 JS로 조작
        - 별도 쓰레드에서 동작하는 JS와 비동기 통신
        - 컴포넌트 종류는 다르지만 쓰던 React 방식 그대로
        - 오 쩐다 디버깅을 크롬으로 해
    - React Canvas
        - 모든 돔 엘리먼트를 캔버스에 그려!
    - 리액트의 철학: Learn Once, Write Anywhere!
    - awsome ㅇㅇ라 치면 그 ㅇㅇ의 쩌는것들이 나온다!!(ex. awesome react)

## 고재도
- PolymerJS
- Web Compenet
    + 더 작은 코드, 덜 혼란스럽게!
    + Custom Elements(컴포넌트가 인터페이스를 가진 DOM Element 형태로 사용될 수 있도록)
    + Templates(z컴포넌트의 골격이 사용전까지 비활성화된 상태로 관리되도록)
    + Shadow Dom
    + HTML Imports
    + webcomponents.org 참고
- 폴리머와 웹 컴포넌트 사용하기
    + 폴리머?
        + 라이브러리 
        + 웹 컴포넌트 기반 어플리케이션을 쉽고, 빠르게 만들게 해준다.(jQuery가 javascript 쉽게 만들어준것처럼)
        + polymer.js : 더 편리하게 웹컴포넌트개발을 할 수 있게 해준다.
        + 정의한 엘리먼트들을 `<x-pattern></x-pattern>`이런식으로 쓸 수 있다.
        + template이란 태그 생김! =>나중에 렌더링
        + 앵귤러랑 비슷하넹... ng-repeat == repeat
- Shadow DOM
    + light DOM 밑에 숨겨져있다
    + 브라우저에선 보이는데 소스상엔 안보
    + lightDOM : DOM조작 쉽게 가능
    + shadowDOM: 개발자만 알고있다아 접근하기 어려움(capsulation 된다!)(바깥이랑 차단되어있는 상황!)(의도적으로 찾아갈수는 있지만 실수로 부실수는 없다)
    + 폴리머는 기본적으로 shadow dom 적용!
- core-elemens
    +  오오 시연해주시는데 싱기방기!

## 문추근(fallroot)
- DRY - Don't Repeat Yourself 이 철학을 가지고 임하
- Grunt, Gulp
    + 프론트엔드 개발도구 using 노드 (자동화에 도움)
- 앱엔진 + 자바 
    - 실제 서비스 환경에서 작업하는 방법이 이상적
    + 수정-> 빌드-> 배포 과정이 번거로움
    + 실제 서비스 데이터를 사용할 수 없음
    + 데이터 CRUD가 불편
- index.html
    + 간단
    + 단일 페이지에 작업
    + 문제: CORS <-Cross origin resource sharing
        * 원격 자원 접근 제한
        * 해결: JSONP <<JSON데이터를 인자로 받는 콜백함수
            - 브라우저 옵션
- 간단한 웹 서버
    + 파이썬, 루비, php
    + HTML파일 분리 불가능 =>
        + 코드 분리/재활용 어려움
        + 복붙복붙
        + 수정시 같은작업 반복
        + 데이터베이스 사용 불가능
- 정적 사이트 생성기
    + staticsitegenerator.net
    + 레이아웃 지원 -> HTML 분리/재활용
    + 마크다운 등 블로그 포스팅에 특화
- 그래서 루비온레일즈 써봐라
    + 설치가 간단
    + 루비는 스크립트언어 -> 빌드/배포과정 필요없음
    + 기본 기능만으로도 유용
    + 추가 잼 설치로 기능 확장
- 프리프로세서: 원래 언어의 부족한 문법 보완
- Sprockets
    + Rack based asset packaging
    + 스타일시트/자바스크립트 파일관리
    + 다 주석으로 생김
- 스캐폴드
    + 건축에 사용하는 임시 구조물
    + 작업시 편의 제공
- 초기 데이터 구축
    + 시드: 루비 코드로 초기데이터 작성
- Pow
    + 랙 기반 서버 관리
    + 웹 서버 포트 충돌 방지
    + Anvil: pow에 UI입힘
- xip.io
    + 동적 DNS도구
    + http://myapp.10.0.0.1.xip.io
    + 같은 네트워크 환경에서 사용
    + 서버 배포 없이 공유
    + 여러 기기 테스트
- 유용한 젬
    + RailsCsvFixtures
    + YamlDB
- 실제 개발 절차

## 정병태
- ebrain Lab
- Service Worker를 이용한 Offline Web Application 구현
- Service Worker
    + offline상태에서, 웹 어플리케이션의 준비 단계를 가로채는 방법을 제공하고, 지속적인 background 처리를 지원
- 할수 있는(있을) 것들 
    + Offline Cache
    + Task scheduler
    + Background Sync
    + Push notification
    + Geofencing
- 근데 IE에서 안돼요 ^^ㅎㅎ...
    + 크롬이랑 오페라만 됨 아직까진
