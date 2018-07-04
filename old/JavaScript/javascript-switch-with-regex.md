## Problem
`Google Tag Manager`에서 `event`를 만드는데 카테고리를 현재 있는 페이지 이름으로 넣고 싶다.
하지만 그냥 page path를 가져오면 가독성이 좋지 않아 한글화를 하고 싶다.
커스텀 자바스크립트 변수로 switch로 분기태워서 나누면 될 것 같은데,
`https://store.pinkfong.com/user/order/2521/`에서 `2521`처럼 동적으로 만들어진 path가 있어 보통 switch문으로 되지 않아 정규표현식을 쓰도록 한다.

## Solution
switch에 true를 넣어 무조건 안으로 넣어주고, `/정규식/.test(원하는변수)`식으로 분기를 태워준다.
GTM의 Custom Javascript타입으로 `pathName`이란 이름의 Variables를 만들고, 사용할 땐 {{ pathName }}으로 사용해주면 된다.

```javascript
function() {
    var path = location.pathname;
    var name;
    switch(true) {
        case /^\/$/.test(path):
            name = "메인페이지";
            break;
        case /^\/\d+\/$/.test(path):
            name = "제품상세";
            break;
        case /^\/user\/order\/\d+\/done\/$/.test(path):
            name = "구매완료";
            break;
        case /^\/user\/order\/$/.test(path):
            name = "주문";
            break;
        case /^\/user\/order\/\d+\/$/.test(path):
            name = "주문상세";
            break;
        case /^\/cart\/$/.test(path):
            name = "장바구니";
            break;
        case /^\/order\/$/.test(path):
            name = "주문진행중";
            break;
        default:
            name = path;
    }
    return name;
}
```

## refer
http://stackoverflow.com/questions/2896626/switch-statement-for-string-matching-in-javascript
