[공식 문서](https://developers.google.com/tag-manager/enhanced-ecommerce)

## Enhanced Ecommerce 작동시키기
두 가지 방법이 있다.
1. Data Layer로 넣기 (권장됨)
2. 커스텀 자바스크립트 매크로로 넣기

## 제품 Impression 측정
- 측정: impressions
- 데이터타입: `impressionFieldObjects`의 배열
```javascript
<script>
// Measures product impressions and also tracks a standard
// pageview for the tag configuration.
// Product impressions are sent by pushing an impressions object
// containing one or more impressionFieldObjects.
dataLayer.push({
  'ecommerce': {
    'currencyCode': 'EUR',                       // Local currency is optional.
    'impressions': [
     {
       'name': 'Triblend Android T-Shirt',       // Name or ID is required.
       'id': '12345',
       'price': '15.25',
       'brand': 'Google',
       'category': 'Apparel',
       'variant': 'Gray',
       'list': 'Search Results',
       'position': 1
     },
     {
       'name': 'Donut Friday Scented T-Shirt',
       'id': '67890',
       'price': '33.75',
       'brand': 'Google',
       'category': 'Apparel',
       'variant': 'Black',
       'list': 'Search Results',
       'position': 2
     }]
  }
});
</script>
```


## Refer
[Magento Google Tag Manager Add To Cart Tag](https://youtu.be/GM2L4tp6wd4?list=PLXIUlXaKkxrx_--L98C11vErhnW8AB5XB)
[ecommerce tips google tag-manager](http://www.simoahava.com/analytics/ecommerce-tips-google-tag-manager/)
[persist-datalayer-google-tag-manager](http://www.simoahava.com/analytics/persist-datalayer-google-tag-manager/)
