## :nth-child(A) vs :nth-of-type(A)
```html
<div class="table">
    <plate></plate>
    <bento></bento>
    <apple class="small"/>
    <plate>
        <orange/>
        <orange/>
        <orange/>
    </plate>
    <bento></bento>
</div>
```

```css
bento:nth-last-child(4){} //첫번째 도시락 선택됨(선택한 부모의 자식을 셈)
bento:nth-of-type(2){} //마지막 도시락 선택됨(선택한 태그를 셈)
```

## Reference
http://flukeout.github.io/
