(window.webpackJsonp=window.webpackJsonp||[]).push([[251],{462:function(t,a,s){"use strict";s.r(a);var n=s(54),e=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"리액트-자료들"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#리액트-자료들"}},[t._v("#")]),t._v(" 리액트 자료들")]),t._v(" "),s("h2",{attrs:{id:"링크-톺아보기-리안-개발-일기-1-front-end-개발-react"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#링크-톺아보기-리안-개발-일기-1-front-end-개발-react"}},[t._v("#")]),t._v(" (링크 톺아보기) 리안 개발 일기 #1: Front-End 개발(React)")]),t._v(" "),s("ul",[s("li",[t._v("리액트 가볍지 않다")]),t._v(" "),s("li",[t._v("react-fiber 나오면 성능 개선될수도 (https://github.com/acdlite/react-fiber-architecture)\n"),s("ul",[s("li",[s("blockquote",[s("p",[t._v("React Fiber is an ongoing reimplementation of React's core algorithm.")])])])])]),t._v(" "),s("li",[s("a",{attrs:{href:"https://velopert.com/3293",target:"_blank",rel:"noopener noreferrer"}},[t._v("next.js"),s("OutboundLink")],1)]),t._v(" "),s("li",[t._v("dispatcher 택배회사는 action을 받은 순서대로 늘어놓는다.\n"),s("ul",[s("li",[t._v("flux라는 운송법에는 먼저 보낸 택배가 먼저 배송지에 도착해야 한다는 규율")])])]),t._v(" "),s("li",[t._v("다른 flux구현체들과 비교했을 때, redux의 가장 큰 특징은 전체 앱을 하나의 스토어로 관리한다는 점.\n"),s("ul",[s("li",[t._v("이는 앱을 한층 더 예측가능하게 만들고, 다수 스토어간의 충돌을 방지하고, 시간여행 디버깅을 가능하게 한다.")]),t._v(" "),s("li",[t._v("하지만 대량의 dispatch가 발생하는 상황에서 앱 전체의 병목 현상을 야기할 수 있다\n"),s("ul",[s("li",[t._v("Redux-thunk, Redux-saga, Redux-Observable등의 미들웨어가 거의 필수적으로 사용.")])])])])]),t._v(" "),s("li",[t._v("render 메소드가 리턴하는건 돔처럼 생겼지만 사실은 react가 만들어내는 virtual dom")])]),t._v(" "),s("blockquote",[s("p",[t._v("그래프QL 써보고싶당!")])]),t._v(" "),s("h2",{attrs:{id:"링크-톺아보기-do-we-need-redux-part1"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#링크-톺아보기-do-we-need-redux-part1"}},[t._v("#")]),t._v(" (링크 톺아보기) Do we need Redux? (Part1)")]),t._v(" "),s("ul",[s("li",[t._v("리덕스가 아니면 불가능한 것: 타임 트래블 디버깅")])]),t._v(" "),s("blockquote",[s("p",[t._v("타임트래블 디버깅이 뭘까 나는 안써봄")])]),t._v(" "),s("h1",{attrs:{id:"react-velopert-inflearn-강의"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#react-velopert-inflearn-강의"}},[t._v("#")]),t._v(" React velopert inflearn 강의")]),t._v(" "),s("p",[t._v("https://www.inflearn.com/course/react-%EA%B0%95%EC%A2%8C-velopert/")]),t._v(" "),s("h2",{attrs:{id:"리액트-장점과-단점"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#리액트-장점과-단점"}},[t._v("#")]),t._v(" 리액트 장점과 단점")]),t._v(" "),s("ul",[s("li",[t._v("장점: 뛰어난 garbage collection, 메모리 관리, 성능, 서버&클라사이드 렌더링 모두 지원, 간편한 UI 수정 및 재사용, 페이스북이 밀어준다, 다른 프레임워크나 라이브러리와 혼용가능")]),t._v(" "),s("li",[t._v("단점: view only, IE8 이하 지원 x,")])]),t._v(" "),s("h2",{attrs:{id:"리액트-설정"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#리액트-설정"}},[t._v("#")]),t._v(" 리액트 설정")]),t._v(" "),s("ul",[s("li",[t._v("ver 15이상부턴 react랑 react-dom 따로 import해줘야 한다. react-dom은 돔 조작에 관련된 것.")]),t._v(" "),s("li",[t._v('JSX: XML-like syntax를 native js로 변경해줌. ""로 감싸지 않는다. babel에서 jsx로더를 사용해서 이걸 js로 변환해줌')]),t._v(" "),s("li",[t._v("props\n"),s("ul",[s("li",[t._v("컴포넌트 내부의 immutable data")]),t._v(" "),s("li",[t._v("jsx내부에 {this.props.propsName}")]),t._v(" "),s("li",[t._v('컴포넌트를 사용 할 때, <>안에 propsName="value"')]),t._v(" "),s("li",[t._v("this.props.children은 기본적으로 갖고 있는 props로, "),s("Cpnt",[t._v("여기에 있는 값이 들어간다")])],1)])]),t._v(" "),s("li",[t._v("state\n"),s("ul",[s("li",[t._v("유동적인 데이터")]),t._v(" "),s("li",[t._v("jsx내부에 {this.state.stateName}")]),t._v(" "),s("li",[t._v("초기값 설정이 필수. 생성자(constructor)에서 this.state={} fh tjfwjd.")]),t._v(" "),s("li",[t._v("값을 수정 할 때는 this.setState({...}), 렌더링 된 다음엔 this.state = 절대 사용 말것.")])])])]),t._v(" "),s("div",{staticClass:"language-html extra-class"},[s("pre",{pre:!0,attrs:{class:"language-html"}},[s("code",[t._v('class Codelab extends React.Component {\n  // 모든 리액트 컴포넌트는 render메소드가 있음\n  // 컴포넌트에서 여러 el을 렌더링 할때 꼭 container element안에 포함해야 한다\n  render() {\n    let foo = "123";\n    return (\n      // JSX에서 js를 표현하려면 {}로 매핑하면 된다\n      // JSX안에서 style 설정하려면 string형식이 아니고 key가 camelCase인 객체 사용\n      '),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token special-attr"}},[s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("style")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token value css language-css"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("backgroundColor")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")])])])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("'gray'}}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n          {/* JSX안에서 주석 달려면 이렇게 해야한다*/}\n          Codelab {foo}    \n        "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("hello {this.props.name}"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("{this.props.children}"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\n    )\n  }\n}\n\nclass Counter extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      value: 0\n    }\n    this.handleClick = this.handleClick.bind(this);\n  }\n  \n  handleClick() {\n    this.setState({value: this.state.value + 1})\n  }\n\n  render() {\n    return (\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n        {this.state.value}\n        "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("button")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token special-attr"}},[s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("onClick")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token value javascript language-javascript"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("handleClick"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")])])])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("+1"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("button")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    )\n  }\n}\n\nclass App extends React.Component {\n  render() {\n    return (\n      "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("Codelab")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("name")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("jay"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("유루무 {this.props.mainName} {this.props.value}"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("Codelab")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("Counter")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    \n    );\n  }\n}\n\n// Type 검증: Component.propTypes = {...}\nApp.propTypes = {\n  v1: React.PropTypes.string,\n  v2: React.PropTypes.number.isRequired,\n}\n// 기본 값 설정: Component.defaultProps = {...}\nApp.defaultProps = {\n  v1: 'Unknown',\n  // v2: '3' 이러면 에러남\n  v2: 3\n};\n\n\n\n\n// ReactDOM: 실제 코드에 JSX를 렌더링할 때 사용됨\nReactDOM.render("),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("App")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("mainName")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("메인"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v(", document.getElementById('root'))\n")])])]),s("h2",{attrs:{id:"개발-환경-세팅"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#개발-환경-세팅"}},[t._v("#")]),t._v(" 개발 환경 세팅")]),t._v(" "),s("ul",[s("li",[t._v("Webpack: 브라우저 위에서 import(require)를 할 수 있게 해주고 자바스크립트 파일들을 하나로 합쳐줌")]),t._v(" "),s("li",[t._v("webpack-dev-server: 별도의 서버를 구축하지 않고도 static 파일을 다루는 웹서버를 열 수 있으며 hot-loader를 통해 코드가 수정될 때마다 자동으로 리로드 되게 할 수 있다.")])]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" webpack "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'webpack'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 웹팩 불러오기")]),t._v("\n\nmodule"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 이 객체를 모듈로 내보낸다 -> 다른 파일에서 이 객체를 모듈로 가져올 수 있다. 나중에 웹팩 실행할 때 웹팩이 이 모듈 불러와서 설정 활용")]),t._v("\n    entry"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./src/index.js'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// entry로부터 require한 파일들을 불러오고, 그 require된 파일에서 또 require한 파일을 불러오고... 이렇게 재귀적으로 모든 파일을 불러온다. 배열로 여러 개 정해줄 수도 있다.")]),t._v("\n\n    output"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// public 폴더에 bundle.js로 저장하겠다")]),t._v("\n        path"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" __dirname "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'/public/'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        filename"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'bundle.js'")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\n    devServer"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 개발 서버 설정")]),t._v("\n        hot"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 파일이 수정될 때마다 리로드")]),t._v("\n        inline"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// hot reload에 필요한 webpack dev server의 클라이언트를 bundle.js에 넣어주겠다")]),t._v("\n        host"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'0.0.0.0'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// server를 listen할 주소. 기본값은 localhost. 근데 localhost는 본인 컴에서만 되고 클라우드에선 안 되니까 이걸로 바꿔준다.")]),t._v("\n        port"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("4000")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 개발 서버의 포트.")]),t._v("\n        contentBase"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" __dirname "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'/public/'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// index파일의 위치")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\n    module"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        loaders"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n                test"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token regex"}},[s("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[t._v("/")]),s("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[t._v("\\.js$")]),s("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[t._v("/")])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n                loader"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'babel'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n                exclude"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token regex"}},[s("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[t._v("/")]),s("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[t._v("node_modules")]),s("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[t._v("/")])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n                query"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n                    cacheDirectory"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n                    presets"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'es2015'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'react'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 모듈 로더를 통해서 es6와 react를 일반 js로 바꿔줌. 여기에 다른 css로더같은걸 넣으면 css도 require해서 사용할 수도 있음. less나 sass로더 쓰면 이를 css로 변환해줌. html minify로더 쓰면 압축.")]),t._v("\n                "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\n    plugins"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("webpack"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("HotModuleReplacementPlugin")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 핫 모듈 리로드도 플러그인 통해서 함.")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("h2",{attrs:{id:"refer"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#refer"}},[t._v("#")]),t._v(" refer")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"http://spoqa.github.io/2015/09/09/react-guide-01.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("원자로를 탐구하는 힙스터를 위한 가이드 (1): React 알아가기"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"http://blog.coderifleman.com/post/122232296024/reactjs%EB%A5%BC-%EC%9D%B4%ED%95%B4%ED%95%98%EB%8B%A41",target:"_blank",rel:"noopener noreferrer"}},[t._v("React.js를 이해하다(1)"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"http://www.bloter.net/archives/233564",target:"_blank",rel:"noopener noreferrer"}},[t._v("페이스북의 인기 오픈소스 기술, ‘리액트’란?"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"http://jlongster.com/Removing-User-Interface-Complexity,-or-Why-React-is-Awesome",target:"_blank",rel:"noopener noreferrer"}},[t._v("Removing User Interface Complexity, or Why React is Awesome"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://medium.com/@RianCommunity/%EB%A6%AC%EC%95%88-%EA%B0%9C%EB%B0%9C-%EC%9D%BC%EA%B8%B0-2-front-end-%EA%B0%9C%EB%B0%9C-react-9f6ccb5b016d",target:"_blank",rel:"noopener noreferrer"}},[t._v("리안 개발 일기 #1: Front-End 개발(React)"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://medium.com/@FourwingsY/do-we-need-redux-ebabf8d2740e",target:"_blank",rel:"noopener noreferrer"}},[t._v("Do we need Redux? (Part1)"),s("OutboundLink")],1)])])])}),[],!1,null,null,null);a.default=e.exports}}]);