## Data Layer in tagmanager
서버 데이터를 GA에서 쓰고 해석하기 쉽게 객체 형식으로 들고 있는 것.
크롬 자바스크립트 콘솔에서 `dataLayer`라고 쳐보면 객체들이 나온다.
1. gtm.js: 구글 태그매니저가 로드되었을 때 불림
2. gtm.dom: 페이지 돔이 모두 로드되었을 때 불림
3. gtm.load: 모든 태그들까지 다 실행되었을 때 불림

## 사용법
### 데이터레이어 넣어주기
젤 위에 dataLayer를 정의해준다.
```javascript
<script>
  dataLayer = [];
</script>
```

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


## 의문
impression이랑 detail모두 태그매니저에서 `pageview`가 일어날 때 불린다. 둘 다 이벤트가 gtm.dom일때 불리운다.
impression은 커스텀 자바스크립트로 돔을 긁어와서 dataLayer에 푸쉬해준다. 그래서 `$(window).load`등으로 감싸서 전달해주면 데이터레이어에 잘 전달되므로 태그매니저 프리뷰에는 보인다.
detail은 django template tag로 모델에서 바로 긁어온 데이터를 넣는거라 돔 위에 있어도 데이터를 가져올 수 있다.

비동기 문제인 듯 한데
1. GTM을 돔 로드 후에 넣으면
    - impression은 측정O.
    - detail view는 측정X. (태그매니저 프리뷰엔 보임)
    - 카트 넣고 빼기 측정O.
2. GTM을 돔 로드 전에 넣으면 (공식 사이트 권고)
    - impression이 측정X. (태그매니저 프리뷰엔 보임)
    - detail view는 측정O.
    - 카트 넣고 빼기 측정X. (태그매니저 프리뷰에도 안보임)

태그매니저 프리뷰엔 보이면서 GA까진 전달이 되지 않는 걸 보면, pageview일때 안불려서 그렇거나 이벤트가 gtm.dom이 아니라서 전달이 되지 않는것일까. 혹은 데이터레이어랑 태그가 매치가 되어 있지 않을 수 있다.

detail view를 보면
1. message: [DL values after this msg] detail 들어옴
2. pageview: [DL values after this msg] ecommerce에 감싸진 detail 들어오고 밑에 gtm, event:'gtm.js'도 함께 들어간다.
3. DOM ready: [DL values after this msg] ecommerce에 감싸진 detail 들어오고 밑에 gtm, event:'gtm.dom'이 함께 들어간다. 이 때가 진짜인듯?
4. Message: [DL values after this msg] ecommerce에 detail밑에 impressions가 추가되어 들어오고 밑에 gtm, event:'gtm.dom'이 함께 들어간다. 이 때 두 개 다 잘 들어간 거 아닌가?! 아! 3번 돔 레디에서 이미 두개 다 들어가버렸구나!

문제 알았다. DOM Ready에서 태그는 두 개 다 불리는데 그 당시 detail만 들어가 있다.

### 해결
디버깅은 차분히 GTM Preview로 한뎁스씩 클릭해보며 하자.

## Refer
[Google Tag Manager course: The DataLayer [Preview]](https://youtu.be/NRb7wFAtExM)
[Google Tag Manager eCommerce Tracking installation explained](https://youtu.be/ZKjlIhFJMCU)
[The Data Layer](http://www.simoahava.com/analytics/data-layer/)
[Google Tag Manager’s Data Model](http://www.simoahava.com/analytics/google-tag-manager-data-model/)
[Google Tag Manager for Web Tracking](https://developers.google.com/tag-manager/devguide)
