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
    
## 0721 수업
- CSS animation이 성능이 더 좋지만
    + 나의 인터랙션에 의해 애니메이션이 바뀌어야 하거나
    + 저사양 브라우저같은 경우는 js로 해야한다.
- Animation이 버블링된다는것도 숙지! 
- try catch의 비용도 생각해라.
    + context switching(with구문!!(쓰지마))
- native js와 jQuery섞어쓰면 문제점
    + maintainess 이슈
- 시간 이슈
    + 1. 초기성능
        * 핵심포인트: 네트워크
            - 적게 호출하는게 좋음!
    + 2. 인터렉션 성능
        * 핵심포인트: DOM
            - 가능하면 적게 돔을 다루는게 좋음!!
- fileupload는 blob으로 분할해서 할 수 있다.

## 0726 week4 강의
[link](http://portal.nhnnext.org/streaming/2014/2%ED%95%99%EA%B8%B0/HTML5%20Programming%20-%201/%EC%A0%84%EC%9A%A9%EC%9A%B0/325)
- 학습할거
    + online/offline 이벤트
    + pushstate, popstate, replacestate를 이용한 히스토리 관리
- 만약 인터넷이 끊겼다면?
    + online/offline 상황 알수있다
        * window.addEventListener('online', callback);
        * window.addEventListener('offline', callback);
        * navigator.online //boolean
- 히스토리 관리
    + active는 해야할것, completed는 완료된것 보여준다.
    + 동적으로 페이지를 바꿀 때도 히스토리 관리가 필요.(사용자가 뒤로가기 눌렀을때)
    + =>popstate...
    + history.pushState({'id':1}, "active", "active.html"); //파라미터, url, 보여줄 html
    + history.pushState({'id':2}, "completed", "completed.html");
    + completed.html에서 뒤로가기 누르면 
    + window.addEventListener('popstate', function(e){e.state'//파라미터 객체{'id':2 => {'id':1}}})
- 메서드/이벤트
    + history.pushState(param, titleName, url);
        * 주소도 바뀌고 히스토리도 변경
    + history.replaceState(param, titleName, url);
        * 주소만 바뀌고 히스토리는 변경안함
    + window.addEventListener('popstate', function(e){e.state;});
        * pushstate나 replaceState에서 첫 번째 인자로 넣은 객체가 들어있음.
- 메소드 호출을
    + `a.some()`으로 호출할 수 있고
    + `a['some']()`으로 할수도 있지.
```javascript
//얘랑
if(navigator.online) {
    document.getElementById("header").classList.remove('offline');
} else {
    document.getElementById("header").classList.add('online');
}
//얘는 동일
document.getElementById("header").classList[navigator.online? "remove" : "add"] ("offline")
```

## 0728 수업
```javascript
//모듈화 - 외부에서 접근불가
var TODO = (function() {
    function fadeIn() {

        },
    return {
        "make" : function() {
            ...
        }, 
        "delete": function() { //예약어를 이름으로 쓸때 이래 쓴다. 호출시엔 ['delete']이런식. 혹은 데이터로 주고받는다(valid한 JSON)할때 따옴표 쓴다.

        } 
    }
})
```
- 클로져?!
- jQuery attr vs prop
    + attr는 실제 html태그에 있는 속성을 가져옴.
    + prop은 현재상태

## 140802
```javascript
//얘랑
if(method === 'all') { // 삼항연산자로 해결
    this.allView();
} else if(method === 'active') {
    this.activeView();
} else if(method === 'completed') {
    this.completedView();
}

//얘는 같다
this[method+"View"]();
```

## 150811
- 차세대 좋은것 (꼭!)
    + Web Worker
        * js는 보통 싱글스레드로 돌아가는데 그걸 브라우저에서 좀 보안해줘서 백그라운드 작업을 할 수 있도록.
        * 큰 작업(사진에 필터적용)같은거 할 때 화면에서 딴짓(e.g. 스크롤)할 수 있게 해준다(안쓰면 페이지 freeze)
        * http://m.mkexdev.net/52
    + promise

## 0825
- 웹폰트를 `@import`로 가져오면 안되는 이유
    + 병렬로 받지 못함
    + [dont' use import](http://www.stevesouders.com/blog/2009/04/09/dont-use-import/)
- HTML/CSS/JS 파일을 분리하는 이유?
    + 여러 가지가 있지.
    + 근데 합치는 경우도 있다.
        * google 사이트가 그렇게 만듦
        * 네트워크 느린 국가에서도 잘 접속되라고.
- 캐러셀 만들기
    + 1. 처음에 다 불러온다 (초기로딩 slow, UX증가)
    + 2. 누를때마다 불러온다 (초기로딩 fast, UX감소)
    + 3. 양 옆 세개만 불러온다 (1과 2의 중간. 보통 이렇게 많이 씀)
    + => 사용자 패턴 분석해서 결정한다.
    + 엔터와 리브: 엘리먼트 기준
    + 오버와 아웃: 영역기준 (거꾸론가??)

## 0901
- 캔버스에서 외부에서 가져온 이미지를 조작할 수 없다!
    + xhr을 사용한다
    + img.crossOrigin = 'anonymous'를 쓴다.
- 정말 많이 쓰는 패턴

```javascript
uploader.on('drop', function() {
    //do sth
    count++;
    if(count<data.files.length) {
        read(data.files[count]);
    }
}
reader.readAsDataURL(file);
})
```
- [Web Audio API](http://www.html5rocks.com/en/tutorials/webaudio/intro/)
- [placeholder](https://github.com/JB1021/MWIKI-02-2015/commit/fe336d4f798cba0531cf63a3874a44ab746561e0#commitcomment-12976046)
- [canvas에 해상도](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL)
- promise 활용하기

```javascript
function foo () {
var promise = new Promise(function(resolve){
        setTimeout(function(){
            console.log("foo done");
            resolve(bar);
        },1000);
    });

    return promise;
}


function bar () {
    var promise = new Promise(function(resolve){
        setTimeout(function(){
            console.log("bar done");
            resolve(barz);
        },1000);
    });

    return promise;
}

function barz () {
    var promise = new Promise(function(resolve){
        setTimeout(function(){
            console.log("barz done");
            resolve(bar);
        },1000);
    });

    return promise;
}

// foo을 호출하면 bar을 반환하고 bar을 호출하면 barz을 반환한다.
// barz가 완료되면 console.log("완료")라고 출력한다.

// then을 활용하여 "foo done -> bar done -> barz done -> 완료"의 로그가 나오도록 구현하라.
```
- [link, import의 차이](http://www.stevesouders.com/blog/2009/04/09/dont-use-import/)
    - 그럼 왜 web font에는 import를 사용하라고 했을까?
- 이미지 슬라이드를 어떻게 만들까?
- HTML5 WebWorker
    - 설명 [링크](http://www.html5rocks.com/en/tutorials/workers/basics/), [링크](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)
    - [JS없이 생성하는 방법](https://github.com/minhyeok4dev/Backorage.js/blob/master/dist/backorage.js#L33)
- [File Drag/Drop 링크](https://github.com/helloheesu/jpeg_compressor/blob/master/index.js#L19)
- Canvas CORS
    - canvas에서 내부 이미지를 가져올 때
        - FileReader을 사용한다.
        - createObjectURL을 사용한다.(로컬일 때 안됨)
    - canvas에서 외부 이미지를 가져올 때 (둘 다 CORS을 따른다)
        - xhr을 사용한다.
        - img.crossOrigin = 'anonymous'을 사용한다.
- canvas pixel data 링크

## 0908
```js
var aArgs = Array.prototype.slice.call(arguments, 1);
var fBound = function() {
    return fToBind.applay(this instanceof fNOP
        ? this
        : oThis,
        aArgs.concat(Array.prototype.slice.call(arguments)));
};
```
- 제일 위의 aArgs코드: 배열이 아닌 것(e.g. 노드리스트)을 배열로 바꾸는 코드
