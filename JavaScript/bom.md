# 브라우저 객체 모델

* 과거엔 브라우저마다 달랐음
* HTML5에서 다루고 있으며, 표준화 되어가고 있다.
- 5.2 The Window object
- 5.5 Session history and navigation
- 6.3 Dynamic markup insertion
- 등등

Q: ECMA에서는 BOM을 다루지 않는가?

## 1. window 객체

브라우저 창의 JS 인터페이스
ECMA 스크립트 Global 객체로 기능

### 1.1 전역 스코프

전역에서 선언한 변수와 함수는 모두 window객체의 프로퍼티/메서드

```
var age = 29;
function sayAge(){
    alert(this.age) ;
}

alert(window.age); // 29
sayAge(); // 29
window.sayAge(); // 29
```

window를 생략해서 쓸 수 있다

window를 사용하지 않는 것과 사용하는 것이 약간의 차이 있음.
window에 정의하는 경우 delete 연산자로 제거 가능

```
var age = 29;
window.color = "red"
// IE9 미만에서는 에러， 다른 브라우저에서는 모두 false 반환
delete window.age;
// IE9 미만에서는 에러， 다른 브라우저에서는 모두 true 반환
delete window.color;
alert(window.color); / / undefined
```

선언하지 않았을 가능성이 있는 변수의 존재 여부를 window 객체를 통해 확인 가능

```
// oldValue를선언한적 없으므로 에러가발생합니다
var newValue = oldValue ;

// 아래는프로퍼티 검색이므로 에러가발생하지 않습니다
// newValue는 undefìned로 설정됩니다
var newValue = window.oldValue;
```

### 1.2 창 사이의 관계와 프레임

```
<htm1>
    <head>
        <tit1e>Frameset Examp1e</tit1e>
    </head>
    <frameset rows="160,*">
        <frame src="frame.htm" name="topFrame">
        <frameset cols="50%, 50%">
            <frame src="anotherframe.htm" name="leftFrame">
            <frame src="yetanotherframe.htm" name="rightFrame">
        </frameset>
    </frameset>
</html>
```
프레임에 접근하는 다양한 방법
```
window.frames[O]
window.frames["topFrame"]
top.frames[O]
top.frames ["topFrame"]
frames[O]
frames["topFrame"]
```

top, parent, self 객체

### 1.3 창의 위치

창 위치를 판단하는 크로스 브라우저 코드 (IE, 오페라 vs 파이어폭스, 사파리/크롬은 양쪽 지원)
```js
var leftPos = (typeof window.screenLeft "number") ? window.screenLeft : window.screenX;
var topPos = (typeof window.screenTop "number") ? window.screenTop : window.screenY;
```

```
// 창을 왼쪽 위 구석으로 옮깁니다
window.moveTo(0,0);
// 창을 아래쪽으로 100 픽셀 옮깁니다
window.moveBy(0, 100);
// 창을 (200, 30이으로 옮깁니다
window.moveTo(200, 300);
// 창을 왼쪽으로 50 픽셀 옮깁니다
window.moveBy(-S0, 0);
```

### 1.4 창 크기

outerWidth, outerHeight : 창 크기
innerWidth, innerHeight : 테두리, 툴바 포함되지 않은 창 크기

IE8에서는 DOM을 사용해서 알아냄
document.documentElement.clientWidth : 뷰포트 너비
document.documentElement.clientHeight : 뷰포트 높이

모바일에서는 창크기와 뷰포트의 값이 동일함
레이아웃 뷰포트는 또 다른 개념. 렌더링 된 페이지의 크기를 알 수 있음

```
// 1OOx1OO으로 변경
window.resizeTo(100,100);
// 1OOx1OO에서 200x150으로 변경
window.resizeBy(200,150);
// 300x300으로 변경
window.resizeTo(300,300);
```

### 1.5 내비게이션과 열기

window.open() : 새 창 열기
```
window.open("http://www.wrox.com/" , "topFrame");
// _self, _parent, _top, _blank 등도 쓸 수 있음

window.open("http://www.wrox.com/", "wroxWindow","height=400,width=400, top=10, left=10, resizable=yes");
// 다양한 매개변수 지정 가능 : width,height,left,location,menubar,resizable, scrollbars, status

// 창 닫기
wroxWin.close();
```

보안상 제한과 팝업 차단을 가정해서 작업해야 함

### 1.6 인터벌과 타임아웃

```
// 이렇게 하변 안됩니다 : 성능이 떨어진다
setTimeout("alert(’Hello world!’)", 1000);

// 이렇게하십시오
setTimeout(function() {
    alert("Hello world!");
}, 1000);
```
큐에 등록된 작업을 취소하려면 다음과 같이

```
// 타임아웃설정
var timeoutId = setTimeout(function() {
    alert ("Hello world!");
}, 1000);

// 타임아웃취소 : 실행전에만 취소 가능
clearTimeout(timeoutId);
```

setInterval 도 유사함, setTimeout으로 대체 가능하기 때문에 잘 쓰지 않음

### 1.7 시스템 대화상자
alert(), confirm(), prompt()
window.print(); // 인쇄
window.find(); // 찾기

## 2 location 객체
DOM 객체 이기도 함
window.location은 document.location과 동일함

location 프로퍼티 들
* hash : URL 해시(#)
* host : 서버 이름과 포트 변호(있다면)
* hostname : 포트번호를 제외한 서버이름
* href : 현재 페이지의 완전한 URL
* pathname : URL에 포함된 디렉터리 및 파일 이름
* port : 포트번호
* protocol : 페이지에서 사용하는 프로토콜 ex)http:, https:
* search : URL의 쿼리 스트링 부분

### 2.1 쿼리스트링 확장

location.search 프로퍼티가 URL의 물음표 다음을 반환하긴 하지만， 쿼리스트링 매개변수를 하나씩 분리해서 제공하지는 않습니다.
그래서 파싱해서 사용해야 함

```
// 쿼리스트링이 ?q=Toby&num=10 라고가정합니다
var args = getQueryStringArgs();

alert(args["q“]); // "Toby"
alert(args["num"]); // "10"
```

### 2.2 location 조작

```
location.assign("http://lezhin.com"); // 페이지 이동
window.location = "http://lezhin.com";
location.href = "http://lezhin.com";

location.reload() ; // 가능하면 캐시에서
location.reload(true); // 항상 서버에서
```

## 3 navigator 객체

navigator 객체 프로퍼티
* appCodeName
* appMinorVersion
* appName : 완전한브라우저 이름
* appVersion : 브라우저 버전
* buildID
* cookieEnabled
* cpuClass
* javaEnabled()
* language
* mimeTypes
* onLine
* oscpu
* platform
* plugins
* preference()
* product
* productSub
* userAgent : 브라우저 문자열
* userLanguage
* userProfile
* vendor
* vendorSub

### 3.1 플러그인 감지

```
// 플러그인 탐지 - IE에서는 동작하지 않습니다
function hasPlugin(name){
    name = name.toLowerCase();
    for (var i=0; i < navigator.plugins.length; i++){
        if (navigator.plugins[il.name.toLowerCase().indexOf(name)
            return true;
        }
    }
    return false;
}
// 플래시를찾음
alert(hasPlugin("Flash"));

// 퀵타임을찾음
alert(hasPlugin("QuickTime")) ;
```
IE는 예외처리해서 찾도록 함

### 3.2 처리기등록

HTML5에서 되살아난 registerContentHandler()와 registerProtocolHandler() 메서드

#### registerContentHandler()

웹사이트가 특정한 마임 타입의 정보를 처리할 수 있음
```
// 어떤 사이트를 RSS 피드 처리기로 등록하기
navigator.registerContentHandler("application/rss+xml","http://www.somereader.com?feed=%s" , "Some Reader");
```

#### registerProtocolHandler()

웹사이트가 특정한 프로토콜의 정보를 처리할 수 있음
("mailto" , "ftp" 등)

## 4 screen 객체

픽셀 너비와 높이 등 클라이언트 화면에 관한 정보
많은 브라우저에서 이 기능을 제한하므로 이 코드는 동작하지 않을때가 많음

screen.width, screen.height 정도 사용함
iOS, Android 갱신 방식 다름

## 5 history 객체

```
// 한페이지 뒤로
history.go(-1) ;

// 한페이지 앞으로
history.go(1) ;

// 두페이지 앞으로
history.go(2);

// 한페이지 뒤로
history.back() ;

// 한페이지 앞으로
history.forward();

if (history.length == 0){
  // 시용자가 이 페이지를 처음으로 열었을 때 실행할 코드
}
```
