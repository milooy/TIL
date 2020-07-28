(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{352:function(t,s,a){t.exports=a.p+"assets/img/1.a3f11f6a.png"},511:function(t,s,a){"use strict";a.r(s);var e=a(42),n=Object(e.a)({},(function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"장고-settings-파일-설정-변수-분리"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#장고-settings-파일-설정-변수-분리"}},[t._v("#")]),t._v(" 장고 settings 파일 & 설정 변수 분리")]),t._v(" "),e("p",[e("code",[t._v("Two scoops of django")]),t._v(" 책의 5장, 'settings와 requirements 파일'을 보고 개인 프로젝트에 두 가지를 리팩토링해야겠다는 생각이 들었다.")]),t._v(" "),e("ol",[e("li",[t._v("비밀 값(e.g. OAuth 토큰) 코드에서 분리")]),t._v(" "),e("li",[t._v("환경별로 settings 파일 분리")])]),t._v(" "),e("p",[t._v("제일 급한 OAuth 토큰부터 분리해보겠다.\n책에선 환경변수를 이용하는 것을 추천했지만, 나는 차선책인 'json'파일 만드는 방법을 선택했다.\n아직 shell에 익숙하지 않은 것도 있고, 다른 개발자와 json으로 공유하는게 한 눈에 보기 편할 것 같아서다.")]),t._v(" "),e("h2",{attrs:{id:"비밀-값-코드에서-분리시키기"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#비밀-값-코드에서-분리시키기"}},[t._v("#")]),t._v(" 비밀 값 코드에서 분리시키기")]),t._v(" "),e("p",[e("code",[t._v("secret.json")]),t._v("이란 비밀 값들을 저장하는 파일을 만든다. 나는 장고 "),e("code",[t._v("SECRET_KEY")]),t._v("와 facebook OAuth 키 값들을 넣었다. 이 파일은 코드 저장소에 저장되면 안되기에, "),e("code",[t._v(".gitignore")]),t._v("에 추가해준다.")]),t._v(" "),e("div",{staticClass:"language-json extra-class"},[e("pre",{pre:!0,attrs:{class:"language-json"}},[e("code",[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"SECRET_KEY"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"m-4#rp68ffwi어쩌구"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"SOCIAL_AUTH_FACEBOOK_KEY"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"12312345678"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"SOCIAL_AUTH_FACEBOOK_SECRET"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"asdf123asdf123"')]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("p",[t._v("이는 settings파일에서 다음과 같이 불러올 수 있다.")]),t._v(" "),e("div",{staticClass:"language-python extra-class"},[e("pre",{pre:!0,attrs:{class:"language-python"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" json\n\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" django"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("core"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exceptions "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" ImproperlyConfigured\n\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("with")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("open")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"secrets.json"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("as")]),t._v(" f"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    secrets "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" json"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("loads"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("f"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("read"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Keep secret keys in secrets.json")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("def")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("get_secret")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("setting"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" secrets"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("secrets"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("try")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n        "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" secrets"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("setting"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("except")]),t._v(" KeyError"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n        error_msg "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Set the {0} environment variable"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("format")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("setting"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n        "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("raise")]),t._v(" ImproperlyConfigured"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("error_msg"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\nSECRET_KEY "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" get_secret"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"SECRET_KEY"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),e("h2",{attrs:{id:"환경별로-settings-파일-분리"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#환경별로-settings-파일-분리"}},[t._v("#")]),t._v(" 환경별로 settings 파일 분리")]),t._v(" "),e("p",[t._v("이것도 어렵지 않다.\n프로젝트 폴더 내의 메인 앱 내부(기존에 settings.py가 있던 곳)에 "),e("code",[t._v("/settings")]),t._v(" 폴더를 만들어준다.\n나는 기본(base), 로컬(local), 운영 서버(production) 세 개로 분리했다. "),e("code",[t._v("__init__.py")]),t._v("도 추가해주어야 한다(settings의 app에 추가할 필요는 없다).")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("project_name\n    settings\n        __init__.py\n        base.py\n        local.py\n        production.py\n")])])]),e("p",[e("code",[t._v("base.py")]),t._v("에는 기존에 "),e("code",[t._v("settings.py")]),t._v("에 있던 것들을 옮겨주면 된다.\n"),e("code",[t._v("local.py")]),t._v("에선 base를 상속받아준 다음, 개발 환경에서 원하는 세팅들을 추가해주면 된다.")]),t._v(" "),e("div",{staticClass:"language-python extra-class"},[e("pre",{pre:!0,attrs:{class:"language-python"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("base "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("\n\nDEBUG "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("True")]),t._v("\n")])])]),e("p",[t._v("실행은 다음과 같이 하면 되는데,")]),t._v(" "),e("div",{staticClass:"language-shell extra-class"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# settings/local.py세팅 파일로 셸 시작 ")]),t._v("\npython manage.py shell --settings"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("twoscoops.settings.local\n\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# settings/local.py세팅 파일로 서버 구동")]),t._v("\npython manage.py runserver --settings"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("twoscoops.settings.local\n")])])]),e("p",[t._v("그럼 "),e("code",[t._v("ImproperlyConfigured: The SECRET_KEY setting must not be empty")]),t._v(" 에러가 날 것이다. 찾아보니 이렇게 바꾼 후에는 "),e("code",[t._v("project_name/wsgi.py")]),t._v("와 "),e("code",[t._v("manage.py")]),t._v("에 기본 구동 세팅을 설정해줘야 한단다."),e("a",{attrs:{href:"http://stackoverflow.com/questions/19128540/django-improperlyconfigured-the-secret-key-setting-must-not-be-empty",target:"_blank",rel:"noopener noreferrer"}},[t._v("참고 링크"),e("OutboundLink")],1)]),t._v(" "),e("div",{staticClass:"language-python extra-class"},[e("pre",{pre:!0,attrs:{class:"language-python"}},[e("code",[t._v("os"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("environ"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("setdefault"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"DJANGO_SETTINGS_MODULE"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"project_name.settings.local"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),e("p",[t._v("이렇게 바꾸면, 한번 migrate를 해주어야 한다. (기존 db가 날아간다 ㅠㅠ)")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("./manage.py migrate\n")])])]),e("h2",{attrs:{id:"pycharm에서-settings별로-서버-실행-변수-바꾸기"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#pycharm에서-settings별로-서버-실행-변수-바꾸기"}},[t._v("#")]),t._v(" Pycharm에서 settings별로 서버 실행 변수 바꾸기")]),t._v(" "),e("p",[e("img",{attrs:{src:a(352),alt:"Pycharm Settings",title:"Pycharm Settings"}}),t._v("\n일단 "),e("code",[t._v("Run > Edit configurations")]),t._v("에 좌측 "),e("code",[t._v("+")]),t._v("버튼으로 장고 서버를 추가해준다.\n원하는 이름을 지정하고,\n"),e("code",[t._v("Environment variables")]),t._v(" 옆에 "),e("code",[t._v("...")]),t._v("을 눌러 "),e("code",[t._v("DJANGO_SETTINGS_MODULE")]),t._v("이란 key로 원하는 세팅 파일 경로를 잡아준다. 나같은 경우엔 "),e("code",[t._v("cart.settings.local")]),t._v("을 추가해주었다.")]),t._v(" "),e("p",[t._v("virtualenv로 의존성 관리를 하고 있다면, 하단의 "),e("code",[t._v("Python interpreter")]),t._v("도 알맞은 것으로 바꿔주어야 한다. 원하는 것이 없으면 "),e("code",[t._v("Pycharm > Preferences > Project Interpreter")]),t._v("에서 추가해준다. "),e("a",{attrs:{href:"https://www.jetbrains.com/help/pycharm/2016.1/configuring-python-interpreter-for-a-project.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("참고"),e("OutboundLink")],1)]),t._v(" "),e("h2",{attrs:{id:"refer"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#refer"}},[t._v("#")]),t._v(" Refer")]),t._v(" "),e("ul",[e("li",[t._v("Two scoops of django")]),t._v(" "),e("li",[t._v("https://dayone.me/20Tcz1k")])])])}),[],!1,null,null,null);s.default=n.exports}}]);