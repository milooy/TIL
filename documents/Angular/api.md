# AngularJS API

## $location
https://code.angularjs.org/1.3.14/docs/api/ng/service/$location
- parses the URL in the browser address bar(window.location)
- you can
    + watch and observe URL
    + change URL
```javascript
// given url http://example.com/#/some/path?foo=bar&baz=xoxo
var searchObject = $location.search();
// => {foo: 'bar', baz: 'xoxo'}

// set foo to 'yipee'
$location.search('foo', 'yipee');
// $location.search() => {foo: 'yipee', baz: 'xoxo'}
```

## ng-class
http://blog.outsider.ne.kr/1045
HTML 요소에 CSS 클래스 동적으로 주기
```html
<p ng-class="{strike: deleted, bold: important, red: error}">Example</p>
```

## track by
[refer](http://seosh81.info/?p=795)
```html
<div ng-controller="bookCtrl">
    <div ng-repeat="tag in book.tags track by $index">
        <input type="text" ng-model="book.tags[$index]"/>
    </div>
    
    My tags are <b>really</b>: {{ book.tags }}
</div>
```
```javascript
angular.module('myApp', [])
.controller('bookCtrl', function($scope) {
    $scope.book = {
        name: 'A Game of Thrones',
        tags: [
            'Tyrion',
            'John Snow',
            'Arya',
            'Sean Bean'
        ]
    };
});
```
라고 작성하면 $hashKey가 아닌 $index(위치)를 통해서 다른 3개의 DOM을 생성합니다.

## $controller
https://docs.angularjs.org/api/ng/service/$controller
컨트롤러를 만든다

## $rootScope
https://docs.angularjs.org/api/ng/service/$rootScope
http://blog.secmem.org/589

## $routeParams
https://docs.angularjs.org/api/ngRoute/service/$routeParams
```javascript
// Given:
// URL: http://server.com/index.html#/Chapter/1/Section/2?search=moby
// Route: /Chapter/:chapterId/Section/:sectionId
//
// Then
$routeParams ==> {chapterId:'1', sectionId:'2', search:'moby'}
```

## $location.search()
$routeParams랑 비슷. 
https://docs.angularjs.org/api/ng/service/$location

## angular.extend
http://blog.outsider.ne.kr/981
html은 변경하지 고 다른 컨트롤러(상속받을)로 추출하려면.
