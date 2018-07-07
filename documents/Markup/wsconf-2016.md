# WSConf

## 실전 글로벌 SEO, 질문에 답하는 컨텐츠를 제공하라! [전승엽]
- 검색엔진 최적화 == 사용자 최적화
- 검색엔진이 하는일
    + 크롤링
    + 색인
    + 랭킹
- 구글 검색 젤 위에 박스 형태로 노출: 피처드 스니펫
    + 유입량 5배 이상 는다
    + 검색엔진 최적화를 많이 해두면!
- TDK 설정: Title, Description, Keywords
    + 웹 페이지 안에 상세 페이지들마다 다 다르게 해야한다
    + 구글 발표: Keywords는 페이지랭크에 영향 안준다
- Heading tag도 로봇이 구조 잡을때 중요
- Image 파일네임, Alt모두 중요
- Breadcrumb (빵부스러기)
    + 사이트맵 같은것인듯
    + 이게 잘 되어야 검색엔진이 사이트를 잘 돌아다닌다
- Social&Data structure
    + og, twitter, schema
- Site
    + sitemap
    + robots(가져가지 말아야 할 곳 설정)
    + canonical(프린트 버튼을 눌렀을 때 등 원래 두개로 나눠진 컨텐츠를 하나로 합쳐 보여주는 등)
    + redirect: 기존 SEO나 그런 점수 지키기 위해 기존 페이지로부터 새 페이지로 302 redirect로 넘겨줌
    + hreflang: 사이트가 다국어지원 할때 검색엔진이 한국어 가져갈지 영어 가져갈지
    + mobile: 모바일 페이지 만들어라 검색엔진 점수 높아짐
- 2017
    + Keywords
    + Rank brain: AI가 랭킹 알고리즘을 사람들 겸색결과나 인터렉션 확인해서 변경
    + Voice Search: 음성 검색
    + Bing & AMP: 시리의 검색엔진은 Bing
        * 구글은 Social media에서 주는 링크를 별로 중요하게 평가하지 않는데 bing은 중요하게 평가

## 이미지가 마크업의 반이다 [이환]
- 스프라이트
    + UI개발자가 알아야 할 이미지 파일
        * JPEG/JPG: 손실 압축방식
        * GIF: 무손실 압축방식. 256개 색.
        * PNG: 무손실 압축
            - PNG-8: 투명 지원, 반투명 X
            - PNG-24: 투명, 반투명 모두 지원
        * 파일 용량: png8<`gif`<`jpeg`<`png24`
        * 지원색상수:  png-8=gif<`jpeg`<`png-24`
        * 이미지 품질: `gif`<`png-8`<`jpeg`<`png-24`
- 메타데이터는 왜 삭제해야 하나요?
    + 촬영 정보가 다 들어가 있다
    + 개인정보
- `jpeg`보다 `png`가 용량 2배 적다
    + 단순한 색상 이미지는 png-8이 베스트
    + gif가 가끔 용량이 작을때가 있다
    + 스프라이트는 대부분 png파일이 유용
- 스프라이트로 하면 이미지 용량이 훅 준다
    + 자주 바뀌지 않는 이미지가 스프라이트에 적합
    + 여백 2px씩 해서 저장
    + 디바이스 대응시 스프라이트 크기/위치는 짝수로 하는게 좋다 (안그러면 이미지가 정확한 비율로 표현 안될수도 있음)
    + 스프라이트 원본 PSD는 꼭 보관
- `gulp spritesmith` 쓰면 이미지 최적화랑 한번에 할 수 있다
    + https://www.npmjs.com/package/gulp.spritesmith


## W3C WAI-ARIA 실전 공략 [지성봉]
- wai-area
    + `<input type="text" role="combobox" area-haspopup="true" area-expanded="false">`
    + 이런식으로 하면 스크린 리더기가 요소들을 친절하게 읽어준다
    + 버튼 요소는 `<button>`으로 써!
        * 근데 어쩔 수 없는 경우에는 span role=button 이렇게라도...
- native semantic을 변경 금지
    + 정말로 그래야 하는 것이 아닌 이상...
- click, tap, drag, drop, slide, scroll 등의 user interaction은 키보드로도 동등한 동작 가능해야함.
    + e.g. 탭 컨텐츠는 키보드로도 조작 되어야 함
    + e.g. span으로 하면 focus가 안먹잖아용
- Visible focusable 요소를 의미를 없애거나 숨겨진 요소로 인식하지 않도록.
    + 키보드 접근이 간으한 요소가 인식될 수 없다면 오류
    + area-hidden=true 요런식으로 없애버려
- 적절한 role, property
    + Role
        * 대화상자 UI라면 Dialog role
        * 탭 UI라면 tablist/tab/tabpanel role
        * 경고 알람 UI 라면 alert role
    + property
    + state
        + area-hidden, area-expanded, area-pressed
- Keyboard interaction
    + 체크박스는 space로도 체크 상태 변경되어야 함
    + 콤보박스: 상하 방향키, esc, enter, page up down, alt+상하방향키
- 의미없는 특수기호같은거를 넣으면 스크린리더가 그대로 읽는다 ("검정 사각형 어쩌구, 검정 사각형 어쩌구")
    + 인터렉션 요소 내 특정 의미 전달하는 특수기호
        * 트위터 아이콘폰트인데 스크린리더는 그냥 '버튼'이라 읽는다
        * => 버튼 요소로 감싸고 그 안에 아이콘 폰트 넣음 <`button type="button" area-label="페이스북 공유하기"><i class></i></button>`

## Google AMP(Accelerated Mobile Page) [김태훈]
- AMP란 무엇인가
    + https://www.ampproject.org/
    + 웹페이지를 더 빠르게 하는 방법
    + AMP로 하면 구글이 자기 cdn에 놓는다
- AMP HTML
    + 확장 가능한 HTML
    + amp 확장 태그를 통해 `<amp-carousel>`같은 컴포넌트 사용 가능
    + 퍼포먼스를 위한 제약: `<img>`를 `<amp-img>`로 써야 하는 등등
- amp validation
    + url 뒤에 태그 달면
- amp.js: 웹페이지 퍼포먼스 향상 위한 베스트 프랙티스 구현체
    + amp는 외부 js 허용 ㄴㄴ
- amp style=css
    + 외부 스타일, 엘리먼트 인라인 스타일 허용 ㄴㄴ
    + 문서에 삽입하는 형태의 인라인 스타일만 사용 가능 (리퀘스트를 하나라도 줄이겠다!!)
    + 최대 50kb만 허용 
- amp컴포넌트 이용해 html 만들고 amp js 로딩하면 웹페이지 빠른 렌더링 보장! 구글이 캐시까지 다 해줌
    + 구글 검색결과에만 적용
    + 일반 페이지는 4배 빠르게 사용하는 데이터는 10배 적게
- 실 사용 이슈
    + 비디오는 잘 붙음, 단 소스는 https여야 함. placeholder이미지가 반드시 필요
    + 커스텀 js를 사용 불가. 댓글 수, top버튼 동작 안함. sandbox iframe으로 구현하려 했지만 보안문제 발생
    + 외부css로딩 허용안함
- 화면에 보이는 리소스를 먼저 다운로드하고 스크롤 바깥의 리소스르르 순차적으로 레이지로딩
- 리플로우는 리페인트를 발생, 고비용 수반
    + 가능한 적게 하기
    + 변경 작업 모았다가 필요한 경우 한꺼번에 실행
    + 스타일 속성에 접근할 때는 불필요한 리플로우가 일어나지 않게 주의

## 반응형 웹디자인을 위한 넓고 얕은 지식 [윤원진]
- '반응형웹디자인'은 거의 고유명사 됨.
-  RDW는 기본. 모바일 분리대응은 고급 지원
-  css scroll snap points: `scroll-snap-type:mandatory` 안드로이드에선 안됨. 횡스크롤 촥촥 붙음
-  viewport tag는 device-width를 정석으로
-  반응형 분기: 320/640/768/1280/~
-  width뿐만 아니라 margin도 %로 하는게 나음
-  box-sizing 리셋을 추천
-  선택자 우선순위에 신경써라

## BEM, Sass와 함께 한 11번가 UI 컴포넌트 제작기 [남덕현]
- 네이밍 컨벤션
    + 서비스가 아닌 컴포넌트의 형태/용도에 맞게
- Block__Element--Modifier

## UI개발 Tip&Tech Top 10 [김정윤]
- Sublime plugin
    + autoprefixer: 브라우저 프리픽스 다 붙여줌.
    + livereload
- Fiddler(맥은 찰스 써라)
