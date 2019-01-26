# Responsive iframe embed

## 개요
iframe을 CSS로 다루는 것은 까다롭고 기분이 좋지 못하다. 마음대로 안되므로. ^^...
youtube들을 모아놓은 반응형 홈페이지를 만들고 있는데, 그 youtube를 반응형으로 삽입하려면 약간의 CSS 꼼수가 필요하다

## HOW TO
```html
<div class="video-container">
         <iframe src="http://www.youtube.com/embed/dFVxGRekRSg" frameborder="0" width="560" height="315"></iframe>
</div>
```

```CSS
.video-container {
    position: relative;
    padding-bottom: 56.25%;
    padding-top: 30px; height: 0; overflow: hidden;
}
 
.video-container iframe,
.video-container object,
.video-container embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
```
iframe을 video-container로 감싸주고, 그 안의 iframe을 relative/absolute로 조정해준다.
이 클래스는 그대로 두고, 다른 특성들을 쓰고 싶다면 독립된 곳에서 쓰도록 하자. 괜히 꼬이지 않게.

내 경우는 특이하게 .video-container의 padding-top을 0px로 해야 비디오가 화면에 검정 여백 없이 꽉 차게 나왔다. 

## +추가
이것도 잘 된당
```css
.container {
float: none;
    clear: both;
    width: 100%;
    position: relative;
    padding-bottom: 56.25%;
    padding-top: 25px;
    height: 0;
}

iframe {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 60%;
    height: 60%;
    margin-left: auto;
    margin-right: auto;
}
```
