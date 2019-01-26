# Casper.js

### Quick Start


start, then, evaluate, fill,

```js
// 기본 구조.
var casper = require('casper').create();

casper.start(...);

casper.then(...);

casper.then(...);

casper.run(...);

casper.exit();
```

test 코드를 짤 때는 casper instance를 만들 필요 없다. global variable로 이미 선언되어있음.



### Using the command line

- cli argumnet를 대응하는 `casper.cli` 모듈이 있다.
- `cli.args`, `cli.options` 가 있다.
- `cli.has()`, `cli.get()`, 'cli.drop()`으로 제어.

- utils_dump()로 json을 stdout.
- 1.1부터 엔진을 slimerjs로 교체할 수 있음.


### Selectors

CSS3 select 지원 끝.

### Writing CasperJS modules

- 1.1 부터 npm 모듈 지원.

## API

### Casper class
`require('casper').create(options)` 로 생성.

### casper.options
열라 많은 옵션들이 있음.

### 쓸만한 casper.prototype.

- back(), forward()
- click()x
- cpatuerSelector()
- debugHTML()
- download()
- each
- echo()
- evaluate()
- run(), exit()
- exists()
- fillSelectors()
- fetchText()
- getElementAttribute(), getElementBounds(), getElementInfo()
- getFormValues(), getHTML(), getTitle()
- mouseEvent()
- open()
- resourceExists()
- scrollTo(), scrollToBottom()
- sendKeys()
- then(), thenClick(), thenEvaluate(), thenOpen(), thenOpenAndEvaluate()
- wait(), waitFor(), waitForResource(), waitForUrl(), waitForSelector()