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
