# Enhanced Ecommerce with Tag manager
[공식가이드](https://developers.google.com/tag-manager/enhanced-ecommerce)
[미리 읽어야 할 Enhanced Ecommerce](https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce)
[tagmanager ecommerce 동영상강의](https://youtu.be/ZKjlIhFJMCU)

## 무엇이냐?
[mind the log 자료](http://mindthelog.com/2014/05/%EA%B5%AC%EA%B8%80-%EC%A0%84%EC%9E%90%EC%83%81%EA%B1%B0%EB%9E%98-%EB%A1%9C%EA%B7%B8%EB%B6%84%EC%84%9D-%EA%B3%BC%EC%A0%95-%EA%B0%9C%EB%85%90/)


## 향상된 전자상거래 켜기
Google Analytics사이트 > 설정원하는 앱 > Admin > Property Settings > Use enhanced link attribution을 On으로 켠다.

## GA 전자상거래
1. 설정방법
    - Google 애널리틱스에서 새로운 태그 유형을 만듭니다.
    - 태그가 실행되는 경우를 지정합니다.
    - 태그 이름, 태그 유형, 관련 추적 ID와 같은 필수 입력란에 해당 정보를 입력합니다.
    - 추적 유형을 '거래'로 설정합니다.
2. 변수
    - 모든 거래 정보는 데이터 영역을 통해 전달되어야 함.
    - transactionId(필수)   고유 거래 식별자   문자열
    - transactionAffiliation(선택)  파트너 또는 상점   문자열
    - transactionTotal(필수)    거래의 총 가치    숫자
    - transactionShipping(선택) 거래의 배송비 숫자
    - transactionTax(선택)  거래에 대한 과세액  숫자
    - transactionProducts(선택) 거래에서 구매한 상품 목록  TransactionProduct 객체의 배열
3. TransactionProduct 데이터
    - 온라인 거래에 포함되는 제품 설명하는 객체 목록
    - 이름(필수)  제품 이름 문자열
    - SKU(필수) 제품 SKU  문자열
    - 카테고리(선택)  제품 카테고리 문자열
    - 가격(필수)  단가  숫자
    - 수량(필수)  품목 수  숫자

데이터 영역 코드 구현 예
```javascript
<script>
dataLayer = [{
    'transactionId': '1234',
    'transactionAffiliation': 'Acme Clothing',
    'transactionTotal': 38.26,
    'transactionTax': 1.29,
    'transactionShipping': 5,
    'transactionProducts': [{
        'sku': 'DD44',
        'name': 'T-Shirt',
        'category': 'Apparel',
        'price': 11.99,
        'quantity': 1
    },{
        'sku': 'AA1243544',
        'name': 'Socks',
        'category': 'Apparel',
        'price': 9.99,
        'quantity': 2
    }]
}];
</script>
```
비동기때문에 GTM컨테이너 스니펫 **앞**에 이 코드를 넣어야 한다.

## 콘텐츠 그룹
앱 콘텐츠를 논리적 구조로 분류 가능.
남성-셔츠  여성-악세사리 이렇게 대분류 소분류 등으로 분류 가능하다.

### 1
`admin > view > content grouping > New`에 들어가서 입력한다.

- 이름: 유아책
- Index: 색인 번호. 지정하는 콘텐츠 분류 이름과 연결. GTM에서 태그 만들 때 이 숫자 사용.

Universal Analytics Tracking Code (analytics.js):
```javascript
ga('set', 'contentGroup1', 'My Group Name'); 
```
이런식으로 삽입.

### 2
[참고](https://support.google.com/tagmanager/answer/6107004?hl=ko&ref_topic=3002579)
GTM에서 태그 추가 > `Track Type: Page View` > `Configure Tag` > `More setting` > `add content group`에서 위에서 지정한 최상이 콘텐츠 분류의 `색인 번호`를 적어준다.
Content Group에는 하위 분류를 적어둔다(e.g 셔츠)

## tagmanager로 전자상거래 추적 달기
[참고링크](https://support.google.com/tagmanager/answer/6107169)
[mind the log](http://mindthelog.com/2014/06/ecommerce-%EC%A0%84%EC%9E%90%EC%83%81%EA%B1%B0%EB%9E%98-%EC%BD%94%EB%93%9C-%EC%84%A4%EC%A0%95/)
1. 태그매니저 사이트에 들어가서 `Variables>new>Custom Javascript`에 아래 코드를 넣는다.
```javascript
function() {
  var ecommerceData = {
    'ecommerce' : {
      currencyCode : 'EUR',
      // add additional parameters as needed...
    }
  };
  return ecommerceData;
}
```
이 변수에서 이 데이터를 데이터 영역으로 푸시하는 데 사용하는 동일한 구문을 이용해라.

## 실제로 어떻게 동작하나 살펴볼 수 있는 사이트
http://enhancedecommerce.appspot.com/

## Refer
[GOOGLE ANALYTICS MOOC - ECOMMERCE ANALYTICS 후기](http://datum.io/google-analytics-mooc-ecommerce-analytics-%ED%9B%84%EA%B8%B0/)
[GOOGLE ANALYTICS MOOC - ECOMMERCE ANALYTICS 후기]https://analyticsacademy.withgoogle.com/course03/unit?unit=1&lesson=1
