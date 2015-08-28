## font-face
- CSS3에 새로 추가된 웹 글꼴 명세
- 표시하려 하는 글꼴이 시스템에 없는 경우 웹 서버에서 글꼴 내려받아 표시
- 지원
    + W3C 권장형식은 `*.woff` 이다.
    + IE 6~8: `*.eot`(O) `*.woff`(X)
    + IE9: `*.eot`(O) `*.woff`(O)
    + 크롬, 사파리, 파폭, 오페라: `*.eot`(X) `*.woff` (O)

> 결국 모든 브라우저를 지원하기 위해 `*.eot`와 `*.woff`를 모두 준비해야 한다.

- @media구문 안쪽에서 @font-face규칙을 사용하는 경우 IE9 브라우저는 글꼴 요청 X

### 한 글꼴에 @font-face는 한번만 선언
표준과 비표준 글꼴을 모두 지원하기 위해 `@font-face`규칙을 두 번 사용하는 경우 IE 6~9는 두개 형식 모두 내려받아 성능에 좋지 않겠지.
```css
/* Not recommended */
@font-face{font-family:ngwoff; src:url(NanumGothic.woff)}
@font-face{font-family:ngeot; src:url(NanumGothic.eot)}
body{font-family:나눔고딕, NanumGothic, ngwoff, ngeot}
```
위 코드는 더 나은 성능을 위하여 다음과 같이 개선할 수 있습니다. `Paul Irish`가 제안한 방탄 코드 입니다.
```css
/* Recommended */
@font-face{
    font-family:ng;
    src:url(NanumGothic.eot);
    src:local(※), url(NanumGothic.woff) format(‘woff’);
}
body{font-family:나눔고딕, NanumGothic, ng}
```
- ng라는 글꼴 이름을 한번만 선언하고 `eot`형식과 `woff`를 순차저긍로 참조.
    + eot가 먼저 나와있으므로 IE 6~8은 eot만 받아온다
    + 나머지 브라우저들은 woff를 받아온다.
- `local(※)`
    - 외부자원 참조하기 이전에 시스템 글꼴을 우선 참조할 수 있도록 만들어준다.
    - IE 6~8이 local()값을 처리하지 못하는 특성 이용해 woff글꼴 추가로 요청 못하게 함.
    - `※`는 사용자 시스템에 존재하지 않을만한 글꼴을 임의로 지정
    - `format(‘woff’)`를 명시적으로 지정하면 이 형식을 지원하는 브라우저만 글꼴 내려받음.
        + 값은 반드시 따옴표 안에 있어야 함.
    - 나눔고딕 NanumGothic 두번 적은 이유는 영문으로만 작성했을때 제대로 표시하지 못하는 브라우저 있기 때문. 한글 이름이 있으면 이런 식으로 해줘라.

### IE9는 @media규칙 내부에 @font-face 허용 안함
```css
/* IE 9 does not support @font-face within @media */
@media all and (min-width:768px) {
    @font-face{
        font-family:ng;
        src:url(NanumGothic.eot);
        src:local(※), url(NanumGothic.woff) format(‘woff’)
    }
    body{font-family:나눔고딕, NanumGothic, ng}
}
```
- IE9는 미디어 구문 안쪽에 선언하면 외부 글꼴을 요청하지 않음.
- @font-face를 @media 밖에 빼면 된다.

## 웹폰트 빠르게 로딩하기
[보고 공부한 링크](https://nolboo.github.io/blog/2013/10/22/google-web-font-faster-tip/)
1. 구글 임포트 코드를 `HEAD`태그의 가장 첫번째(CSS보다 앞)에 위치
2. link로 로드해라
    - 구글 웹폰트 로딩 방법은 `@import`, `참조링크`, `js`세가지.
    - 참조링크 이용해서 HTML최상에 코드넣어라.
    - `<link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>`
3. 적은 폰트 갯수
    - 표제를 위한 볼드타입 / 가시를 위한 가독성 좋은 폰트 최대2개 폰트 선정
4. 코드 한줄에 여러 폰트 로드
    - `<link href='http://fonts.googleapis.com/css?family=Open+Sans|Oswald' rel='stylesheet' type='text/css'>`
5. 쓸것만 로드: 폰트 weight옵션 쓸것만 로드한다
6. Load faster fonts: 폰트마다 로딩 시간 다르니 빠른걸로 골라라
7. 정말 확실히 로드해야한다면 Web Font Loader를 써라. 
    - 사이트 나머지 로드되기 전에 로드하고, 스타일되지 않은 텍스트가 번쩍이는 것을 확실히 피해준다.

## 한글 웹 폰트 경량화해 사용하기
[보고 공부한 링크](http://blog.coderifleman.com/post/111825720099/%ED%95%9C%EA%B8%80-%EC%9B%B9-%ED%8F%B0%ED%8A%B8-%EA%B2%BD%EB%9F%89%ED%99%94%ED%95%B4-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)


## Refer
[웹 폰트 문제 해결. @font-face troubleshooting](http://naradesign.net/wp/2012/06/19/1830/)
[구글 웹폰트를 빠르게 로드하는 팁 7가지](https://nolboo.github.io/blog/2013/10/22/google-web-font-faster-tip/)
[한글 웹 폰트 경량화해 사용하기](http://blog.coderifleman.com/post/111825720099/%ED%95%9C%EA%B8%80-%EC%9B%B9-%ED%8F%B0%ED%8A%B8-%EA%B2%BD%EB%9F%89%ED%99%94%ED%95%B4-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)
[웹폰트 사용](http://www.freezner.com/archives/215)
https://www.igvita.com/2014/01/31/optimizing-web-font-rendering-performance/
https://www.igvita.com/2012/09/12/web-fonts-performance-making-pretty-fast/
[경량화된 한글 노토 산스 폰트를 웹폰트로 사용할 수 있도록 CDN 서비스를 하는 곳.](http://theeluwin.github.io/NotoSansKR-Hestia/)
