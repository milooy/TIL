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

## Refer
http://stackoverflow.com/questions/29001977/safari-in-ios8-is-scrolling-screen-when-fixed-elements-get-focus
