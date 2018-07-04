# body overflow:hidden 이 모바일에서 안 먹을때 javascript로 해결방법

상황: 모바일에서 사이드 네비게이션이 열린 상태에서 스크롤시 body는 스크롤 되지 않게 하고싶다

## Solution A: CSS
```css
html,
body {
    overflow: hidden;
    position: relative;
    height: 100%;
}
```

PC에선 문제 없이 작동한다. 하지만 iOS 사파리랑 크롬에서는 무용지물.

## Solution B: CSS - fix
```css
body {
    position: fixed;
    width: 100%;
    height: 100%;
}
```

PC, 모바일 모두 되긴 하는데 Side nav를 닫은 후에는 position이 꼬임 -> DOM 클릭해도 이벤트가 활성화 안된다.

## Solution C: jQuery
```html
<body>
<div id="side-nav">사이드 네비게이션</div>
<div class="contents">여기에 body의 내용 넣는다</div>
</body>
```

```javascript
$(function(){
    $('#side-nav').on('show.bs.offcanvas', function (e) {
      $('#sidenav-overlay').addClass('active');

      /* Disable scroll */
      $('.contents').on('scroll touchmove mousewheel', function(e){
        e.preventDefault();
        e.stopPropagation();
        return false;
      });
    });
    $('#sidenav-overlay').click(function() {
      $('#side-nav').offcanvas('hide');
      $('#sidenav-overlay').removeClass('active');

      /* Enable scroll */
      $('.contents').off('scroll touchmove mousewheel');
    });
  });
```

jQuery on handler로 스크롤을 막는다.
HTML에서 사이드 네비게이션과 Contents 영역을 분간해두면 
사이드 네비게이션 자체에서는 스크롤 가능하게 할 수 있다.

## Refer
http://stackoverflow.com/questions/3656592/how-to-programmatically-disable-page-scrolling-with-jquery
