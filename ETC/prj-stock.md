- admin lte template: https://almsaeedstudio.com/

## 화면 구성
```
물품 목록
    -이름
    -설명
    -전체 창고 + 재고 수량

    +물품 등록하기
    +(물품 이동하기)
    +발송장 만들기

물품
    -이름
    -설명
    -GTIN
    -UPCA
    -포함 물품
        -이름
        -설명
    -창고
        -이름
        -재고 수량
    -재고 변동 이력
        -창고
        -수량
        -주문 종류(kind)

    +재고 추가하기
    +물품 이동하기
    +발송장 만들기

창고 목록
    -이름
    -설명

    +창고 등록하기
    +발송장 만들기

창고
    -이름
    -설명
    -발송장 목록 - 출발 / 도착 / 출발 예정 / 도착 예정
    -재고 목록

    +창고 수정하기
    +발송장 만들기

발송장 목록
    -source
    -dest
    -발송 상태
    -발송장 상태 이력 + 변경자 이름

    +발송장 만들기

발송장
    -생성 시각
    -수정 시각
    -source
    -dest
    -발송 상태
    -발송장 상태 이력 + 변경자 이름
    -적재 내역(StockEntry) 목록
        -물품

    +발송장 만들기
    +발송장 삭제하기
    +발송장 수정하기
        +물품 내역(StockEntry) 추가하기
        +물품 내역 삭제하기
    +발송장 복사하기
```

크게는 화면이 여섯 개로 나뉜다고 보시면 됩니다.
물품 목록과 물품 detail,
창고 목록과 창고 detail,
발송장 목록과 발송장 detail 이예요

`-`로 표시된 것은 해당 페이지의 내용이 되겠고
`+`로 표시한 것은 해당 페이지의 기능? 버튼?이라고 볼 수 있겠습니다.

## api
```
창고 두 개와 수량을 받는 API
POST: inventory_a, inventory_b, quantity

stock/(id)/afterservice/
    inventory_a - 물건이 반환될 창고
    inventory_b - 물건이 나갈 창고
stock/(id)/transfer/
    inventory_a - 물건이 들어올 창고
    inventory_b - 물건이 나갈 창고


창고 하나와 수량을 받는 API
POST: inventory, quantity

stock/(id)/promote/
stock/(id)/refund/
stock/(id)/discard/
stock/(id)/store/
stock/(id)/bind/
stock/(id)/unbind/
```

## Auth
with.pinkfong.com처럼 권한 추가.
로그인 페이지만 있으면 된다.

## django REST framework
- Getting Started with Django Rest Framework and AngularJS: http://blog.kevinastone.com/getting-started-with-django-rest-framework-and-angularjs.html
- http://blog.kevinastone.com/getting-started-with-django-rest-framework-and-angularjs.html

## api 수정
- api/stock
    + stockId 추가
-  api/stock/stockId
    +  invoice의 dest, source를 id값 말고 이름으로 출력
    +  stock_entry.kind가 뭐죵?
    +  invoice고유아이디를 앞에 넣는게 좋을까
- api/inventory
    + inventoryId추가
