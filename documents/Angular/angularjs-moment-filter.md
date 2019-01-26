# AngularJS에서 시간 원하는 형식으로 보여주기(feat. momentJS)

## AngularJS Filter
```javascript
boxApp.filter('moment', function() { //*-- angular용 moment 필터 --*//
    return function(dateString, format) {
        return dateString? moment(dateString).format(format): null;
    };
});
```
momentJS 포맷을 적용한 string을 리턴해준다.

## Template tag
```html
<td>{{ invoice.day| moment:'YYYY년 MMMM Do dddd' }}</td>
```
momentJS 포맷을 `:`뒤에 써주면 된다.

