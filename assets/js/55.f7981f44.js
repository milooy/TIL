(window.webpackJsonp=window.webpackJsonp||[]).push([[55],{520:function(t,a,s){"use strict";s.r(a);var n=s(54),e=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"일일코딩-32-two-sum"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#일일코딩-32-two-sum"}},[t._v("#")]),t._v(" [일일코딩 #32] Two Sum")]),t._v(" "),s("h2",{attrs:{id:"question"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#question"}},[t._v("#")]),t._v(" Question")]),t._v(" "),s("p",[s("a",{attrs:{href:"https://leetcode.com/problems/two-sum/",target:"_blank",rel:"noopener noreferrer"}},[t._v("링크"),s("OutboundLink")],1),t._v("\nGiven an array of integers, return indices of the two numbers such that they add up to a specific target.")]),t._v(" "),s("p",[t._v("You may assume that each input would have exactly one solution, and you may not use the same element twice.")]),t._v(" "),s("p",[t._v("Example:\nGiven nums = [2, 7, 11, 15], target = 9,")]),t._v(" "),s("p",[t._v("Because nums[0] + nums[1] = 2 + 7 = 9,\nreturn [0, 1].")]),t._v(" "),s("h2",{attrs:{id:"my-answer"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#my-answer"}},[t._v("#")]),t._v(" My Answer")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("twoSum")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("nums"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" target")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" i "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("nums"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" lastIdx "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" nums"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("lastIndexOf")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("target "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" nums"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("i"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("lastIdx "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Array")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("i"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" lastIdx"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("p",[t._v("lastIndexOf로 풀었다. 처음엔 Array 초기화 할 때 "),s("code",[t._v("var answerArr = []")]),t._v("로 해서 "),s("code",[t._v("answerArr.push(a, b)")]),t._v("로 넣었는데 코드 줄인다고 위처럼 바꿨더니 성능이 조금 더 줄었다. 변수 할당보다 new Array 로 하는게 더 오래걸리나보다.")]),t._v(" "),s("h2",{attrs:{id:"other-s-answer"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#other-s-answer"}},[t._v("#")]),t._v(" Other's answer")]),t._v(" "),s("p",[t._v("3가지 방법을 제시함.")]),t._v(" "),s("ol",[s("li",[t._v("브루트 포스: 포문 2번 돌면서 뺀 값이 있나 찾기")]),t._v(" "),s("li",[t._v("Two pass hash table: 잘 이해 안감 왜 굳이?")]),t._v(" "),s("li",[t._v("One-pass hash table: 내가 푼 방법. 뺀 값이 map에 있나 확인")])])])}),[],!1,null,null,null);a.default=e.exports}}]);