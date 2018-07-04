# Javascript 함수 실행 다양한 방법

## load
```javascript
<head>
    <script>
        document.addEventListener('load', function(){
            var t = document.getElementById('target');
            console.log(t);
        })
    </script>
</head>
<body>
    <p id="target">Hello</p>
</body>
```
- 스크립트를 앞에 두고 `#target`을 찾으면 에러가 난다. 아직 HTML이 로드가 되지 않았기 때문이다.
- 이를 해결하려면 `script`를 문서 뒤에 두거나,
- window.load이벤트를 쓴다. 이는 문서 내의 모든 리소스(이미지, 스크립트)가 모두 다운된 후에 실행된다. 하지만 앱 구동이 지연되는 단점이 있을 수도 있음. 옛날 방식이니 지양.

## DOMContentsLoaded
```javascript
window.addEventListener('DOMContentLoaded', function(){
    console.log('DOMContentLoaded');
})
```
- initial HTML document가 로드되면 실행된다. stylesheets, images, subframes는 기다리지 않아서 더 빠름.
- 이걸 써도 무방할 때 window.load를 쓰지 말자. 

## jQuery ready
```javascript
$(document).ready(function() {
    //...
});

$(function() {
    //...
});
```
- 브라우저에서 DOM트리 생성하고 난 후에 실행됨.

## jQuery load
```javascript
$(window).load(function(){
  //...
}); 
```
- 모든 include되는 프레임들과 object, 이미지까지 로드된 이후에 실행.

## 즉시실행함수
```javascript
//아래 함수선언문은 아무것도 반환하지 않는다(혹은 undefined)
function() {} 

//이런 표현식을 쓰면 !undefined는 true를 반환한다. 그리고 바로 실행하기도 함.
!function() {}()

//함수 실행의 결과로 실제 반환되는 값을 얻으려면
(function(){})();

//익명 즉시실행함수(더글러스 클락포드 권장표기법)
(function() {}());
```
```javascript
// 아래 두 함수는 동일한 동작을 수행한다.
// 함수표현식에 의한 명시적인 함수호출
var app = function() {
    console.log('함수 호출'); // "함수 호출" 출력
};
app();

// 즉시실행함수
(function() {
    console.log('함수 호출'); // "함수 호출" 출력
}());
```
- 외부에 공유되면 안되거나 공유될 필요가 없는 속성이나 메서드는 이렇게 한다.
```javascript
var app = (function() {
    var privateVar = 'Jay';
    return {
        prop : privateVar
    };
}());
console.log(app.prop); //"Jay"
```
- 즉시실행함수 내에서 선언한 변수를 외부에서도 접근 가능.
- 이처럼 즉시실행함수는 변수의 스코프를 포함하는데 사용되며, 외부에서 함수 내에 접근 할 때 이를 통제할 수 있음.
- 글로벌 네임스페이스에 변수 추가 안해도 되어 코드충돌 없이 구현할 수 있기 때문에 플러그인이나 라이브러리 등을 만들 떄 많이 사용됨.
```javascript
// 즉시실행함수에서 파라미터 전달하는 방법
(function(myName){
    console.log("my name is "+ myName + "입니다");
}('Jay'));
```

## @fallroot님 스타일
```javascript
!function(window, document, undefined) {
    //...
}(window, document);
```
- 안에서 window, document를 자주 쓰니까 할당해옴 (?)
- 질문 필요
- 아으 내 기억력


## Refer
[생활코딩 문서 로딩](https://opentutorials.org/module/904/6765)
[MDN DOMContentLoaded](https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded)
[jquery ready](https://api.jquery.com/ready/)
[함수 다시 보기](http://www.nextree.co.kr/p4150/)
