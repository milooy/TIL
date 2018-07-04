# Reference Type

## 텍스트 결합시 구분자 사용을 위한 join() 활용 예
```javascript
if (comic.bgm) {
    text.push('배경음악');
}
if (comic.crossView) {
    text.push('크로스 뷰어');
}
if (comic.hasSide) {
    text.push('외전');
}
if (text.length) {
    $('#artist-info .info-text').html(text.join(' / ')); 
}
```

## 템플릿 Replace용으로 join() 활용 예
```javascript
template: function(template, props) {
    // 원본을 훼손하지 않도록 임시 저장한다.
    var result = template;

    for (var key in props) {
        result = result.split('{{' + key + '}}').join(props[key]);
    }
    return result;
},
```

## push/pop & unshift/shift

push/pop : Stack (많이 씀)
unshift/shift : Queue

## sort()

```javascript
// 역순 정렬
function compare(a, b){
	return b - a;
}

array.sort(compare);
```

```javascript
// 에피소드 정렬하기
episodes.sort(function(a, b) {
    return b.seq - a.seq;
});
```

```javascript
// localeCompare는 왜 만들었다고 했더라?
this.promotions.sort(function(a, b) {
    return a.slot.localeCompare(b.slot);
});
```

```javascript
// 랜덤 정렬
comics.sort(function() {
    return .5 - Math.random();
});
```

## filter()
```javascript
// true값만 반환도 가능
var a = [1, 0, 5, undefined, '', null];
a.filter(Boolean);
```

## 반복 메서드는 모두 많이 씀
every, filter, forEach, map, some