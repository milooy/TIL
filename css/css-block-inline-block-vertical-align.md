# CSS 요소 수직정렬

## 1. Inline / Inline-block 요소
[보고 공부한 링크](http://aboooks.tistory.com/171)
`vertical-align`속성을 사용한다.
- 요소 자체만을 정렬하고, 내용에는 영향을 미치지 않음
- table cell에 적용할 때는 내용에 영향.
- 정렬하는 요소를 다른 인라인 요소에 상대적으로 정렬.
    + 그래서 같은 줄에서 인라인 요소 크기 따라 높낮이 달라질 수 있고,
    + 그 줄에 있는 line-height설정에 따라서도 달라질 수 있음.
- 속성값
    + baseline: 기본값. 부모 요소의 기준선(글자에서 꼬리 뺀거)에 맞춤.
    + sub: 부모의 아래첨자 기준선에 맞춤.
    + super: 부모의 위첨자 기준선에 맞춤.
    + text-top: 요소의 맨 위를 부모 font의 맨 위에 맞춤.
    + text-bottom: 요소의 맨 아래를 부모 font의 맨 아래에 맞춤.
    + middle: 부모 요소 중앙에 위치
    + top: 요소 맨 위를 줄에서 가장 큰 요소의 맨 위에 맞춤.
    + bottom: 요소 맨 아래를 줄에서 가장 낮은 요소에 맞춤. 
    + 값(px, cm): 0px는 베이스라인과 같음. 높아질수록 올라감.
    + 값(%): line-height의 백분율. 0%는 baseline.

## 이미지 수직 가운데 정렬
1. 이미지를 담을 div만들어 div에 `line-height`속성 사용
2. 이미지에 `vertical-align:middle`
3. line-height는 이미지 height보다 높아야 함.

```html
<div id="content"><img src="molamola.png"></div>
```
```css
#content {
    line-height: 200px;
}
#img {
    vertical-align: middle;
}
```

## 한줄 텍스트 수직 가운데 정렬
1. 텍스트 div만들어 div에 div랑 같은 크기의 line-height속성
2. 필요하면 div에 height값도 적용.

## 레이어 중앙정렬 팁
[CSS]
지금까지 레이어 중앙 정렬 할때 보통
```css
.layer {
position : absolute || fixed;
left : 50%;
top : 50%;
width : 500px;
height : 500px;
margin: -250px 0 0 -250px;
}
```
같은 형태로 넣었는데, 오늘 크리스 코이어 블로그 보다가

```css
.layer {
position : absolute;
left : 50%;
top : 50%;
transform : translate(-50% -50%);
}
```
겁나 천재같아..
내가 정말 CSS를 잘 알고있냐고 물어보면 사실 잘 모르는게 분명한 거 같음.

(코드예제)
http://codepen.io/ChoEun/pen/Dcjqp

http://demosthenes.info/blog/723/Seven-Ways-of-Centering-With-CSS

## Refer
[vertical-align속성 자세히 알기](http://aboooks.tistory.com/171)
[수직으로 가운데 정렬 5가지](http://aboooks.tistory.com/180)
[Vertical align middle on an inline-block anchor tag](http://stackoverflow.com/questions/10437643/vertical-align-middle-on-an-inline-block-anchor-tag)
