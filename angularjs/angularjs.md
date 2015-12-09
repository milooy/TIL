# Angularjs

## 살펴보기
- 지시자(directive): ng-app, ng-init과 같은 별도의 html태그나 속성
- ng-app: HTML이 앵귤러js application이라는걸 나타냄
- ng-controller: todo.js에 있는 TodoListController이
- 

```html
<div ng-app="todoApp">
  <h2>Todo</h2>
  <div ng-controller="TodoListController as todoList">
    <span>{{todoList.remaining()}} of {{todoList.todos.length}} remaining</span>
    [ <a href="" ng-click="todoList.archive()">archive</a> ]
    <ul class="unstyled">
      <li ng-repeat="todo in todoList.todos">
        <input type="checkbox" ng-model="todo.done">
        <span class="done-{{todo.done}}">{{todo.text}}</span>
      </li>
    </ul>
    <form ng-submit="todoList.addTodo()">
      <input type="text" ng-model="todoList.todoText"  size="30"
             placeholder="add new todo here">
      <input class="btn-primary" type="submit" value="add">
    </form>
  </div>
</div>
```

```css
.done-true {
  text-decoration: line-through;
  color: grey;
}
```

```javascript
angular.module('todoApp', [])
  .controller('TodoListController', function() {
    var todoList = this;
    todoList.todos = [
      {text:'learn angular', done:true},
      {text:'build an angular app', done:false}];

    todoList.addTodo = function() {
      todoList.todos.push({text:todoList.todoText, done:false});
      todoList.todoText = '';
    };

    todoList.remaining = function() {
      var count = 0;
      angular.forEach(todoList.todos, function(todo) {
        count += todo.done ? 0 : 1;
      });
      return count;
    };

    todoList.archive = function() {
      var oldTodos = todoList.todos;
      todoList.todos = [];
      angular.forEach(oldTodos, function(todo) {
        if (!todo.done) todoList.todos.push(todo);
      });
    };
  });
```

## 조건적 데이터 표현
- ng-if : 조건을 만족할 경우에만 요소를 생성
```html
<!doctype html>
<html ng-app>
<head>
    <meta charset="UTF-8"/>
    <script src="bower_components/angularjs/angular.js"></script>
</head>
<body>
    약관의 동의 : <input type="checkbox" ng-model="checked" ng-init="checked=false"/>
    <br/>
    동의하면 다음으로 진행됩니다.
    <button ng-if="checked">다음</button>
</body>
</html>
```

- ng-show/ng-hide : 참일때 요소를 보이게 하고 거짓일 때 숨기며/반대.
    + 요소 자체는 그대로지만 css의 display속성을 block과 none을 토글
```html
<!doctype html>
<html ng-app>
<head>
    <meta charset="UTF-8"/>
    <script src = "bower_components/angularjs/angular.js"></script>
</head>
<body>
동의 여부 : <input type="checkbox" ng-model="checked" ng-init="checked=false"/>
<br/>
동의하면 다음으로 진행됩니다.
<div>
    <span ng-show="checked">
        다음으로 진행합니다. <button>계속</button>
    </span>
</div>
<div>
    <span ng-hide="checked">
        다음으로 진행할 수 없습니다.
    </span>
</div>
</body>
</html>
```


## 모듈 사용 예제
```javascript
//angular.js
// core...
var app = angular.module('ng', []);
app.service("$rootScope");
// ..

//angular-route.js
var app = angular.module('ngRoute', ['ng']);
app.service("$routeParam");
//..

//angular-zzRoute.js
var app = angular.module('zzRoute', ['ng']);
app.service("$zRouteParam");
//..

//angular-resource.js

//app.js
var app = angular.module('app', ['ngRoute', 'ngResource', 'zzRoute']);
app.controller(ctrlFn);

// ctrl.js
function ctrlFn($rootScope, $routeParam, $zRouteParam) {
  
}
```

## Reference
https://angularjs.org/
http://www.dhyebo.com/blog/?p=29
http://blog.outsider.ne.kr/975
[Post form data using angularjs](http://tutsnare.com/post-form-data-using-angularjs/)
[multiple controllers with angularjs in sinle page app](http://stackoverflow.com/questions/24316355/multiple-controllers-with-angularjs-in-single-page-app)
