# Meteor

http://kr.discovermeteor.com/chapters/getting-started/

## 설치
```shell
curl https://install.meteor.com | sh

meteor create microscope # 앱 만들기
cd microscope
meteor --port 8090 # 실행

meteor add mizzao:bootstrap-3 # 패키지 추가
meteor add underscore
```

## 패키지
- 미티어 코어는 여러 개의 코어 패키지들로 나누어짐. 미티어 앱에 포함.
- 정규 미티어 패키지: isopacks. `accounts-ui`, `appcache`같은 퍼스트파티 패키지. 미티어에 포함.
- 써드파티 패키지: 다른 사용자들이 개발한 isopack. 미티어 패키지 서버에 업로드되어 있음. meteor search 명령어로 찾아볼 수 있음.
- 로컬 패키지: 직접 작성한 패키지. `/packages`디렉터리에 넣는다.
- npm 패키지: node.js패키지.

## 파일구조
- /server: 서버에서만 실행되는 코드
- /client: 클라에서만 실행되는 코드
- 그 밖의 모든 것은 클라, 서버 양쪽 모두에서 실행
- /public: 정적 자원 넣기(fonts, images...)

파일을 로드하는 순서

- /lib디렉토리에 있는 파일들은 제일 먼저 로드
- `main.*`이름 파일들은 그 밖의 다른 모든 파일들보다 나중에 로드.
- 그 밖의 모든 파일들은 파일명의 알파벳 순으로 로드

- 미티어는 파일을 잘 찾는다. `/client`디렉토리 어디 넣든지 미티어는 이를 찾아 컴파일한다.
- 이는 js나 css파일 경로를 직접 입력할 필요가 없다는 것을 의미.

## spacebars
- Inclusions: `{{> templateName}}`. 미티어에게 해당 위치에 동일 이름의 템플릿으로 대치하라는 의미.
- Expressions: `{{title}}`. 현재 객체의 속성값, 현재 템플릿 매니저에 정의된 템플릿 헬퍼의 리턴 값.
- Block helpers: 템플릿의 흐름을 제어하는 특별한 태그. `{{#each}}...{{/each}}`, `{{#if}}...{{/if}}`

## collections
- 데이터 저장
    + 브라우저 메모리: js변수 같은 것들은 브라우저 메모리에 저장된다. 현재 브라우저 탭에 한정.
    + 브라우저 저장소(storage): 쿠키, 로컬 스토리지. 세션 한계를 넘어 저장.
    + 서버 데이터베이스: 영구적으로 데이터 저장.

서버에서의 컬렉션. Mongo 데이터베이스로의 API로 가능
```shell
meteor mongo

> db.posts.insert({title: "A new post"});

> db.posts.find();
{ "_id": ObjectId(".."), "title" : "A new post"};
``` 


