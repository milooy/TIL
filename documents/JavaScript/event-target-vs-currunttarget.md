## target vs curruntTarget
```javascript
<div class="yellow" id="yellow" style="background: #ff0; width: 300px; height: 150px">
    <div class="green" style="background: #0f0; width: 200px; height: 100px"></div>
</div>

<script type="text/javascript">
var divYellow = document.getElementById('yellow');
divYellow.onclick = function(e){
    e = e || window.event;
    var target = e.target || e.srcElement; //ie대응
    var current = e.currentTarget || this; //ie대응
    alert('target: '+target.className + ' currentTarget: ' + current.className);
}
</script>
```
아래노랑네모에 클릭이벤트를 걸고,

>위초록네모 클릭-> target:위초록 curruetTarget:아래노랑
>아래노랑네모 클릭-> target:아래노랑 currentTarget:아래노랑

위초록네모를 클릭하면 그걸 감싸고 있는 아래노랑네모에 event가 bubbling되어 이벤트 발생.

e.target: 이벤트가 일어난 곳
e.currentTarget: 실제로 이벤트가 걸려있는 위치

## jQuery curruntTarget, target, delegateTarget
```javascript
$( "p" ).click(function( event ) {
  alert( event.currentTarget === this ); // true
});
```
> jquery의 curruntTarget은 this와 동일하다.

```javascript
$('#todo-list').on( "click", '.toggle', completedTODO);

function completedTODO() {
    console.log(this); //.toggle
    console.log(e.currentTarget); //.toggle
    console.log(e.target); //.toggle
    console.log(e.delegateTarget); //#todo-list
}
```
> `e.delegateTarget`은 이벤트 딜리게이션을 걸어준 타겟을 반환한다.

## Refer
https://api.jquery.com/event.currentTarget/
http://jsfiddle.net/misteroneill/kmn4A/3/
http://lidaf.tistory.com/38
https://api.jquery.com/event.delegateTarget/
