# Casperjs 캡쳐시 한글이 깨지는 문제

- casperjs로 네이버 카페를 캡쳐하면 일부 페이지 한글이 깨짐.
- 한글 폰트 때문은 아님. (폰트있음, 아래거 다 필요없음.)
  + [phantomjs screenshot font missing, boxes rendered instead](http://stackoverflow.com/questions/15029002/phantomjs-screenshot-font-missing-boxes-rendered-instead)
  + [phantomjs, casperjs 한글 문제 해결하기](http://extjs.makewebapp.net/archives/174)
  + [일본 글꼴 설치](http://blog.sheeps.me/index.php/archives/64)
- casperjs가 아니라 phantomjs로 해도 깨짐.
- 네이버 카페는 html 기본 charset이 KSC5601임.
- 한글이 깨지지 않는 페이지는 다음처럼 content-type를 두번 정의. euc-kr이 추가되어있음. (뭐야이게..)

```html
<meta http-equiv="Content-Type" content="text/html;charset=KSC5601">
...
<meta http-equiv="Content-Type" content="text/html;charset=euc-kr">
```

- Webkit에 KSC5601은 나중에 추가되었음. [Korean encoding alias KSC5601 does not work](https://bugs.webkit.org/show_bug.cgi?id=59075)

- **결국 dependency가 phantomjs 2.0가 아닌 casper는 안됨.**

```
- casper 1.1.0-beta3 (깨짐)
  + phantomjs 1.9.8 (깨짐)
    * AppleWebKit/534.34 (깨짐)
+ phangomjs 2.0 (정상)
  + AppleWebKit/538.1 (정상)
```

- 근데 동작안함. [PhantomJS 2.0 does not work in Mac OS Yosemite](https://github.com/ariya/phantomjs/issues/12928)
- 사이트가 아니라 github에서 받아야함. [PhantomJS 2.0 binaries](https://github.com/eugene1g/phantomjs/releases)
- phantomjs 2.0은 KSC5601를 정상 랜더링함.

- [phantomjs의 webkit 버전확인](http://phantomjs.org/faq.html)은 `phantomjs examples/useragent.js.` 로

