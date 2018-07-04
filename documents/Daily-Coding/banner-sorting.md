#일일코딩- 배너 뽑아내 정렬하기

## Question
`lc.Home.promotions` 에 들어 있는 데이터 중 만화 홈 메인 배너들의 `comicId`를 알파벳 순서로 구하시오.
- 만화 홈 메인 배너는 `slot == 'home_main'` 조건
- jQuery 사용 금지
`for`, `while` 문 사용 금지

## Answer
### milooy
```javascript
function compare(a, b){
    if(a<b){
        return -1;
    } else if(a>b){
        return 1;
    } else {
        return 0;
    }
}

var hMain = lc.Home.promotions.filter(function(item) {
  return (item.slot=='home_main');
});

hMain[0].items.map(function(item) {
  return item.comicId;
}).sort(compare);
```

### fallroot
이 문제를 낸 이유는 콘텐츠팀에서 입력한 데이터에 오류가 있어서 찾아야 할 때가 종종 있기 때문입니다. 그러면 홈페이지로 들어가 개발자 콘솔을 열고 현재 데이터를 찾을 때가 많은데 이 문제와 같은 검색을 할 경우가 잦아서 익숙해지시라 낸 문제입니다.

일단 compare 함수는 사용할 필요가 없어요. 만약 명시적으로 저렇게 비교하고 싶으면 아래와 같이 하면 되고요.

```
Array.sort(function(a, b) {
    return a - b;
});
```

나머지는 잘 했네요. each, map, filter, reduce 등의 열거형 자료를 다루는 함수는 몸에 익숙해지는 게 좋아요.

```
lc.Home.promotions
    .filter(function(p) {return p.slot == 'home_main'})[0]
    .items.map(function(i) {return i.comicId})
    .sort()
    .toString()
```

추가로 `Array#sort` 함수의 기본 비교는 어떤 데이터형으로 하는 지 알아보세요. 문자열, 숫자를 비교할 때 각각 어떻게 해야 하는지도요.
