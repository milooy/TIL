# Web Storage
## Web Storage?
HTML5에는 웹사이트 데이터를 클라이언트에 저장할 수 있는 새로운 자료구조인 Web Storage스펙이 포함됨.
키-값 쌍으로 데이터를 저장하고 키를 기반으로 데이터를 조회하는 심플한 패턴.
종류는 2가지가 있는데,
- localStorage: 영구저장소
- sessionStorage: 임시저장소
처럼 데이터의 지속성을 구별하여 사용할 수 있다.
[브라우저 지원 현황](http://caniuse.com/#search=localstorage)을 보면 현재 오페라 미니 빼고 모두 지원한다.

## 쿠키와의 차이점
- 쿠키는 맛있다.
- 쿠키는 매번 서버로 전송된다.
    + Web storage는 저장된 데이터가 클라에 존재할 뿐 서버전송은 이루어지지 않는다(=>네트워크 트래픽 비용을 줄여주는 중요한 장점)
- 단순 문자열을 넘어 (스크립트)객체정보를 저장 가능.
    + 체계적으로 구조화된 객체 저장 가능.(브라우저 지원여부 확인 필요)
- 쿠키와 다르게 용량 제한이 없다.
- 영구 데이터 저장이 가능하다.
    + 로컬스토리지는 브라우저 종료해도 데이터 보관, 세션스토리지는 데이터 지움.

## 사용법
```javascript
localStorage.setItem('foo', 'bar');
localStorage.getItem('foo'); //'bar'
localStorage['foo']; //'bar'

localStorage.removeItem(키);
localStorage.clear(); //모두 지움
localStorage.length; //저장된 키의 개수
localStorage.key(값); //값으로 키를 찾음

window.addEventListener('storage', function(e){ //이벤트 처리
    // do sth
}, false);
```
- key와 value 모두 String으로 저장된다.
- getItem으로 값 못찾으면, 에러 발생이 아니고 `null`리턴.
- 대부분의 브라우저에서는 다른 윈도우에서 로컬 스토리지의 데이터를 변경했을 때 이벤트가 발생한다.
즉, 같은 창에 이벤트를 추가하고, localStroage의 값을 변경해도 이벤트가 발생하지 않는다.
아마도, 자신의 window에서는 변경된 상황을 알고 있을 것이라는 가정 때문인가 보다. [링크](http://stackoverflow.com/questions/5370784/localstorage-eventlistener-is-not-called)

## 세션스토리지 예제
```javascript
// Get the text field that we're going to track
var field = document.getElementById("field");
 
// See if we have an autosave value
// (this will only happen if the page is accidentally refreshed)
if (sessionStorage.getItem("autosave")) {
  // Restore the contents of the text field
  field.value = sessionStorage.getItem("autosave");
}
 
// Listen for changes in the text field
field.addEventListener("change", function() {
  // And save the results into the session storage object
  sessionStorage.setItem("autosave", field.value);
});
```

## localStorage에 json저장
http://stackoverflow.com/questions/2010892/storing-objects-in-html5-localstorage
http://stackoverflow.com/questions/23728626/localstorage-and-json-stringify-json-parse
```javascript
var testObject = { 'one': 1, 'two': 2, 'three': 3 };

// Put the object into storage
localStorage.setItem('testObject', JSON.stringify(testObject));

// Retrieve the object from storage
var retrievedObject = localStorage.getItem('testObject');

console.log('retrievedObject: ', JSON.parse(retrievedObject));
```

## localStorage모든 아이템 꺼내오기
http://stackoverflow.com/questions/17745292/all-local-storage-items
```javascript
function allStorage(){

    var archive = [],
        keys = Object.keys(localStorage),
        i = 0;

    for (; i < keys.length; i++) {
        archive.push( localStorage.getItem(keys[i]) );
    }

    return archive;
}
```

## Refer
[MDN Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
[HTML5 Web Storage](http://m.mkexdev.net/59)
[HTML5 LocalStorage 살펴보기](http://ohgyun.com/417)
[MDN Storage](https://developer.mozilla.org/ko/docs/Web/API/Storage)
