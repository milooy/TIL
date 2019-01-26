# iOS의 fixed element 스크롤 버그 

iOS에서 fixed element를 누르면 스크롤이 최상단이나 최하단으로 후루룩 가는 이상한 버그가 있다.

아래 CSS로 간단하게 해결할 수 있다.
(그 전에 나는 focus될때 스크롤 위치 구해서 그 쪽으로 다시 스크롤 옮기는 삽질을 하고 있었다)
```css
html,body{
    -webkit-overflow-scrolling : touch !important;
    overflow: auto !important;
    height: 100% !important;
}
```

하지만 치명적인 단점은 스크롤 이벤트를 더 이상 사용하지 못한다는 거...
```js
$('html, body').animate({
            scrollTop: $($('.review-list .review')[0]).offset().top - 64
        }, 500);
```
요런 것들이 모두 안 됨.
iOS 웹앱에서 상단 시계 클릭시 최상단으로 가는 기능도 다 막힘.

그래서 결국 뺌.

걍 밑에 select fixed는 input말고 div로 우회하는 걸로...
Naver 웹 브라우저같은 경우는 
상단 fixed 검색 창 누르면 전체 페이지에 overlay를 덮으면서 후루룩이 덜 보여지도록 한다(그래도 후루룩 하긴 함)

## Refer
http://stackoverflow.com/questions/29001977/safari-in-ios8-is-scrolling-screen-when-fixed-elements-get-focus
