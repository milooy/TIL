# CSS

## 안쓰는 CSS 제거
http://www.labnol.org/internet/remove-unused-css/28635/
https://unused-css.com/
https://github.com/addyosmani/grunt-uncss

## 미디어쿼리에 em 단위를 쓰는 이유
브라우저 zoom 사용 시에도 적절히 반응하게 하기 위해
https://css-tricks.com/zooming-squishes/

작업하다 보면 zoom 사용자에 대한 이슈도 꽤 있는편이라 이런 방법이 있다 정도로 알아두시면 좋을 것 같습니다.

저도 예전에 미디어쿼리에 em을 사용한 소스를 보고 왜 em을 썼을까 생각한 적이 있었는데 이 이슈 때문이었던 것 같네요.

대개 90% 축소 ~ 125% 확대의 범위에서 zoom을 쓰시는 분들이 많지만, 스크린에 아주 가까이 눈을 대고 사용하시는 저시력 장애인들을 생각하면 zoom에 대한 처리도 될 수 있다면 좋겠지요.

## preprecessor
[sass](http://www.sass-lang.com/guide)
[less](http://lesscss.org/)

## Grid
- [bootstrap](http://getbootstrap.com/2.3.2/scaffolding.html)
- [pure](http://purecss.io/start/)
    + [pure에 gutter넣기](https://github.com/yahoo/pure/issues/380)
- [jeet](http://jeet.gs/)
- [skeleton](http://getskeleton.com/)
- [foundation](http://foundation.zurb.com/)
- [best front end frameworks for bootstrap alternative](http://beebom.com/2015/01/best-front-end-frameworks-for-bootstrap-alternative)
- [flexbox](http://ko.learnlayout.com/flexbox.html)
    + [CSS Flexbox 레이아웃 짜는데 고생 그만하고 Flexie](http://blog.weirdx.io/css-flexbox-%EB%A0%88%EC%9D%B4%EC%95%84%EC%9B%83-%EC%A7%9C%EB%8A%94%EB%8D%B0-%EA%B3%A0%EC%83%9D-%EA%B7%B8%EB%A7%8C%ED%95%98%EA%B3%A0-flexie/)
    + [complete guide to flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [2kb짜리 작은 그리드 minigrid](http://alves.im/minigrid/)
## Carousel
- [semantic ui](http://semantic-ui.com/)
- [uikit](http://getuikit.com/docs/grid.html)
- [직접 그리드 만들기 (beautifulCSS)](http://beautifulcss.com/archives/1368)

## Carousel
- [owlcarousel](http://www.owlcarousel.owlgraphic.com/)
    + 라인스토어도 이거 사용한단다. slickjs와 owl이 양대산맥이란다.
    + [owl용 플러그인. 풀스크린 포커스 캐러셀](http://www.jqueryrain.com/?00y0dpgM)
- [종류 참 많은 wow slider](http://wowslider.com/demo.html)
- [slick js](http://kenwheeler.github.io/slick/)
- [하단 네비 슬라이드 캐러셀 포토라마. 많은 기능. 커스텀하려면 CSS랑 api만지는게 약간 까다로](http://fotorama.io/)
- [sly](http://darsa.in/sly/)

## Responsive iframe(youtube, vimeo) embed
http://stackoverflow.com/questions/17838607/making-an-iframe-responsive
http://www.letmecompile.com/responsive-%EC%9C%A0%ED%8A%9C%EB%B8%8C-%EB%B9%84%EB%A9%94%EC%98%A4-%EC%9E%84%EB%B2%A0%EB%94%A9-%ED%95%98%EA%B8%B0-2/

## centering absolute elements
```css
 #myContent{
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
}
```
http://stackoverflow.com/questions/1776915/how-to-center-absolute-element-in-div

## Less Media Queries Sortcodes
http://codepen.io/ericrasch/pen/HzoEx

## Youtube thumbnail crop
http://stackoverflow.com/questions/13220715/removing-black-borders-43-on-youtube-thumbnails

