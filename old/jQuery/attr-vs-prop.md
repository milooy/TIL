# jQuery attr() vs prop()

## 왜 .attr()을 .prop()으로 나누었나?
- 원래 따로 사용해야할 문제였는데 버그 많아져버림
- attr : HTML의 속성을 취급
- prop : Javascript프로퍼티 취급

## example 1
```javascript
<a id="to_comments" href="#comments">코멘트 일람</a>
...
var $link = $('#to_comments');
$link.attr('href'); //#to_comment
$link.prop('href'); //#http://example.com/path/to/page#to_comment
```
- 속성: HTML으로서 기록되어있는 속성의 내용
- 프로퍼티: Javascript가 취급하는 정보.

## example 2
```javascript
<checkbox id="private" type="checkbox" checked />
...
var $checkbox = $('#private');
alert($checkbox.attr('checked')); //"checked"
alert($checkbox.prop('checked')); //true
//체크박스 해제하면?
alert($checkbox.attr('checked')); //"checked"
alert($checkbox.prop('checked')); //false
```

## Reference
http://javascriptandjquerydev.blogspot.kr/2012/07/attr-prop.html
