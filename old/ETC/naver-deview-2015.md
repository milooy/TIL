## Storm과 Elasticsearch를 활용한 로깅 프로그램의 실시간 알람 시스템 구현 (이승진)
- 알람의 필요성
    + 적절한 시기에 개발자들에게 노티가 있었더라면? (급 에러같은거 나타났을때)
- 네이버 사내 로깅 플랫폼
    + NELO2
    + Elasticsearch기반
    + 검색, 대시보드, 크래시분석, 알람 등 기능 
- 기존 알람 모듈의 문제점
    + 주기적인 동작 방식
    + 확장성 제약
        * 수집서버와 알람서버가 직접 메세지 주고받음
    + 이원화 된 알람 처리
- Storm
    + Storm UI, Storm rest API준다. 
- Elasticsearch
    + Shard: 인데스 데이터의 횡적 분할
    + Percolator API
        * 검색 vs **역검색**

## Implementing Deep learning using cuDNN (이예하)
후...

## 코끼리 냉장고에 집어넣기 - 실시간 추천엔진을 머신 한 대에 구겨넣기
- 추천엔진 2개로 나뉨
    + Content-based (어려움)
        * 사전에 현업지식 있어야 함
        * 개별 컨텐츠의 메타데이터도 거의 없고 
        * 상품에서 뽑아내기도 어렵다. 
    + Collaborate Filtering
        * 모던 추천엔진 많이 씀.
        * 두개로 나뉨
            - **Memory based**
                + 오늘 말할 내용!
            - Model based
- Memory based
    + 얼마나 닮았냐를 보고 닮았으면 다른 이가 좋아한 것을 추천
    + Jaccard Similarity
        + 전체중에 겹치는 비율을 측정
        + 사람이 많을 수록 비교해야 할 쌍이 늘어난다.
        + Too many combinations
    + pre-clusturing
    + Locality sensitive hashing (LSH)
        - 적은 버킷에 일부러 clusturing되게 뿌린다면?
        - 계산할 녀석과 비슷한 애들이 있는 cluster를 찾고 n을 줄이고 상세한 비교를 한다.
        - 원본이 조금만 닮아도 결과값들도 닮아야 하는 특수 hash function이 필요. 
    + MinHash
        * Jaccard similarity를 유지하는 타입의 LSH
    + 일종의 dimension reduction 
        * e.g. 6차원 -> 3차원
- 클러스터를 쓴다
    + 장점: 후보를 한정한다 - speed gain
    + 단점: 후보를 한정한다 - quality loss
- 매우 인기있는 아이템
    + 커어어다랗다.
    + 클릭스트림의 길이를 어떻게든 해야 등장할 때마다 퍼포먼스루즈를 막는다.
    + 해결방법: 클릭스트림 원본 말고 짧은 대체본.
        * -> 대체본끼리 비교해 바로 유사도를 알아야 한다.
        * ==> MinHash
- 다량의 건수를 in-memory안에 fit가능
- 대량 배치
    + 새로운 click일어나면 기존 계산 signature버리고 다시 계산해야 하나?
    + minhash는 min함수의 chane이라는 좋은 성질 
    + 새 데이터가 들어오면 누적 정용하면 된다.
- 분할 상환
    + 거대한 한방이 아니고 자잘한 업데이트로!
