# AngularJS

## 살펴보기
- 지시자(directive): ng-app, ng-init과 같은 별도의 html태그나 속성
- ng-app: HTML이 앵귤러js application이라는걸 나타냄
- ng-controller: todo.js에 있는 TodoListController이

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


## scope
- 컨트롤러나 디렉티브의 유효범위 내 저장공간
- 양방향 데이터 바인딩의 핵심
- 사실 $scope는 그저 단순한 자바스크립트 객체
- 계층 구조 가짐
- rootScope
    - 모든 angularjs 애플리케이션은 하나의 `$rootScope`를 가짐.
    - ng-app생성.
    - ng-app이 선언된 DOM요소가 최상위 노드가 되어 여러 자식 $scope를 가지게 됨.
```javascript
function ctrl($scope) {
    $scope.name = 'Jay';
}

function ctrl2($scope) {
    $scope.age = '22';
}

<html ng-app>
    <div ng-controller="ctrl">
        {{name}} //Jay
        <div ng-controller="ctrl2">
            {{name}} //Jay. 컨트롤러2엔 네임 안만들었는데도 나온다.
        </div>
    </div>
</html>
```
- 자식 scope에서 부모 scope의 데이터 접근.
- 이 계층적 구조를 피하려면 `isolate scope`를 쓰면 된다.
```javascript
function fooCtrl($scope) {
    $scope.name = "Jay";
    
    var childScope = $scope.$new(); //일반 scope생성
    console.log(childScope.name); //Jay
    console.log(childScope.$parent === $scope); //true

    var isolateScope = $scope.$new(true); //isolate scope생성
    console.log(isolateScope.name); //undefined
    console.log(isolateScope.$parent === $scope); //true
}
```

## $apply()
- 이벤트가 $apply()로 angular context로 접근한다.
- $apply()는 3rd-party Library를 이용해 데이터바인딩을 구현하기 위한 함수로  순수 AngularJS내에서 $apply()를 사용하면 동작하지 않을수도 있다.

```html
<!DOCTYPE html>
<html ng-app>
<head>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
</head>
 
<script>
function MainCtrl( $scope )
{
    $scope.text = "";
    $scope.btnClick = function()
    {
        $scope.text = "Hi AngularJS"; //변경 내용이 화면에 나타남
    }
 
    $( "#btn2" ).click( function()
    {
        $scope.text = "Hi jQuery"; //변경 내용이 화면에 나타나지 않음
    });
    
    //이렇게 해야 된다.
    $( "#btn2" ).click( function()
    {
        $scope.text = "Hi jQuery";  //변경 내용이 화면에 나타남
        $scope.$apply(); //수동으로 호출하여 angular context로 접근함.
    });
}
</script>
 
<body ng-controller="MainCtrl">
    <div>{{text}}</div>
    <input id="btn1" type="button" value="AngularJS" ng-click="btnClick()" />
    <input id="btn2" type="button" value="jQuery" />
</body> 
 
</html>

```

## Reference
http://blog.secmem.org/589
http://www.nextree.co.kr/p8890/


## Reference
https://angularjs.org/
http://www.dhyebo.com/blog/?p=29
http://blog.outsider.ne.kr/975
[Post form data using angularjs](http://tutsnare.com/post-form-data-using-angularjs/)
[multiple controllers with angularjs in sinle page app](http://stackoverflow.com/questions/24316355/multiple-controllers-with-angularjs-in-single-page-app)
[angular post file with http](http://stackoverflow.com/questions/16483873/angularjs-http-post-file-and-form-data)
[angularjs apply](http://mobicon.tistory.com/328)
