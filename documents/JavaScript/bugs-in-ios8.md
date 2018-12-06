# iOS8의 nth-child 버그

## 문제

```html
<ul id="comic-list">
    <li class="comic">..</li>
    <li class="comic">..</li>
    <li class="comic">..</li>
</ul>
```

```javascript
$('#comic-list .comic:nth-child(-n+3)').length
```

정상적인 경우 3이 출력되지만 iOS 8이 설치된 아이폰 5 모바일 사파리에서 1이 출력된다. 아이폰 6에서는 정상적으로 동작한다.

## 해결

`nth-child` 선택자 대신 `nth-of-type` 선택자를 사용한다.

## 관련 문서

- [iOS8 Safari after a pushState the :nth-child() selectors not works - Stack Overflow](http://stackoverflow.com/questions/26032513/ios8-safari-after-a-pushstate-the-nth-child-selectors-not-works)
