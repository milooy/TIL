# Emmet 단축키

단축키 실행: cmd + E

## child: >
```html
div>ul>li

<div>
    <ul>
        <li></li>
    </ul>
</div>
```

## Sibling: +
```html
div+p+bq

<div></div>
<p></p>
<blockquote></blockquote>
```

## 상위로 빠져나오기: ^
```html
div+div>p>span+em^^^bq

<div></div>
<div>
    <p><span></span><em></em></p>
</div>
<blockquote></blockquote>
```

## Multiplication: *
```html
ul>li*5

<ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
</ul>
```

## 그룹핑: ()
```html
div>(header>ul>li*2>a)+footer>p
...expands to

<div>
    <header>
        <ul>
            <li><a href=""></a></li>
            <li><a href=""></a></li>
        </ul>
    </header>
    <footer>
        <p></p>
    </footer>
</div>
```

## ID, Class
```html
div#header+div.page+div#footer.class1.class2.class3

<div id="header"></div>
<div class="page"></div>
<div id="footer" class="class1 class2 class3"></div>
```

## 리스트 넘버링: $
```html
ul>li.item$*5

<ul>
    <li class="item1"></li>
    <li class="item2"></li>
    <li class="item3"></li>
    <li class="item4"></li>
    <li class="item5"></li>
</ul>
```

## 텍스트: {}
```html
a{Click me}

<a href="">Click me</a>
```

## 속성
```html
link[rel=prefetch title="Hello world"]

<link rel="prefetch" href="" title="Hello world">
```

## CSS
```css
w100p → width: 100%
m10p30e5x → margin: 10% 30em 5ex
fw400 → font-weight: 400;

p!+m10e!
padding:  !important;
margin: 10em !important;
```
