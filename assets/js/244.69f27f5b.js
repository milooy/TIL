(window.webpackJsonp=window.webpackJsonp||[]).push([[244],{486:function(t,l,v){"use strict";v.r(l);var _=v(54),i=Object(_.a)({},(function(){var t=this,l=t.$createElement,v=t._self._c||l;return v("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[v("h1",{attrs:{id:"flux"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#flux"}},[t._v("#")]),t._v(" Flux")]),t._v(" "),v("h2",{attrs:{id:"flux의-해결"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#flux의-해결"}},[t._v("#")]),t._v(" Flux의 해결")]),t._v(" "),v("ul",[v("li",[t._v("flux: 애플리케이션에서 데이터를 취급하기 위한 패턴")]),t._v(" "),v("li",[t._v("facebook에서 알림 버그. 메세지 클릭해도 1이 이따가 또 나타남. 고쳐도 다음 릴리즈에 다른 코드때문에 다시 버그 살아남")]),t._v(" "),v("li",[t._v("단방향 데이터 흐름(unidirectional data flow)\n"),v("ul",[v("li",[t._v("action > dispatcher > store > view 단방향인데 view에서 action으로 화살표 보냄")])])])]),t._v(" "),v("h2",{attrs:{id:"flux-캐릭터"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#flux-캐릭터"}},[t._v("#")]),t._v(" Flux 캐릭터")]),t._v(" "),v("ul",[v("li",[v("strong",[t._v("액션 생성자(Action creater)")]),t._v(" "),v("ul",[v("li",[t._v("언제든 애플리케이션의 상태를 변경하거나 뷰를 업데이트하고 싶다면 액션을 생성해야 함")]),t._v(" "),v("li",[t._v("무슨 메세지를 보낼지 알려주면 액션 생성자는 나머지 시스템이 이해할 수 있는 포맷으로 바꿔준다.")]),t._v(" "),v("li",[t._v("type(e.g. MESSAGE_CREATE)과 payload를 포함한 액션을 생성.")]),t._v(" "),v("li",[t._v("모든 가능한 액션들을 아는 시스템을 가짐으로서 얻는 효과: 새로운 개발자가 프로젝트에 들어와서 행동 생성자 파일을 열면 시스템에서 제공하는 API 전체 - 모든 가능한 상태변경 - 을 바로 확인 가능")]),t._v(" "),v("li",[t._v("액션 생성자가 액션 메세지를 생성한 뒤에는 디스패쳐로 넘겨줌")])])]),t._v(" "),v("li",[v("strong",[t._v("디스패쳐(Dispatcher)")]),t._v(" "),v("ul",[v("li",[t._v("콜백이 등록되어 있는 곳. 전화교환대에서 교환원.")]),t._v(" "),v("li",[t._v("액션을 보낼 필요가 있는 모든 store를 가지고 있고, 액션 생성자로부터 액션이 넘어오면 여러 스토어에 액션을 보냄")]),t._v(" "),v("li",[t._v("동기적으로 실행되어서 비동기로 꼬이는 문제가 덜 일어남.")]),t._v(" "),v("li",[t._v("다른 아키텍처들과는 조금 다른점: 액션 타입과 관계없이 등록된 모든 스토어로 보내짐.\n"),v("ul",[v("li",[t._v("스토어가 특정 액션만 subscribe하지 않고 모든 액션을 받은 뒤 처리할지 말지 결정")])])])])]),t._v(" "),v("li",[v("strong",[t._v("스토어")]),t._v(" "),v("ul",[v("li",[t._v("애플리케이션 내의 모든 상태와 그와 관련된 로직을 가지고 있다.")]),t._v(" "),v("li",[t._v("모든 것을 관리하는 정부관료와 같음. 모든 상태 변경은 반드시 스토어에 의해서 결정되어야 하며, 상태 변경을 위한 요청을 스토어에 직접 보낼 수 없다.")]),t._v(" "),v("li",[t._v("setter가 존재하지 않으므로, 상태 변경을 요청하기 위해선 반드시 모든 정해진 절차(액션 생성자/디스패쳐 파이프라인)를 따라야 함.")]),t._v(" "),v("li",[t._v("스토어의 내부에서는 보통 switch statement를 사용해서 처리할 액션과 무시할 액션을 결정")]),t._v(" "),v("li",[t._v("스토어에 상태 변경을 완료하고 나면 change event 를 내보내서 controller view에 상태가 변경되었다는 것을 알려줌")])])]),t._v(" "),v("li",[v("strong",[t._v("The controller view와 The view")]),t._v(" "),v("ul",[v("li",[v("code",[t._v("뷰")]),t._v("는 상태를 가져오고 유저에게 보여주고 입력받을 화면을 렌더링하는 역할 맡음\n"),v("ul",[v("li",[t._v("발표자와 같음. 애플리케이션 내부에 대해선 아는게 없지만 받은 데이터를 처리해서 HTML로 어떻게 바꾸는지 앎")])])]),t._v(" "),v("li",[v("code",[t._v("컨트롤러 뷰")]),t._v("는 스토어와 뷰 사이의 중간관리자같은 역할. 상태가 변경되었을 때 스토어가 그걸 cv에 알려주면 자기 아래에 있는 모든 뷰에게 상태 넘김")])])])]),t._v(" "),v("h2",{attrs:{id:"어떻게-함께-동작"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#어떻게-함께-동작"}},[t._v("#")]),t._v(" 어떻게 함께 동작?")]),t._v(" "),v("ul",[v("li",[v("p",[t._v("준비")]),t._v(" "),v("ul",[v("li",[t._v("애플리케이션이 초기화할 때 딱 한번 준비과정")]),t._v(" "),v("li",[v("ol",[v("li",[t._v("스토어는 디스패쳐에 액션이 들어오면 알려달라 말해둠")])])]),t._v(" "),v("li",[v("ol",{attrs:{start:"2"}},[v("li",[t._v("컨트롤려 뷰는 스토어에게 최신 상태를 물음")])])]),t._v(" "),v("li",[v("ol",{attrs:{start:"3"}},[v("li",[t._v("스토어가 cv에 상태를 주면 렌더링하기 위해 모든 자식 뷰에게 상태를 넘김")])])]),t._v(" "),v("li",[v("ol",{attrs:{start:"4"}},[v("li",[t._v("cv는 스토어에게 상태가 바뀔 때 알려달라고 다시 부탁")])])])])]),t._v(" "),v("li",[v("p",[t._v("데이터 흐름")]),t._v(" "),v("ul",[v("li",[t._v("준비과정이 끝나면 애플리케이션은 유저 입력을 위한 준비 완료. 사용자의 입력으로 인한 액션이 생겼을 경우")]),t._v(" "),v("li",[v("ol",[v("li",[t._v("뷰는 액션 생성자에게 액션을 준비하라 말함")])])]),t._v(" "),v("li",[v("ol",{attrs:{start:"2"}},[v("li",[t._v("액션 생성자는 액션을 포맷에 맞게 만들어 디스패쳐에 넘김")])])]),t._v(" "),v("li",[v("ol",{attrs:{start:"3"}},[v("li",[t._v("디스패처는 들어온 액션의 순서에 따라 알맞은 스토어로 보냄. 각 스토어는 모든 액션을 받게 되지만 필요한 액션만을 골라서 상태를 필요에 맞게 변경")])])]),t._v(" "),v("li",[v("ol",{attrs:{start:"4"}},[v("li",[t._v("상태 변경 완료되면 스토어는 자신을 subscribe하고 있는 cv에게 그 사실을 알림")])])]),t._v(" "),v("li",[v("ol",{attrs:{start:"5"}},[v("li",[t._v("연락을 받은 cv는 스토어에게 변경ㅎ된 상태를 요청")])])]),t._v(" "),v("li",[v("ol",{attrs:{start:"6"}},[v("li",[t._v("스토어가 새로운 상태를 넘겨주면 cv는 자신 아래의 모든 뷰에게 새로운 상태에 맞게 렌더링하라고 알림")])])])])]),t._v(" "),v("li",[v("p",[v("a",{attrs:{href:"http://bestalign.github.io/2015/10/06/cartoon-guide-to-flux/",target:"_blank",rel:"noopener noreferrer"}},[t._v("flux 로의 카툰 안내서"),v("OutboundLink")],1)])])])])}),[],!1,null,null,null);l.default=i.exports}}]);