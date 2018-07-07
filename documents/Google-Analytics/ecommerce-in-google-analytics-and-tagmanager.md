## 무엇이냐?
[mind the log 자료](http://mindthelog.com/2014/05/%EA%B5%AC%EA%B8%80-%EC%A0%84%EC%9E%90%EC%83%81%EA%B1%B0%EB%9E%98-%EB%A1%9C%EA%B7%B8%EB%B6%84%EC%84%9D-%EA%B3%BC%EC%A0%95-%EA%B0%9C%EB%85%90/)
주문완료 되면 사이트 서버에서 해당 정보 처리 후 GA서버에 2종류 데이터 전달
1. 주문 정보
  - 주문번호(ID)
  - 제휴사(Affiliation)
  - 총액(Revenue)
  - 배송비(shipping)
  - 세금(Tax)
2. 제품 정보
  - 주문정보(ID): 위의 주문번호와 동일
  - 제품명(Name)
  - 제품코드(SKU)
  - 제품가격(Price)
  - 제품수량(Quantity)

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

## 추적코드 달기 
[mind the log](http://mindthelog.com/2014/06/ecommerce-%EC%A0%84%EC%9E%90%EC%83%81%EA%B1%B0%EB%9E%98-%EC%BD%94%EB%93%9C-%EC%84%A4%EC%A0%95/)
### Intro
기본코드 외 4가지가 필요하다.
1. Ecommerce.js플러그인 호출
2. 결제정보(e.g. 주문번호, 구매액 등) 코드
3. 제품정보(e.g. 제품 아이디, 제품명) 코드
4. GA로 위 정보를 전송하는 커맨드

이 4가지가 기본 GA코드에 추가되어 구매완료(영수증) 페이지에 삽입되어야 함.

### 1. Ecommerce.js 플러그인 호출
페이지마다 삽입되는 기본 GA코드에 
```javascript
ga('require', 'ecommerce', 'ecommerce.js');
```
를 추가함. `구매완료` 페이지에만 추가하면 된다.

### 2. 결제정보 코드 추가
`구매완료`페이지에 추가한다.
```javascript
ga('ecommerce:addTransaction', { 
  'id': '1234', // 시스템에서 생성된 주문번호. 필수. 
  'affiliation': 'store.co.kr', // 제휴사이름. 선택사항. 쿠폰이름 같은거 넣어도 된다.
  'revenue': '127000', // 구매총액. 필수. 배송비 및 세금 기타 모든 비용 포함
  'shipping': '5000', // 배송비. 선택사항. 
  'tax': '2000' // 세금. 선택사항.
});
```

### 3. 제품정보 코드 추가
구매완료 페이지에 추가. for문으로 돌린다.
```javascript
ga('ecommerce:addItem', { 
  'id': '1234', //시스템에서 생성된 주문번호. 필수. 
  'name': '남성용 긴팔셔츠 흰색 XL', // 제품명. 필수. 
  'sku': 'XXX56789', // SKU 또는 제품고유번호. 선택사항. 
  'category': '남성의류', // 제품 분류. 
  'price': '30000', // 제품 단가. 
  'quantity': '1' // 제품 수량.
});
```

### 4. GA로 위 정보 전송
구매완료 페이지에 추가
```javascript
ga('ecommerce:send');
```


## tagmanager로 전자상거래 추적 달기
[참고링크](https://support.google.com/tagmanager/answer/6107169)

## 실제로 어떻게 동작하나 살펴볼 수 있는 사이트
http://enhancedecommerce.appspot.com/

## 환불
마찬가지로 '환불영수증' 을 발행시키면 되는데요, 주문번호를 그대로 두되 같은 액수를 마이너스로 해서 마이너스 주문을 입력하는 방식입니다.

두 가지 방법을 알려드리자면,

1) 아래와 같이 구매총액 및 상품갯수를 마이너스로, 제품단가는 양수로 입력한 환불영수증 페이지를 만들어서 로드합니다.
```javascript
ga('ecommerce:addTransaction', { 
'id': '1234', // 시스템에서 생성된 주문번호. 필수. 
'affiliation': 'store.co.kr', // 제휴사이름. 선택사항. 
'revenue': '-127000', // 구매총액의 마이너스 입력!!! 필수. 
'shipping': '-5000', // 배송비 마이너스 입력!!! 선택사항. 
'tax': '-2000' // 세금 마이너스 입력!!! 선택사항.
});

// 제품별 데이터
ga('ecommerce:addItem', { 
'id': '1234', //시스템에서 생성된 주문번호. 필수. 
'name': '남성용 긴팔셔츠 흰색 XL', // 제품명. 필수. 
'sku': 'XXX56789', // SKU 또는 제품고유번호. 선택사항. 
'category': '남성의류', // 제품 분류. 
'price': '30000', // 제품 단가. 양수로 입력!!! 
'quantity': '-1' // 제품 수량. 마이너스 입력!!!
});
```
참조: https://support.google.com/analytics/answer/1037443?hl=ko

만약 향상된전자상거래 (Enhanced Ecommerce) 를 사용중이시면, Data Import 를 통해 보다 손쉽게 일괄적으로 처리 가능합니다.

참조: https://support.google.com/analytics/answer/6014861?hl=ko

답변이 되었기를 바랍니다~
[refer](http://mindthelog.com/2014/06/ecommerce-%EC%A0%84%EC%9E%90%EC%83%81%EA%B1%B0%EB%9E%98-%EC%BD%94%EB%93%9C-%EC%84%A4%EC%A0%95/)

## 공식가이드
[공식가이드 링크](https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce)

## Ecommerce with Tag manager
[공식가이드](https://developers.google.com/tag-manager/enhanced-ecommerce)
[미리 읽어야 할 Enhanced Ecommerce](https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce)
[tagmanager ecommerce 동영상강의](https://youtu.be/ZKjlIhFJMCU)

## Tips
- GTM enhanced ecommerce할 때 그 이벤트에 명시된 이벤트에서 불리워지나 확인해보아야 한다. (e.g. `impression`이 잘 동작하는지 확인하려면, 무작정 GTM Preview의 summary에서 dataLayer가 잘 들어갔는지 보기 전에 `gtm.dom`이 불리워지는 `DOM Ready`에 그 데이터레이어가 잘 들어갔는지 확인한다. )
- datalayer를 위로 두는 것 때문에 돔을 못잡는다면 `$(function() {...}`처럼 dom ready가 된 이후에 넣어주면 된다. 이는 `gtm.dom`이벤트랑도 잘 맞는다. 

## Refer
[GOOGLE ANALYTICS MOOC - ECOMMERCE ANALYTICS](http://datum.io/google-analytics-mooc-ecommerce-analytics-%ED%9B%84%EA%B8%B0/)
[GOOGLE ANALYTICS MOOC - ECOMMERCE ANALYTICS 후기](https://analyticsacademy.withgoogle.com/course03/unit?unit=1&lesson=1)

