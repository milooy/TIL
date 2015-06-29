# Javascript Event Bubbling

```html
<html>
<head>
   <style>
      div { margin: 10px; padding: 10px; background-color: red; }
      div div { background-color: yellow; } 
      div div div { background-color: blue; }
      textarea { width: 90%; height: 200px; }
  </style>
</head>
<body>
   <div id="depth1">
      <div id="depth2">
         <div id="depth3">
         </div>
     </div>
 </div>
 <textarea></textarea>
</body>
</html> 
```

```javascript
window.onload = function(e) {
    var logger = document.getElementsByTagName("textarea")[0];
    function log(newtext) {
        logger.value += newtext + "\n";
        logger.scrollTop = logger.scrollHeight; 
    }
    var divs = document.getElementsByTagName("div");
    for(var i=0; i < divs.length; i++) {
        (function(){
            var div = divs[i];
            div.onmouseover = function(e) {
                if(div.id === "depth1") {
                    log(div.id);
                }
                else if(div.id === "depth2")  {                    
                    log(div.id);
                }
                else if(div.id === "depth3") {
                    log(div.id);
                }
            }
        })();
    }
}
```

HTML 이벤트 모드에서 이벤트가 실행되는 것은 두 단계가 있다.
1. 캡쳐(capture)
    2. 이벤트가 뭔가에 의해 발생했다면 그 이벤트를 캡쳐하기 위해 이벤트가 발생한 요소를 포함하는 부모 HTML부터 이벤트의 근원지인 자식 요소까지 이벤트를 검사
    3. 이때, 캡쳐 속성의 이벤트 핸들러가 있다면 실행시키면서 이벤트 요소로 접근
    4. 이벤트의 근원을 아래로 내려가며 찾아가는 단계.
2. 버블(Bubble)
    1. 캡쳐가 끝나면 버블이 발생.
    2. 이벤트 요소에 도달했다면 이제 다시 이벤트 요소->이벤트 요소를 포함하고있는 부모요소까지 올라가며 이벤트를 검사
    3. 이때 버블 속성의 이벤트 핸들러가 있다면 실행시킴.

> 아 아직 잘 모르겠다

> 
## Refer
http://www.kirupa.com/html5/event_capturing_bubbling_javascript.htm
http://blog.javarouka.me/2011/12/html-event-bubbling.html
