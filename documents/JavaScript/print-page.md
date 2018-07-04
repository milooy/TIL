# Javascript 로 원하는 HTML 영역 프린트하기

상황: 페이지의 일부만 프린트하고 싶다!

구글링 하면 2가지 방법이 나온다.
근데 둘다 내 상황에는 문제점이 있었다.

1. 팝업으로 DOM을 복사해 프린트: 편하긴 한데 css, js가 떨어짐
2. 전체 돔, 프린트 영역 원하는 돔 따로 저장한다음에 프린트영역만 살리고 프린트 후 전체 돔 살림: 편하긴 한데 js 이벤트 바인딩이 떨어짐

아래와 같이 display none<->block 을 toggle 해주는걸로 간단히 해결 가능하다.
React 사용중이라 jquery 말고 pure javascript로 코딩했다.

```js
onPrint() {
    const html = document.querySelector('html');
    const printContents = document.querySelector('.modal-body').innerHTML;
    const printDiv = document.createElement("DIV");
    printDiv.className = "print-div";

    html.appendChild(printDiv);
    printDiv.innerHTML = printContents;
    document.body.style.display = 'none';
    window.print();
    document.body.style.display = 'block';
    printDiv.style.display = 'none';
}
```
