# 2015 2학기 NHN NEXT HTML5 수업
## 0707
[깃헙위키](https://github.com/NHNNEXT/2015-02-HTML5/wiki/1%EC%A3%BC%EC%B0%A8-%EA%B3%B5%EC%9C%A0)
- jQuery를 사용하는게 과연 빠를까?
    + 필요한 jQuery만 다운?
        * 네트워크 문제? 자잘한거 많이보단 큰거 한방에 다운받는게 더 빠름.
    + 사용자들의 행위에 따라 다양하게 로딩.
        * 많이쓰는건 먼저, 적게쓰는건 늦게?
        * 네이버 지도 -> 길찾기 탭을 누르면, 거기에 필요한 js를 새로 받아온다.(비교적 덜 쓰는 기능이기 때문.)
        * => 본인의 서비스를 분석해야한다.
- 자바스크립트 lazy loading
    + require.js
    + AMD mode (?)
- template의 위치는 html? js 어디에 있어야 좋을까?
    + html에 있으면 캐싱이 안된다!
    + 혹은 재사용도 안된다.(여기저기 붙여넣을 수 없다.)
    + 템플릿 폴더를 만들어 거기에 넣어두 된다.
        * 왔다갔다해서 귀찮을 수도.
    + 템플릿코드가 작으면 그냥 html에 넣는게 효과적.
        * 네트워크는 커넥션 맺는 코드가 성능 결정짓는데 가장 큰 역할. 
- 돔 추가하기
    + appendChild는 돔을 만들어야되서 귀찮다면
    + 문자열이 들어갈 수 있는 템플릿코드를 써서 innerHTML을 사용하려는데 
    + innerHTML로 새로 추가하면 안에 데이터가 아예 갈려져서 들어간다.
    + 그래서 +innerHTML로 추가하려니 매번 새로 그리게 된다.
    + 그러면 가장 큰 문제점이, 예전 돔이랑 달라진다는 것이다
        * checked같은걸 해둬도, 그게 풀린다!
        * 성능상 문제도 있겠지.
    + insertAdjacentHTML은 밑에 추가해준다.
    + jQuery의 append()도 insertAdjacentHTML로 구현되어있다!
    + jQuery의 clone()은 아예 똑같이 받아온다!
        * true로 넘기면 이벤트까지 다 똑같이 받아오고
        * false는 생긴걸로만 받아온다.
- 속성이 있는지 확인할 때 `return MyObject.someProperty`이것 보다 `return someProperty in MyObject` 이걸 많이 쓸까? 

```javascript
//클로져 활용
"get" : function(text) {
    var template = Handlebars.comple(...);
    
    //이 방법은 축약형
    return (this.get = function(text){
        return template({body:text});
        })(text);
    
    //이 방법은 긴 형.
    this.get = function(text){
        return template({body:text});
    }
    return this.get(text);
}
```

## 0708 - week3 강의
- XMLHttpRequest
    + XHR 이라 함
- XHR2의 특징
    + CORS
        * cross-origin resource sharing
        * 동일근원정책(Same-Origin-Policy)로 타 도메인간 통신이 불가능
        * e.g www.naver.com에서 www.line.com에서 데이터 요청 불가능(blog.naver.com도!)
        * 가운데 flash를 껴서 ajax통신을 하는게 3~4년전엔 많았다.
        * 왜이제 안쓰냐? 스마트폰때문. flash지원 안함.
        * 대체재로 나온게 JSONP
            - 타도메인간 자원공유할 몇가지 태그들 있음.
            - 이미지, 스크립트, 아이프레임 등은 외부 자원이라도 가져올 수 있다.
        * 최근 XHR의 경우 타 도메인간 통신이 가능함!
        * 고민
            - 그럼, 아무나 다 요청을 보내면 서버는 모두 응답해줘야할까?
            - 보안상 이슈는 없을까?
            - =>서버에서 허락한 주소만 응답한다!
                + Access-Control-Allow-Origin헤더에 설정한 url만 접근가능함.
                + *사용가능.
                    * http://*.naver.com, 
                    * http://www.naver.com/some/* 
                + e.g `res.setHeader("Access-Control-Allow-Origin", "http://www.naver.com")` : naver.com으로 접속한애만 접근가능;
        * 서버에서 자세히 설정
            - 타 도메인간 통신으로 인하여 보안에 유의해야 함.
            - 다양한 설정을 해야함.
                + Access-Control-Allow-Credentials: 쿠키 설정
                + Access-Control-Allow-Headers: 헤더 설정
                + Access-Control-Allow-Methods: method설정 (e.g GET이나 PUT만 받을 수 있어!)
            - =>서버가 해야하는 요청들을 좀 분리 
            - =>클라에선 요청만 하면 됨!
        * Preflight Request
            - 3 handshake과정
            - HTTP요청 보내기 전 과정
                + CORS를 사용한 리퀘스트도 이 리퀘스트 보냄.
                + 서버로 브라우저가 요청을 보내서 서버가 OK라 하면 다시 보내서 응답받고 그걸 진짜로 보내준다.
                + 3 handshake과정처럼.
- data-* 속성
    + 엘리먼트에 데이터 넣는 표준
    + data를 넣는 용도
        + Web이 복잡해지며 DOM에 값을 저장해야 하는 경우가 많이 발생
        + 마크업에 넣을땐 `<div data-some="1"></div>`
        + js에는 `div.dataset.some`으로 사용.
```javascript
<ul id="myItems">
    <li class='items' data-item="1" data-type="text">item1</li>
    <li class='items' data-item="2" data-type="text">item2</li>
    <li class='items' data-item="3" data-type="number">3</li>
</ul>
```
- api생긴거
    + URL: http://ui.nhnnext.org:3333/아이디
    + URL: http://ui.nhnnext.org:3333/아이디/todo키값
    + http://cafe.nhnnext.org/html515/notice/250012
    + ![api](img/HTML5-2015-next/1.png "API")
    + ![api-get](img/HTML5-2015-next/2.png "API - GET")
    + ![api-etc](img/HTML5-2015-next/3.png "API - ETC")
- 실습
    + ajax
        * 전체 가져올때
        * 추가할때
        * 완료할때
        * 삭제할때

## 0714 수업
- CSS animation
    + js animation보다 더 성능이 좋다. 백그라운드로 돌아가니까.
- requestAnimationFrame 부드러움
    + 모니터 갱신 주기에 맞춰서 바뀌니.
    
