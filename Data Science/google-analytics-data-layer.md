## Data Layer in tagmanager
서버 데이터를 GA에서 쓰고 해석하기 쉽게 객체 형식으로 들고 있는 것.
크롬 자바스크립트 콘솔에서 `dataLayer`라고 쳐보면 객체들이 나온다.
1. gtm.js: 구글 태그매니저가 로드되었을 때 불림
2. gtm.dom: 페이지 돔이 모두 로드되었을 때 불림
3. gtm.load: 모든 태그들까지 다 실행되었을 때 불림

## 사용법
### 데이터레이어 넣어주기
GTM호출되기 전에 넣어주어야 한다. 안그러면 못 불림.
```javascript
<body>
  <script>
    dataLayer = [{
      'pageCategory': 'signup',
      'visitorType': 'high-value'
    }];
  </script>
  <!-- Google Tag Manager -->
  ...
  <!-- End Google Tag Manager -->
```

JS이벤트랑 같이 쓰려면
```html
<a href="#" name="button1" onclick="dataLayer.push({'event': 'button1-click'});" >Button 1</a>
```

2. 태그매니저 접속해서 태그를 만든다.
    - Track Type: Transaction으로 잡고
    - new trigger를 만든다.
        + Transaction이란 이름으로
        + Custom Event로
        + Fire On에서 Event name을 데이터레이어에 박혀있는 이벤트 이름을 가져온다. (e.g. gtm4wp.orderCompleted)



## Refer
[Google Tag Manager course: The DataLayer [Preview]](https://youtu.be/NRb7wFAtExM)
[Google Tag Manager eCommerce Tracking installation explained](https://youtu.be/ZKjlIhFJMCU)
[The Data Layer](http://www.simoahava.com/analytics/data-layer/)
[Google Tag Manager’s Data Model](http://www.simoahava.com/analytics/google-tag-manager-data-model/)
[Google Tag Manager for Web Tracking](https://developers.google.com/tag-manager/devguide)
