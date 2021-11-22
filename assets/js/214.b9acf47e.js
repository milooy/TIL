(window.webpackJsonp=window.webpackJsonp||[]).push([[214],{569:function(t,s,a){"use strict";a.r(s);var r=a(54),e=Object(r.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"_2020-09"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2020-09"}},[t._v("#")]),t._v(" 2020.09")]),t._v(" "),a("h2",{attrs:{id:"_0903"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_0903"}},[t._v("#")]),t._v(" 0903")]),t._v(" "),a("h3",{attrs:{id:"javascript-번들러"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#javascript-번들러"}},[t._v("#")]),t._v(" JavaScript 번들러")]),t._v(" "),a("p",[t._v("https://wormwlrm.github.io/2020/08/12/History-of-JavaScript-Modules-and-Bundlers.html")]),t._v(" "),a("ul",[a("li",[t._v("재밌는 주제 많네... 시간내서 조금씩 보자 https://web.dev/live/")])]),t._v(" "),a("h4",{attrs:{id:"번들러-종류"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#번들러-종류"}},[t._v("#")]),t._v(" 번들러 종류")]),t._v(" "),a("ul",[a("li",[t._v("ES6 전\n"),a("ul",[a("li",[t._v("CommonJS")]),t._v(" "),a("li",[t._v("AMD")]),t._v(" "),a("li",[t._v("UMD")]),t._v(" "),a("li",[t._v("node.js")]),t._v(" "),a("li",[t._v("Browserify")]),t._v(" "),a("li",[t._v("RequireJS")])])]),t._v(" "),a("li",[t._v("ES6 이후\n"),a("ul",[a("li",[t._v("Grunt, Gulp")]),t._v(" "),a("li",[t._v("Google Closure Compiler")]),t._v(" "),a("li",[t._v("Webpack")]),t._v(" "),a("li",[t._v("Babel")]),t._v(" "),a("li",[t._v("Rollup")]),t._v(" "),a("li",[t._v("Parcel")]),t._v(" "),a("li",[t._v("TypeScript, CoffeScript")]),t._v(" "),a("li",[t._v("SystemJS")])])])]),t._v(" "),a("h4",{attrs:{id:"모듈-시스템"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#모듈-시스템"}},[t._v("#")]),t._v(" 모듈 시스템")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('<html>\n\n\n  <script src="/src/foo.js"><\/script>\n  <script src="/src/bar.js"><\/script>\n</html>\n')])])]),a("ul",[a("li",[t._v("문제: 스크립트를 로드한 전역 컨텍스트에서 각 모듈간의 충돌 발생. 같은 변수명 사용 등. 로드 순서도 중요해져부림.")]),t._v(" "),a("li",[t._v("08년도에 V8엔진(브라우저 외부에서도 JS실행 가능)공개되고, 이를 이용해 서버사이드에서 JS활용하자는 아이디어 제시. 그러다보니 모듈화 필요성 부각. 09년 기점으로 모듈 표준화하기 위한 움직임.\n"),a("ul",[a("li",[t._v("CommonJS\n"),a("ul",[a("li",[t._v("JS")])])]),t._v(" "),a("li",[t._v("AMD(Asynchronous Module Definition)")])])])]),t._v(" "),a("h2",{attrs:{id:"_0915"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_0915"}},[t._v("#")]),t._v(" 0915")]),t._v(" "),a("p",[t._v("master, develop/ 빼고 모든 브랜치 제거")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 머지된 친구들만 날리고 싶다면")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" branch --merged "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("grep")]),t._v(" -v "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"\\*"')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("grep")]),t._v(" -v master "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("grep")]),t._v(" -v develop "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("xargs")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" branch -d\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 머지여부 상관없이 날리고 싶다면")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" branch "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("grep")]),t._v(" -v "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"\\*"')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("grep")]),t._v(" -v master "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("grep")]),t._v(" -v develop "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("xargs")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" branch -d\n")])])])])}),[],!1,null,null,null);s.default=e.exports}}]);