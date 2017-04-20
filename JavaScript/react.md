## (링크 톺아보기) 리안 개발 일기 #1: Front-End 개발(React)
- 리액트 가볍지 않다
- react-fiber 나오면 성능 개선될수도 (https://github.com/acdlite/react-fiber-architecture)
    + > React Fiber is an ongoing reimplementation of React's core algorithm.
- [next.js](https://velopert.com/3293)
- dispatcher 택배회사는 action을 받은 순서대로 늘어놓는다.
    + flux라는 운송법에는 먼저 보낸 택배가 먼저 배송지에 도착해야 한다는 규율
- 다른 flux구현체들과 비교했을 때, redux의 가장 큰 특징은 전체 앱을 하나의 스토어로 관리한다는 점.
    + 이는 앱을 한층 더 예측가능하게 만들고, 다수 스토어간의 충돌을 방지하고, 시간여행 디버깅을 가능하게 한다.
    + 하지만 대량의 dispatch가 발생하는 상황에서 앱 전체의 병목 현상을 야기할 수 있다
        * Redux-thunk, Redux-saga, Redux-Observable등의 미들웨어가 거의 필수적으로 사용.
- render 메소드가 리턴하는건 돔처럼 생겼지만 사실은 react가 만들어내는 virtual dom

> 그래프QL 써보고싶당!

## (링크 톺아보기) Do we need Redux? (Part1)
- 리덕스가 아니면 불가능한 것: 타임 트래블 디버깅

> 타임트래블 디버깅이 뭘까 나는 안써봄

## refer
- [원자로를 탐구하는 힙스터를 위한 가이드 (1): React 알아가기](http://spoqa.github.io/2015/09/09/react-guide-01.html)
- [React.js를 이해하다(1)](http://blog.coderifleman.com/post/122232296024/reactjs%EB%A5%BC-%EC%9D%B4%ED%95%B4%ED%95%98%EB%8B%A41)
- [페이스북의 인기 오픈소스 기술, ‘리액트’란?](http://www.bloter.net/archives/233564)
- [Removing User Interface Complexity, or Why React is Awesome](http://jlongster.com/Removing-User-Interface-Complexity,-or-Why-React-is-Awesome)
- [리안 개발 일기 #1: Front-End 개발(React)](https://medium.com/@RianCommunity/%EB%A6%AC%EC%95%88-%EA%B0%9C%EB%B0%9C-%EC%9D%BC%EA%B8%B0-2-front-end-%EA%B0%9C%EB%B0%9C-react-9f6ccb5b016d)
- [Do we need Redux? (Part1)](https://medium.com/@FourwingsY/do-we-need-redux-ebabf8d2740e)
