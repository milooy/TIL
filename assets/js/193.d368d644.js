(window.webpackJsonp=window.webpackJsonp||[]).push([[193],{626:function(t,s,a){"use strict";a.r(s);var n=a(54),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"meteor"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#meteor"}},[t._v("#")]),t._v(" Meteor")]),t._v(" "),a("p",[t._v("http://kr.discovermeteor.com/chapters/getting-started/")]),t._v(" "),a("h2",{attrs:{id:"설치"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#설치"}},[t._v("#")]),t._v(" 설치")]),t._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("curl")]),t._v(" https://install.meteor.com "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("sh")]),t._v("\n\nmeteor create microscope "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 앱 만들기")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("cd")]),t._v(" microscope\nmeteor --port "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("8090")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 실행")]),t._v("\n\nmeteor "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" mizzao:bootstrap-3 "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 패키지 추가")]),t._v("\nmeteor "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" underscore\n")])])]),a("h2",{attrs:{id:"패키지"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#패키지"}},[t._v("#")]),t._v(" 패키지")]),t._v(" "),a("ul",[a("li",[t._v("미티어 코어는 여러 개의 코어 패키지들로 나누어짐. 미티어 앱에 포함.")]),t._v(" "),a("li",[t._v("정규 미티어 패키지: isopacks. "),a("code",[t._v("accounts-ui")]),t._v(", "),a("code",[t._v("appcache")]),t._v("같은 퍼스트파티 패키지. 미티어에 포함.")]),t._v(" "),a("li",[t._v("써드파티 패키지: 다른 사용자들이 개발한 isopack. 미티어 패키지 서버에 업로드되어 있음. meteor search 명령어로 찾아볼 수 있음.")]),t._v(" "),a("li",[t._v("로컬 패키지: 직접 작성한 패키지. "),a("code",[t._v("/packages")]),t._v("디렉터리에 넣는다.")]),t._v(" "),a("li",[t._v("npm 패키지: node.js패키지.")])]),t._v(" "),a("h2",{attrs:{id:"파일구조"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#파일구조"}},[t._v("#")]),t._v(" 파일구조")]),t._v(" "),a("ul",[a("li",[t._v("/server: 서버에서만 실행되는 코드")]),t._v(" "),a("li",[t._v("/client: 클라에서만 실행되는 코드")]),t._v(" "),a("li",[t._v("그 밖의 모든 것은 클라, 서버 양쪽 모두에서 실행")]),t._v(" "),a("li",[t._v("/public: 정적 자원 넣기(fonts, images...)")])]),t._v(" "),a("p",[t._v("파일을 로드하는 순서")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("/lib디렉토리에 있는 파일들은 제일 먼저 로드")])]),t._v(" "),a("li",[a("p",[a("code",[t._v("main.*")]),t._v("이름 파일들은 그 밖의 다른 모든 파일들보다 나중에 로드.")])]),t._v(" "),a("li",[a("p",[t._v("그 밖의 모든 파일들은 파일명의 알파벳 순으로 로드")])]),t._v(" "),a("li",[a("p",[t._v("미티어는 파일을 잘 찾는다. "),a("code",[t._v("/client")]),t._v("디렉토리 어디 넣든지 미티어는 이를 찾아 컴파일한다.")])]),t._v(" "),a("li",[a("p",[t._v("이는 js나 css파일 경로를 직접 입력할 필요가 없다는 것을 의미.")])])]),t._v(" "),a("h2",{attrs:{id:"spacebars"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#spacebars"}},[t._v("#")]),t._v(" spacebars")]),t._v(" "),a("ul",[a("li",[t._v("Inclusions: 미티어에게 해당 위치에 동일 이름의 템플릿으로 대치하라는 의미.")]),t._v(" "),a("li",[t._v("Expressions: 현재 객체의 속성값, 현재 템플릿 매니저에 정의된 템플릿 헬퍼의 리턴 값.")]),t._v(" "),a("li",[t._v("Block helpers: 템플릿의 흐름을 제어하는 특별한 태그.")])]),t._v(" "),a("h2",{attrs:{id:"collections"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#collections"}},[t._v("#")]),t._v(" collections")]),t._v(" "),a("ul",[a("li",[t._v("데이터 저장\n"),a("ul",[a("li",[t._v("브라우저 메모리: js변수 같은 것들은 브라우저 메모리에 저장된다. 현재 브라우저 탭에 한정.")]),t._v(" "),a("li",[t._v("브라우저 저장소(storage): 쿠키, 로컬 스토리지. 세션 한계를 넘어 저장.")]),t._v(" "),a("li",[t._v("서버 데이터베이스: 영구적으로 데이터 저장.")])])])]),t._v(" "),a("h3",{attrs:{id:"서버에서의-컬렉션"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#서버에서의-컬렉션"}},[t._v("#")]),t._v(" 서버에서의 컬렉션")]),t._v(" "),a("p",[t._v("Mongo 데이터베이스로의 API로 가능")]),t._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[t._v("meteor mongo\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" db.posts.insert"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("title: "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"A new post"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" db.posts.find"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v('# { "_id": ObjectId(".."), "title" : "A new post"};')]),t._v("\n")])])]),a("h3",{attrs:{id:"클라이언트에서-컬렉션"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#클라이언트에서-컬렉션"}},[t._v("#")]),t._v(" 클라이언트에서 컬렉션")]),t._v(" "),a("p",[a("code",[t._v("Posts = new Mongo.Collection('posts');")]),t._v(": 실제 몽고 컬렉션의 로컬 인 브라우저 캐시를 생성하는 것.\n클라이언트 쪽 컬렉션을 '캐시'라고 말하는 것은, 데이터의 부분 집합을 가지며 데이터에 빠르게 접근할 수 있다는 것을 의미.")]),t._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[t._v("❯ Posts.findOne"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v('# {title: "A new post", _id: LocalCollection._ObjectID};')]),t._v("\n\n❯ Posts.find"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(".count"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 1")]),t._v("\n❯ Posts.insert"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("title: "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"A second post"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 'xxx'")]),t._v("\n\n❯ Posts.find"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(".count"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 2")]),t._v("\n")])])]),a("p",[t._v("참고: "),a("code",[t._v("find()")]),t._v("는 커서를 리턴. 반응형 데이터 소스. 그 데이터 내용 얻으려 할 때, 현재 커서 위치에서 데이터를 배열로 변환하는 "),a("code",[t._v("fetch()")]),t._v("를 사용")]),t._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 몽고 쉘")]),t._v("\n❯ db.posts.find"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("title: "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"A new post"')]),t._v(", _id: ObjectId"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('".."')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("title: "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"A second post"')]),t._v(", _id: "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'yyy'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("클라에서 서버로 보내는 코드 작성 없이 post를 MongoDB로 삽입했다.\n"),a("code",[t._v("Posts = new Mongo.Collection('posts');")]),t._v(" 요 코드로!\n이는 다른 탭의 브라우저에서도 유지된다.")]),t._v(" "),a("h3",{attrs:{id:"데이터베이스-활용"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#데이터베이스-활용"}},[t._v("#")]),t._v(" 데이터베이스 활용")]),t._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[t._v("meteor reset "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 몽고 데이터베이스를 완전히 비운다.")]),t._v("\n")])])]),a("h2",{attrs:{id:"미티어-방식"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#미티어-방식"}},[t._v("#")]),t._v(" 미티어 방식")]),t._v(" "),a("ul",[a("li",[t._v("미티어 앱은 서버 뿐만 아니라 클라에서도 동작한다.")]),t._v(" "),a("li",[t._v("데이터베이스는 "),a("em",[t._v("어디에서나")]),t._v(" "),a("ul",[a("li",[t._v("db에 넣기만 하면 미티어가 부분집합을 가져와 클라에 복사해 둘 것이다.")]),t._v(" "),a("li",[t._v("=> 1. HTML코드를 클라로 보내는 대신, 미티어 앱은 실제 생 데이터를 보내고 클라가 그것을 처리하게 한다.(데이터만 전송)")]),t._v(" "),a("li",[t._v("=> 2. 서버에 갔다오는 시간 기다려야 하는 일 없이 즉시 데이터에 접속할 수 있다.")])])])]),t._v(" "),a("h2",{attrs:{id:"발행-publishing"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#발행-publishing"}},[t._v("#")]),t._v(" 발행(Publishing)")])])}),[],!1,null,null,null);s.default=e.exports}}]);