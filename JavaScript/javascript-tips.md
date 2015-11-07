#Javascript Tips

##Dom List에서 text만 뽑아내기
html()같은 건 jquery object이기에 그냥 하면 안된다.
```javascript
var comic_title = $('.tt-dataset-comics .tt-suggestion .comic-title');
comic_title.map(function() {return $(this).html()})
```

##Random Number
```javascript
//0~4까지 랜덤넘버
Math.floor(Math.random()*5);
```

## javascript shorthand techniques
http://www.sitepoint.com/shorthand-javascript-techniques/

## javascript 성능 향상 팁
https://drive.google.com/drive/u/1/folders/0B9wrUHe_cO9Gfjd0dVFGTl9hYVFBcFhpQnp5bUtva2lMX3puR3Zfa0VkY2ZxYzhsdFI2M3M

## Using map to reverse String
```javascript
var str = '12345';
[].map.call(str, function(x) {
  return x;
}).reverse().join(''); 
// Output: '54321'
```

## Array 빈 값으로 초기화
```javascript
var arr = Array.apply(null, Array(3));
```
http://www.2ality.com/2013/11/initializing-arrays.html

## Javascript history.pushState 오류 – Failed to execute ‘pushState’ on ‘History’
> Uncaught DOMException: Failed to execute 'pushState' on 'History': A history state object with URL 'file://localhost/Users/jayjin/Documents/Programming/2015-02-HTML5/active' cannot be created in a document with origin 'null'.

투두리스트 웹앱을 만들며 탭간 이동에 history를 주려고 탭을 클릭했을 때

```javascript

history.pushState({"method":"active"}, null, "active");

```

이 코드를 실행하게 해두었더니, 글 제일 위의 저런 에러가 뜨는것이었다.
역시나 스택오버플로우 님께서 도와주셨는데,
local에서 돌릴 때 경로 인식이 꼬여서 그런것이었다.

```javascript

history.pushState({"method":"active"}, null, "#/active");

```

이와같이 #/active 로 고쳐주니 정상동작!
### Refer
http://stackoverflow.com/questions/20079704/javascript-history-pushstate-not-working

## 자바스크립트 공부
- JS 배우는 예쁜 사이트
    - http://jstherightway.org/
    - http://bonsaiden.github.io/JavaScript-Garden/ko/
- 제이쿼리 강좌
    - http://direct.co.kr/cs/jQuery.pdf
    - http://xguru.net/503
    - http://www.taeyo.pe.kr/Columns/List.aspx?SEQ=29&IDX=0
    - http://m.ppomppu.co.kr/new/bbs_view.php?id=developer&no=2304

## 클래스 기반 언어 vs 자바스크립트 (꼭 읽을것!)
http://www.bsidesoft.com/?p=318
