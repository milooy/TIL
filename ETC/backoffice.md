## 백오피스에 새 메뉴를 붙이는 풀 사이클 접해보기
- 백오피스 레포지토리 받고 https://github.com/lezhin/backoffice
- 노드, 사스, 컴파스
- npm install (노드 라이브러리 패키지 매니저)
- bower install (브라우저 라이브러리 패키지 매니저)
    - src 밑에 들어간다.
- grunt 패키지관리자
    - grunt -h 치면 현재 가능한 명령어 목록 나옴.
    - 개발: grunt dev
        - src안에 있는 모든 파일을 말아서 dist폴더로 해준다.
    - grunt server
        - src>dist
- 테스트는 Lab에서!
    - lab.app.js
    - routes배열에 하나 더 추가. 뒤에는 이름이 다 같아야 한다. 옵션은 false true
        - 이 메뉴는 이 컨트롤러를 사용합니다.
    - 새로 추가한 이름대로 폴더를 하나 만들어주고, comicList.js(이름)추가해본다.
    - 구조: 함수가 있고, module.export로 할당한다. 함수는 반드시 function($scope)가 있어야함.
        - 같은폴더안에 똑같이 html만든다. 확장자는 .tpl.html
        - {{foo}}
    - shared에 servies 밑에 service.constant
        - PATH밑에 변수들 있다.
        - $scope. 앵귤러 api에서 $rootScope.Scope을 본다.
        - {{'NAV.LAB.SUB.COMICLIST.TITLE’|translate}}
        - 밑에 
        - ‘LAB.SUB.COMICLIST’하면끝이야. 뒤에 있는건 접근가능한 멤버. 밸류는 실제주소.
            - 샤실은 원페이지. index.html#haha
        - 타이틀바꾸기:app밑에  ko.js에서 바꾼다.
    - grunt dev가 파일을 새로 만들면 그런트를 껏다 켜야한다.
        - ctrl C
        - 하고 다시 grunt dev
    - 독만들기
        - grunt makedoc
        - gdoc이란거!

## 백오피스 배포하기
- 기존 태그 버전이랑 최신거 사이 커밋 복사해서 릴리즈노트에 적기
    - gruntfile.js
    - commit "add release note for 0.4.11"
- 태깅 > 그런트 태스크
    + grunt versionBump:patch
- grunt finish하면 끝난다.

## 백오피스 모듈 구조
- scripts>`conf.uglify.js`
    + 필요한 라이브러리들의 경로를 말아주는 곳.
    + 앵귤러제이에스 모듈들이랑 서드파티 등등 있다.
- shared > controllers> `controller.shared.js`
- shared>`shared.js`
    + 직접 만든 모듈들을 말아넣은 것.
    + 밑에 shared.makeApp 펑션
        * 이걸 하면 말아서 모듈을 만들어준다. 거기엔 lzShared와 ngRoute가 주입되어있다.
        * 그걸 ㅇㅇ.app.js에서 실행시키는데, 그럼 그 이름 가지고 템플릿이랑 js조합해서 만든다.

## page.js 구동방법
### initialize
- page.js
    + pagesCtrl
        * initialize 이니셜라이즈
            - locals에 $scope, $routeParams, Util을 담는다.
            - (routeParams엔 page?mode=list&page=1가 잘려져서 mode:"list", page="1"이 넘어간다.)
            - local을 담아 데이터 넘기면서 simpleListCtrl를 상속받는다.
            - pageEditorCtrl로 추가하고,
            - service.remote에서 page()랑, 
            - 상수들인 MODE - add, edit, list를 받아와서 넘기며
            - simpleList를 이니셜라이즈슈퍼 한다.
- simpleList.js
    + initializeSuper
        * resource랑 cons 넘겨받고
        * cons 셋한다.(setCONS(). 내 스코프에 cons들을 page.js로부터 넘겨받아옴.)
        * 지금은 $routeParams.mode가 없으니 list라고 지정해준다.
        * $routeParams.page가 있으면 박아주고 없으면 1
        * 저것 중 하나라도 있으면 url에 박아준다.(setSearchOnLocation())
- page.js
    + pagesCtrl
        * initialize
            - $scope에 listLimit을 50으로 설정해주고
            - makePaths()
                + $scope.servicePath엔 http://beta-www.lezhin.com/page를,
                + $scope.assetPathRoot엔 http://beta-cdn.lezhin.com/files/assets를 넣는다.
            - 만약 finishedPreloader이면 다시 initialize (뭐다?)

### add버튼 클릭
- add() 호출
    + pagesCtrl
        + setSearchOnLocation로 url에 add를 추가해준다.
    + pageEditorCtrl
        * initialize는 언제마다 불리워지는 걸까?
        * initialize
            - $routeParams.mode가 add면 $scope.modeTitle을 '등록'으로 넣어준다.
            - requestFileAsset()
                + remote.js의 fileAssets에서 GET해온다.
                + 왜 뒤에는 $promise를 걸었을까?
                + 콜백은 뭐가 넘어가는 걸까?
- submit() 누르기
    + requestPage()
        * isLoading을 true로 해두고
        * resource는 Remote.backend.page()로 받아오고
        * mode가 add면 save api를 호출한다. tpl에 있는 $scope.newData를 넘긴다.
        * mode가 다른거면 newData에서 pick해온 뒤 update api호출한다.
- edit() 호출
    + 원래 있던 데이터인 pageSet에 lodash pick해온 데이터들, 모드를 모아 url에 넣어준다.
- remove()호출
    + conrim 삭제하시겠습니까?
    + requerstRemove()
        * pageSet.id를 remove api에 넘겨 지움
- 

## 질문
- services.utility.js에서 함수를 계속 this에 넣는 이유는?
- {{::pageSet.title}} 왜 땡땡을 넣을까
- page.tpl 31line value랑 label에 변수 넣는것 차이(구글링 방법도)
- <lz-copiable-column>이런건 어디서 찾죠
