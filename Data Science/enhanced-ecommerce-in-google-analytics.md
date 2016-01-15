## Google Analytics Enhanced Ecommerce (향상된 전자상거래)
[공식 문서](https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce)

## 기존에 ecommerce plugin을 쓰고있다면?
> 주의! enhanced ecommerce plugin이랑 기존 ecommerce랑 같은 프로퍼티 적용하면 안된다!

### A. 새로운 프로퍼티로
[working with multiple tracking objects](https://developers.google.com/analytics/devguides/collection/analyticsjs/creating-trackers#working_with_multiple_trackers)를 참고해 한 페이지에서 둘 다 사용한다.

### B. 기존 프로퍼티 마이그레이션
기존 걸 지우고 enhanced 넣어야 한다. 기존에 올려둔 데이터들은 남아있을 것이다.

## Enhanced Ecoommerce 데이터타입과 액션
### 1. 노출 데이터
**Impression Data**. 제품이 보여졌을때 정보. `impressionFieldObject`에서 사용.
id나 name둘 중 하나는 필수로 적어야 한다.
- id(둘중하나 필수): String 프로덕트ID나 SKU. (P67890)
- name(둘중하나 필수): String 프로덕트이름. (안드로이드 티셔츠)
- list: String 제품이 속해있는 리스트/콜렉션 (Search Results)
- brand: String 이 제품과 관련있는 브랜드 (Google)
- category: String 이 제품이 속해있는 카테고리. `/`로 계층구조 나타낼 수 있다 (의류) (의류/남성/티셔츠)
- variant: String 제품 옵션같은거. (Black)
- position: Number 리스트나 컬렉션에서 제품 위치. (2)
- price: Currency 가격 (29.20)

### 2. 상품 데이터
**Production Data**. 각각 제품들 보여지고 쇼핑카트에 담겨지거나 등등 데이터. `productionFieldObject`에서 사용. 
(위와 정보 같음)
- id
- name
- brand
- variant
- price
- quantity: Number 제품 갯수. (2)
- coupon: String 상품과 관련있는 쿠폰코드 (SUMMER_SALE13)
- position

### 3. 액션 데이터
**Action Data**. 이커머스 관련 액션이 이뤄진 곳의 정보. `actionFieldObject`에서 사용.
- id(필수): 거래 ID(e.g. T1234) (액션 타입이 `purchase`거나 `refund`일때 필요)
- affiliation: 이 거래가 이루어진 스토어나 소속. (Google Store)
- revenue: 거래총액. 배송비나 세금 등등이 모두 포함된. 만약 적지 않으면 제품 수 등 계산해서 자동으로 넣는다.
- tax: 총 세금
- shipping: 배송비
- coupon: 거래에서 사용한 쿠폰
- list: 제품이 속한 리스트
- step: 결제 프로세스의 스텝. (`checkout`액션타입일때 사용)
- option: `checkout`이나 `checkout_option`액션타입일때 사용. 체크아웃 페이지의 정보 기록. (e.g. selected payment method)

### 4. Product와 Promotion의 액션
`product data`랑 `promotion data`를 해석하는 방법
- click: 제품 클릭
- detail: 제품의 디테일뷰
- add: 쇼핑카트에 담을 때
- remove: 쇼핑카트에서 뺄 때
- checkout: 결제 시스템 처음 갔을 때
- checkout_option: 결제 시스템 스텝마다 옵션값 넘기기
- purchase:제품(들) 판매
- refund: 제품(들) 환불
- promo_click: 내부 프로모션 클릭

## 설치하기 
### Ecommerce Plugin 로드
enhanced ecommerce plugin 로드하기. 걍 ecommerce.js랑 약간 다르다. 
ga트래커 뒤에 붙여주어야 한다.
```javascript
ga('require', 'ec');
```

### Ecommerce Activities 측정
디폴트 트래커에서 몇가지가 추가되었다.
그리고 Ecommerce Data는 기존에 존재하는 hit와 함께 전송된다. (`pageview`나 `event`같은!) 독립적으로는 불가하다.

- Impression 측정
id나 name 둘 중 하나는 필수
```javascript
ga('ec:addImpression', { // addImpression이라는 키워드
  'id': 'P12345',                   // Product ID (string).
  'name': 'Android Warhol T-Shirt', // Product 이름 (string).
  'category': 'Apparel/T-Shirts',   // Product 카테고리 (string).
  'brand': 'Google',                // Product 브랜드 (string).
  'variant': 'Black',               // Product 옵션 (string).
  'list': 'Search Results',         // Product 리스트 (string).
  'position': 1,                    // Product 위치 (number).
  'dimension1': 'Member'            // Custom dimension (string).
});
```

- 액션 측정
id나 name 둘 중 하나는 필수
```javascript
ga('ec:addProduct', {              
  'id': 'P12345',                   // Product ID (string).
  'name': 'Android Warhol T-Shirt', // Product 이름 (string).
  'category': 'Apparel',            // Product 카테고리 (string).
  'brand': 'Google',                // Product 브랜드 (string).
  'variant': 'Black',               // Product 옵션 (string).
  'position': 1,                    // Product 위치 (number).
  'dimension1': 'Member'            // Custom dimension (string).
});

// 이 액션이 어떤 종류인지 정해준다. 위에 정리한 action참고.
ga('ec:setAction', 'click', {       // click action.
  'list': 'Search Results'          // Product list (string).
});
```

- 거래 측정
```javascript
ga('ec:addProduct', {              
  'id': 'P12345',                   // Product ID (string).
  'name': 'Android Warhol T-Shirt', // Product name (string).
  'category': 'Apparel',            // Product category (string).
  'brand': 'Google',                // Product brand (string).
  'variant': 'black',               // Product variant (string).
  'price': '29.20',                 // Product price (currency).
  'coupon': 'APPARELSALE',          // Product coupon (string).
  'quantity': 1                     // Product quantity (number).
});

ga('ec:setAction', 'purchase', {  
  'id': 'T12345',                         // (Required) Transaction id (string).
  'affiliation': 'Google Store - Online', // Affiliation (string).
  'revenue': '37.39',                     // Revenue (currency).
  'tax': '2.85',                          // Tax (currency).
  'shipping': '5.34',                     // Shipping (currency).
  'coupon': 'SUMMER2013'                  // Transaction coupon (string).
});
```


- e.g. 디테일 페이지
```javascript
// '관련상품'의 노출
ga('ec:addImpression', {            // Provide product details in an impressionFieldObject.
  'id': 'P12345',                   // Product ID (string).
  'name': 'Android Warhol T-Shirt', // Product name (string).
  'category': 'Apparel/T-Shirts',   // Product category (string).
  'brand': 'Google',                // Product brand (string).
  'variant': 'Black',               // Product variant (string).
  'list': 'Related Products',       // Product list (string).
  'position': 1                     // Product position (number).
});

// 현재 보고 있는 상품 detail정보
ga('ec:addProduct', {                 // Provide product details in an productFieldObject.
  'id': 'P67890',                     // Product ID (string).
  'name': 'YouTube Organic T-Shirt',  // Product name (string).
  'category': 'Apparel/T-Shirts',     // Product category (string).
  'brand': 'YouTube',                 // Product brand (string).
  'variant': 'gray',                  // Product variant (string).
  'position': 2                       // Product position (number).
});

ga('ec:setAction', 'detail');       // Detail action.
```

- 환불 측정
```javascript
// 전체 거래 환불
ga('ec:setAction', 'refund', {
  'id': 'T12345'    // Transaction ID is only required field for full refund.
});
```

```javascript
// 부분 거래 환불
ga('ec:addProduct', {
  'id': 'P12345',       // Product ID is required for partial refund.
  'quantity': 1         // Quantity is required for partial refund.
});

ga('ec:setAction', 'refund', {
  'id': 'T12345',       // Transaction ID is required for partial refund.
});
```

## 결제 프로세스 측정
<과정>
1. 결제 프로세스의 매 단계마다 tracking code를 넣는다.
2. 필요하다면, 체크아웃 옵션을 측정할 수 있는 tracking code도 넣는다.
3. 유저에게 친숙한 단계별 이름을 지정하려면 웹 인터페이스 내에 있는 admin섹션에 가서 'Ecommerce Settings'를 설정해준다.

### 1. 결제 스텝 측정
1. step
매 스텝마다 `step` value를 집어넣어 측정한다. 이 값은 Ecommerce Settings에 적어준 액션이랑 연동을 시켜준다.

2. option
결제 스텝마다 추가 정보가 있다면 option 필드를 checkout액션이랑 함께 사용해주면 된다.
e.g. 기본 결제 타입 (visa)
```javascript
ga('ec:addProduct', {       
  'id': 'P12345',                   // Product ID (string).
  'name': 'Android Warhol T-Shirt', // Product name (string).
  'category': 'Apparel',            // Product category (string).
  'brand': 'Google',                // Product brand (string).
  'variant': 'black',               // Product variant (string).
  'price': '29.20',                 // Product price (currency).
  'quantity': 1                     // Product quantity (number).
});

// 액션은 checkout, 스텝은 1, 옵션은 Visa
ga('ec:setAction','checkout', {
    'step': 1,
    'option': 'Visa'
});
```

### 2. 결제 옵션 측정
product나 impression data를 집어넣지 않아야 한다.
```javascript
// (`다음`버튼 클릭시)
ga('ec:setAction', 'checkout_option', {'step': 2, 'option': 'FedEx'});

ga('send', 'event', 'Checkout', 'Option', {
    hitCallback: function() {
      // advance to next page
});
```

### 3. 결제 이름 연결
GA 웹사이트 가서 Ecommerce Settings > checkout labelling가서 매 숫자 스텝마다 이름을 적어준다.
e.g. 1. Review Cart  /  2. Collect Payment Info   /   3. Confirm purchase details    /    4. Receipt

## Internal Promotion측정
- 프로모션 노출
```javascript
ga('ec:addPromo', {               // Promo details provided in a promoFieldObject.
  'id': 'PROMO_1234',             // Promotion ID. Required (string).
  'name': 'Summer Sale',          // Promotion name (string).
  'creative': 'summer_banner2',   // Creative (string).
  'position': 'banner_slot1'      // Position  (string).
});
```

- 프로모션 클릭
프로덕트 데이타랑 프로모션 클릭 같이 보내면 안된다. 
```javascript
// Identify the promotion that was clicked.
ga('ec:addPromo', {
  'id': 'PROMO_1234',
  'name': 'Summer Sale',
  'creative': 'summer_banner2',
  'position': 'banner_slot1'
});

// Send the promo_click action with an event.
ga('ec:setAction', 'promo_click');
ga('send', 'event', 'Internal Promotions', 'click', 'Summer Sale');
```

- 예제
```javascript
// 1. Send product and impression data with pageview.

ga('ec:addProduct', {
  'id': 'P12345',                   // Product ID (string).
  'name': 'Android Warhol T-Shirt', // Product name (string).
  'category': 'Apparel',            // Product category (string).
  'brand': 'Google',                // Product brand (string).
  'variant': 'Black',               // Product variant (string).
  'position': 1,                    // Product position (number).
});

// The impression from the Related Products section.
ga('ec:addImpression', {
  'id': 'P12345',                   // Product ID (string).
  'name': 'Android Warhol T-Shirt', // Product name (string).
  'category': 'Apparel/T-Shirts',   // Product category (string).
  'brand': 'Google',                // Product brand (string).
  'variant': 'Black',               // Product variant (string).
  'list': 'Related Products',       // Product list (string).
  'position': 1,                    // Product position (number).
});

ga('ec:setAction', 'detail');       // Detail action.

ga('send', 'pageview');             // Send the product data with initial pageview.


// 2. Send the promo click data when the promo click occurs.

// Call this function when promo click occurs.
function onPromoClick() {
  ga('ec:addPromo', {
    'id': 'PROMO_1234',
    'name': 'Summer Sale',
    'creative': 'summer_banner2',
    'position': 'banner_slot1'
  });

  // Send the promo_click action with an event.
  ga('ec:setAction', 'promo_click');
  ga('send', 'event', 'Internal Promotions', 'click', 'Summer Sale');
}
```

## 예제
### 1. 사용자가 검색결과 리스트에서 처음 상품을 봤을 때
```javascript
ga('create', 'UA-XXXXX-Y');
ga('require', 'ec');

// 반복문으로 제품 수만큼 돌린다.
ga('ec:addImpression', {
  'id': 'P12345',        
  'name': 'Android Warhol T-Shirt',
  'category': 'Apparel/T-Shirts',
  'brand': 'Google',
  'variant': 'black',
  'list': 'Search Results',
  'position': 1                     // 'position' indicates the product position in the list.
});

ga('ec:addImpression', {
  'id': 'P67890',
  'name': 'YouTube Organic T-Shirt',
  'type': 'view',
  'category': 'Apparel/T-Shirts',
  'brand': 'YouTube',
  'variant': 'gray',
  'list': 'Search Results',
  'position': 2
});

ga('send', 'pageview'); // 페이지뷰라고 전송
```

### 2. 제품 리스트에서 제품을 클릭했을 때
html에서 제품 클릭
```html
<a href="/next-page.html"
   onclick="onProductClick(); return !ga.loaded;">Android Warhol T-Shirt</a>
```
제품 클릭시 불리는 함수
```javascript
function onProductClick() {
  ga('ec:addProduct', {
    'id': 'P12345',
    'name': 'Android Warhol T-Shirt',
    'category': 'Apparel',
    'brand': 'Google',
    'variant': 'black',
    'position': 1
  });
 ga('ec:setAction', 'click', {list: 'Search Results'});

  // Send click with an event, then send user to product page.
  ga('send', 'event', 'UX', 'click', 'Results', {
      hitCallback: function() {
        document.location = '/product_details?id=P12345';
      }
  });
}
```

### 3. 쇼핑카트에서 제거하거나 추가하기
```javascript
// Called when a product is added to a shopping cart.
function addToCart(product) {
  ga('ec:addProduct', {
    'id': product.id,
    'name': product.name,
    'category': product.category,
    'brand': product.brand,
    'variant': product.variant,
    'price': product.price,
    'quantity': product.qty
  });
  ga('ec:setAction', 'add');
  ga('send', 'event', 'UX', 'click', 'add to cart');     // Send data using an event.
}
```

### 4. 데모
https://ga-dev-tools.appspot.com/enhanced-ecommerce/
여기서 확인해볼 수 있다.

## refer
[Google Analtyics 삽질냠냠 #3 Enhanced Ecommerce 적용하기 (feat. Google Tag Manager)](https://milooy.wordpress.com/2016/01/14/google-analtyics-3-enhanced-ecommerce/)
