# 브라우저 호환 관련 문제

## `document.head`

IE9 미만 브라우저에서 `document.head` 속성을 지원하지 않는다.

### 해결

```javascript
document.getElementsByTagName('head')[0]
```

### 관련 문서

- [Document.head - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/head)
- [head property - MSDN](https://msdn.microsoft.com/en-us/library/gg593004(v=vs.85).aspx)

## `getComputedStyle`

IE9 미만 브라우저에서 `getComputedStyle` 함수를 지원하지 않는다.

### 해결

```javascript
function getStyle(element) {
    return window.getComputedStyle ? getComputedStyle(element) : element.currentStyle;
}
```

### 관련 문서

- [Window.getComputedStyle() - MDN](https://developer.mozilla.org/ko/docs/Web/API/Window/getComputedStyle)
