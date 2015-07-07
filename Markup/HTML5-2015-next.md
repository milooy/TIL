# 2015 2학기 NHN NEXT HTML5 수업
## 0707
[깃헙위키](https://github.com/NHNNEXT/2015-02-HTML5/wiki/1%EC%A3%BC%EC%B0%A8-%EA%B3%B5%EC%9C%A0)
- jQuery를 사용하는게 과연 빠를까?
    + 필요한 jQuery만 다운?
        * 네트워크 문제? 자잘한거 많이보단 큰거 한방에 다운받는게 더 빠름.
    + 사용자들의 행위에 따라 다양하게 로딩.
        * 많이쓰는건 먼저, 적게쓰는건 늦게?
        * 네이버 지도 -> 길찾기 탭을 누르면, 거기에 필요한 js를 새로 받아온다.(비교적 덜 쓰는 기능이기 때문.)
        * => 본인의 서비스를 분석해야한다.
- 자바스크립트 lazy loading
    + require.js
    + AMD mode (?)
- template의 위치는 html? js 어디에 있어야 좋을까?
    + html에 있으면 캐싱이 안된다!
    + 혹은 재사용도 안된다.(여기저기 붙여넣을 수 없다.)
    + 템플릿 폴더를 만들어 거기에 넣어두 된다.
        * 왔다갔다해서 귀찮을 수도.
    + 템플릿코드가 작으면 그냥 html에 넣는게 효과적.
        * 네트워크는 커넥션 맺는 코드가 성능 결정짓는데 가장 큰 역할. 
- 돔 추가하기
    + appendChild는 돔을 만들어야되서 귀찮다면
    + 문자열이 들어갈 수 있는 템플릿코드를 써서 innerHTML을 사용하려는데 
    + innerHTML로 새로 추가하면 안에 데이터가 아예 갈려져서 들어간다.
    + 그래서 +innerHTML로 추가하려니 매번 새로 그리게 된다.
    + 그러면 가장 큰 문제점이, 예전 돔이랑 달라진다는 것이다
        * checked같은걸 해둬도, 그게 풀린다!
        * 성능상 문제도 있겠지.
    + insertAdjacentHTML은 밑에 추가해준다.
    + jQuery의 append()도 insertAdjacentHTML로 구현되어있다!
    + jQuery의 clone()은 아예 똑같이 받아온다!
        * true로 넘기면 이벤트까지 다 똑같이 받아오고
        * false는 생긴걸로만 받아온다.
- 속성이 있는지 확인할 때 `return MyObject.someProperty`이것 보다 `return someProperty in MyObject` 이걸 많이 쓸까? 

```javascript
//클로져 활용
"get" : function(text) {
    var template = Handlebars.comple(...);
    
    //이 방법은 축약형
    return (this.get = function(text){
        return template({body:text});
        })(text);
    
    //이 방법은 긴 형.
    this.get = function(text){
        return template({body:text});
    }
    return this.get(text);
}
```
