# Div 사이에 원치 않는 틈 제거하기

## Problem
`btn-container`라는 div에 `btn-group` 3개 div를 넣었더니 그 3개 div 사이에 틈이 생겼다.

## Solution
1. whitespace를 주석처리
```html
<div>text</div><!--
--><div>text</div><!--
--><div>text</div><!--
--><div>text</div><!--
--><div>text</div>`
```

2. 걍 다 붙여버리기.
django에 `{% spaceless %}`태그 써도 됨.
```html
<div>text</div><div>text</div><div>text</div><div>text</div><div>text</div>
```

3. 잔망스런 엔터
```html
<!-- 1 -->
<div>text</div
><div>text</div
><div>text</div
><div>text</div
><div>text</div>

<!-- 2 -->
<div>text
</div><div>text
</div><div>text
</div><div>text
</div><div>text
</div>
```

4. 부모 폰트사이즈 0, 자식에서 다시 키우기
```css
#parent {
    font-size: 0;
}

#child {
    font-size: 16px;
}
```

5. parent를 `display: flex` 설정하기
```
.parent {
    display: flex;
}
.parent > div {
    display: inline-block;
    padding: 1em;
    border: 2px solid #f00;
}
```

## Refer
http://stackoverflow.com/questions/19038799/why-is-there-an-unexplainable-gap-between-these-inline-block-div-elements/19038875#19038875
(아웃사이더님이 알려주심 감사합니다)
