## Event Delegation
- child element각각에 이벤트 핸들러를 달지 않고
- parent element에 단 뒤 이벤트가 발생한 노드를 필터링해 처리.
```javascript
<JS>
document.getElementById('myTd').addEventListener( 'click', function() {
   //you code goes here...
}, false );

<HTML>
<table id="myTable">
   <tbody>
      <tr>
         <td id="myTd">1, 1</td>
         <td>1, 2</td>
      </tr> 
      <tr>
         <td>2, 1</td>
         <td>2, 2</td>
      </tr>
   </tbody>
</table>
```
myTd에 클릭이벤트를 달았는데, 다른 td들에도 달고 싶다면
각자 노가다로 달아줄 수 있겠지만, 이럴 땐 이벤트를 위임하는 방법을 쓴다(Event Delegation).

```javascript
document.getElementById( 'myTable' ).addEventListener( 'click', function( e ) {
      if( e.target && e.target.nodeName == 'TD' ) {
         //you code goes here...
      }
   }, false );
```

## jQuery Event Delegation
-  이벤트 위임은 이벤트의 bubble 속성을 사용한 것입니다.
-  A 엘리먼트에 이벤트 핸들러를 등록하고 싶을 때 그 엘리먼트에 바로 붙이지 않고 그보다 상위 엘리먼트에 B에 등록합니다.
- 이벤트가 A에서 발생했어도 B로 bubble 되어 올라가는데 이때 B에 등록된 핸들러에서 A에서 발생한 것인지 살펴보고 맞으면 이벤트 핸들러를 실행하는 방식이 이벤트 위임입니다.
- .bind(), .live(), .delegate() 메서드 모두 jQuery 내부적으로는 .on() 메서드를 사용하게 소스코드가 바뀌었습니다. 
- 그래서 jQuery 1.7 이상 버전을 사용하신다면 여러 메서드들 중 하나를 선택하실 필요없이 그냥 .on() 메서드를 사용하시면 됩니다.
```javascript
// Attach a delegated event handler
$( "#list" ).on( "click", "a", function( event ) {
    event.preventDefault();
    console.log( $( this ).text() );
});
```

## Refer
http://regularmotion.kr/javascript-patterns-event-delegate/
http://hersheyweb.blogspot.kr/2013/04/javascript-event-delegation.html
http://codefactory.kr/2011/12/07/jquery-performance-tips-and-tricks/
http://learn.jquery.com/events/event-delegation/
