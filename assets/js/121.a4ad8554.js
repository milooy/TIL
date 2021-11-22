(window.webpackJsonp=window.webpackJsonp||[]).push([[121],{603:function(i,l,v){"use strict";v.r(l);var _=v(54),n=Object(_.a)({},(function(){var i=this,l=i.$createElement,v=i._self._c||l;return v("ContentSlotsDistributor",{attrs:{"slot-key":i.$parent.slotKey}},[v("h1",{attrs:{id:"naver-deview-2015"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#naver-deview-2015"}},[i._v("#")]),i._v(" Naver Deview 2015")]),i._v(" "),v("h2",{attrs:{id:"storm과-elasticsearch를-활용한-로깅-프로그램의-실시간-알람-시스템-구현-이승진"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#storm과-elasticsearch를-활용한-로깅-프로그램의-실시간-알람-시스템-구현-이승진"}},[i._v("#")]),i._v(" Storm과 Elasticsearch를 활용한 로깅 프로그램의 실시간 알람 시스템 구현 (이승진)")]),i._v(" "),v("ul",[v("li",[i._v("알람의 필요성\n"),v("ul",[v("li",[i._v("적절한 시기에 개발자들에게 노티가 있었더라면? (급 에러같은거 나타났을때)")])])]),i._v(" "),v("li",[i._v("네이버 사내 로깅 플랫폼\n"),v("ul",[v("li",[i._v("NELO2")]),i._v(" "),v("li",[i._v("Elasticsearch기반")]),i._v(" "),v("li",[i._v("검색, 대시보드, 크래시분석, 알람 등 기능")])])]),i._v(" "),v("li",[i._v("기존 알람 모듈의 문제점\n"),v("ul",[v("li",[i._v("주기적인 동작 방식")]),i._v(" "),v("li",[i._v("확장성 제약\n"),v("ul",[v("li",[i._v("수집서버와 알람서버가 직접 메세지 주고받음")])])]),i._v(" "),v("li",[i._v("이원화 된 알람 처리")])])]),i._v(" "),v("li",[i._v("Storm\n"),v("ul",[v("li",[i._v("Storm UI, Storm rest API준다.")])])]),i._v(" "),v("li",[i._v("Elasticsearch\n"),v("ul",[v("li",[i._v("Shard: 인데스 데이터의 횡적 분할")]),i._v(" "),v("li",[i._v("Percolator API\n"),v("ul",[v("li",[i._v("검색 vs "),v("strong",[i._v("역검색")])])])])])])]),i._v(" "),v("h2",{attrs:{id:"implementing-deep-learning-using-cudnn-이예하"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#implementing-deep-learning-using-cudnn-이예하"}},[i._v("#")]),i._v(" Implementing Deep learning using cuDNN (이예하)")]),i._v(" "),v("p",[i._v("후...")]),i._v(" "),v("h2",{attrs:{id:"코끼리-냉장고에-집어넣기-실시간-추천엔진을-머신-한-대에-구겨넣기"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#코끼리-냉장고에-집어넣기-실시간-추천엔진을-머신-한-대에-구겨넣기"}},[i._v("#")]),i._v(" 코끼리 냉장고에 집어넣기 - 실시간 추천엔진을 머신 한 대에 구겨넣기")]),i._v(" "),v("ul",[v("li",[i._v("추천엔진 2개로 나뉨\n"),v("ul",[v("li",[i._v("Content-based (어려움)\n"),v("ul",[v("li",[i._v("사전에 현업지식 있어야 함")]),i._v(" "),v("li",[i._v("개별 컨텐츠의 메타데이터도 거의 없고")]),i._v(" "),v("li",[i._v("상품에서 뽑아내기도 어렵다.")])])]),i._v(" "),v("li",[i._v("Collaborate Filtering\n"),v("ul",[v("li",[i._v("모던 추천엔진 많이 씀.")]),i._v(" "),v("li",[i._v("두개로 나뉨\n"),v("ul",[v("li",[v("strong",[i._v("Memory based")]),i._v(" "),v("ul",[v("li",[i._v("오늘 말할 내용!")])])]),i._v(" "),v("li",[i._v("Model based")])])])])])])]),i._v(" "),v("li",[i._v("Memory based\n"),v("ul",[v("li",[i._v("얼마나 닮았냐를 보고 닮았으면 다른 이가 좋아한 것을 추천")]),i._v(" "),v("li",[i._v("Jaccard Similarity\n"),v("ul",[v("li",[i._v("전체중에 겹치는 비율을 측정")]),i._v(" "),v("li",[i._v("사람이 많을 수록 비교해야 할 쌍이 늘어난다.")]),i._v(" "),v("li",[i._v("Too many combinations")])])]),i._v(" "),v("li",[i._v("pre-clusturing")]),i._v(" "),v("li",[i._v("Locality sensitive hashing (LSH)\n"),v("ul",[v("li",[i._v("적은 버킷에 일부러 clusturing되게 뿌린다면?")]),i._v(" "),v("li",[i._v("계산할 녀석과 비슷한 애들이 있는 cluster를 찾고 n을 줄이고 상세한 비교를 한다.")]),i._v(" "),v("li",[i._v("원본이 조금만 닮아도 결과값들도 닮아야 하는 특수 hash function이 필요.")])])]),i._v(" "),v("li",[i._v("MinHash\n"),v("ul",[v("li",[i._v("Jaccard similarity를 유지하는 타입의 LSH")])])]),i._v(" "),v("li",[i._v("일종의 dimension reduction\n"),v("ul",[v("li",[i._v("e.g. 6차원 -> 3차원")])])])])]),i._v(" "),v("li",[i._v("클러스터를 쓴다\n"),v("ul",[v("li",[i._v("장점: 후보를 한정한다 - speed gain")]),i._v(" "),v("li",[i._v("단점: 후보를 한정한다 - quality loss")])])]),i._v(" "),v("li",[i._v("매우 인기있는 아이템\n"),v("ul",[v("li",[i._v("커어어다랗다.")]),i._v(" "),v("li",[i._v("클릭스트림의 길이를 어떻게든 해야 등장할 때마다 퍼포먼스루즈를 막는다.")]),i._v(" "),v("li",[i._v("해결방법: 클릭스트림 원본 말고 짧은 대체본.\n"),v("ul",[v("li",[i._v("-> 대체본끼리 비교해 바로 유사도를 알아야 한다.")]),i._v(" "),v("li",[i._v("==> MinHash")])])])])]),i._v(" "),v("li",[i._v("다량의 건수를 in-memory안에 fit가능")]),i._v(" "),v("li",[i._v("대량 배치\n"),v("ul",[v("li",[i._v("새로운 click일어나면 기존 계산 signature버리고 다시 계산해야 하나?")]),i._v(" "),v("li",[i._v("minhash는 min함수의 chane이라는 좋은 성질")]),i._v(" "),v("li",[i._v("새 데이터가 들어오면 누적 정용하면 된다.")])])]),i._v(" "),v("li",[i._v("분할 상환\n"),v("ul",[v("li",[i._v("거대한 한방이 아니고 자잘한 업데이트로!")])])])])])}),[],!1,null,null,null);l.default=n.exports}}]);