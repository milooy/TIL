# SVG
## 직사각형 그리기
```html
# html
<img src='jay.svg'>

# jay.svg
<svg height="100" width="100" # 뷰포트 설정
    xmlns="httml://www.w3.org/2000/svg" # svg버전 몇 쓸것인지
    version="1.1"> 
    <rect height="80" width="100" /> # 직사각형 그리기
    <rect height="50" width="80" fill="white" x="10" y="10"/> # 왼쪽 위(원점)에서 오른쪽으로 10 아래로 10 떨어진 직사각형 그리기
</svg>
```
![](../img/svg/1.png "branch image")

## 원 그리기
```html
<rect height="..." stroke="red" stroke-width="10"
    x="5" y="5" #viewport 밖으로 벗어나게 해야 잘 보임
    rx="10" ry="25"/> # 가로반지름 10 세로반지름 25로 radius줌
<circle cx="40" cy="105" r="3" /> # 중심이 40,105고 반지름이 3
<ellipse cx="40" cy="105" rx="10" ry="15" /> # 중심이 40,105고 반지름이 3
```

## SVG 인라인으로 삽입하기
이로케 하면 css로 스타일, 애니메이션 먹일 수 있다
```html
<h1>어쩌구</h1>
<svg height="...">
    <rect "..." />
</svg>
```

```css
circle {
    animation: grow 2s infinite;
    transform-origin: center;
}
@keyframes grow {
    0% {transform: scale(1);}
    50% {transform: scale(0.5);}
    100% {transform: scale(1);}
}
```

## 
```html
<circle r="130" cx="134" cy="134" >
<line x1="47" y1="198" x2="221" y2="198" /> # (47,198), (221, 198)짜리 선 긋기
<polygon points="52,190 134,30 216,190" /> # 세 개 점 찍음
<text x="134" y="142">SVG</text>
```
```css
circle {
    fill: none;
    stroke: blue;
    stroke-width: 7px; # svg에는 px 안쓰는데 css엔 써야함
}
line {
    stroke: black;
    stroke-width: 5px;
}
text {
    font-size: 60px; 
    text-anchor: middle; # 이걸 안해주면 텍스트의 기본 anchor point는 좌측 하단이다! (해주면 가운데 하단)
    font-family: "FilmotypeMajor";
    stroke: red;
    stroke-width: 3px;
    fill: white;
}

polygon {
    fill: red;
}
```

## 그룹으로 묶어주기
translate means "To Move"
```html
<g class="triangle_group" transform="translate(45, 67)"> #x축으로 45, y축으로 67 이동
    <polygon points="...">
    <polygon points="...">
    <polygon points="...">
</g>

<g class="triangle_group" transform="translate(198, 67)"> # 복붙
    <polygon points="...">
    <polygon points="...">
    <polygon points="...">
</g>
```

```css
.triangle_group {
    stroke-width: 3px;
}
```

## 돌려돌려 짜부짜부
```html
<g class="triangle_group" transform="translate(198, 67)
    rotate(10 12.5 12.5) # 각도, 중심x, 중심y
    scale(0.6) translate(8,8)"> # 0.6배로 줄이기. 근데 좌측 상단 기준으로 줄어듦. 그래서 8,8 더 옮겨야 함
    <polygon points="...">
</g>
```

## Responsive
```html
<svg xmlns="httml://www.w3.org/2000/svg" # svg버전 몇 쓸것인지
    version="1.1"
    viewBox="0 0 268 268"> # height랑 width를 여기로 옮김. viewBox origin이 (0,0)이고 width랑 height 는 268x268
```
```css
svg {
    height: auto;
    width: 50%;
}
```

## Symbol
```html
<svg "...">
    <symbol id="phone"> # 심볼 만들기
        <rect /> 
        <circle /> 
    </symbol>
</svg>

<svg>
    <use xlink:href="phone" /> # 요렇게 쓴다
</svg>

<svg>
    <use xlink:href="path-to-file.svg#phone" /> # external sources로 가져오기. IE10은 지원 안함
</svg>
```

## 접근성
```html
<svg>
    <title>시각장애인이 들을 수 있는 타이틀</title>
    <desc>커다란 핸드폰 아이콘</desc>
</svg>
```

## Illustrator export
```
File > 스크립트 > 문서를 svg로 저장
```
하면 열려 있는 모든 문서가 svg로 export된다



## Refer
code school 강의 https://www.codeschool.com/courses/you-me-svg
