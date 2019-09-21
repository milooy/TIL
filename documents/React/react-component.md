# React component

## React component란?
- 함수다.
- HOC?
    + HOC는 더 이상 좋은 접근법이 아닙니다
    + [Making sence of react component](https://medium.com/@dan_abramov/making-sense-of-react-hooks-fdbde8803889) 를 보면 왜 HOC 안쓰는지 이해할 수 있다
- 잘 만든 리액트 앱이란?
    + 작고 단단한 컴포넌트를 만들고
    + 이렇게 만들어진 컴포넌트를 유기적으로 연결
- JoinForm.js
    + https://stackblitz.com/edit/react-bootcamp-form?file=JoinForm.js
    + 문제:
        * 
    + 특징
        * DOM을 직접 접근함
        * render가 돌지 않는다
        * state가 없음 그래서 render가 초기 1회만 실행됨
        * 근디 state가 없기 때문에 reset이 필요할때 등 value값을 컨트롤 못함
    + 리팩토링
        * input에 value를 state에서 가져와서 넣어준다
    + 첫 번째 예제가 Uncontrolled, 두 번째 예제가 controlled.
        * 리액트에서는 controlled를 추천
- 리팩토링
    + 귀찮으니까 render 안에서 function 만드는 사람들 많은데 그럼 매번 함수 초기화됨

## Uncontrolled vs Controlled component
- Uncontrolled
    + key Props를 이용해 초기화 가능
- Controlled
- PureComponent
    + 이용해 render를 최적화할 수 있다
    + 잘못 사용하면 일반 컴포넌트보다 성능이 나쁘다
    + `class Input extends React.PureComponent `
    + 일반 컴퍼넌트와 다른 점: shallow compare해서 props가 바뀌지 않으면 재랜더를 하지 않는다
    + 상태를 비교하는 로직이 들어가 있기 때문에 로직이 들어가있지 않은 컴포넌트보다 느릴 수 있다.
    + 조심해야 할것
        + 퓨어컴포넌트에 onchange에 익명함수 넘기면 js는 이 함수들은 다 다른 함수라고 생각하기 때문에 매번 렌더 해버림
        + 혹은 `foo=bar: baz`처럼 오브젝트 넘길때 오브젝트는 섈로우 비교했을때 서로 다른거라고 나오기 때문에 또 매번 렌더링 하게 됨


## React portal
- `ReactDOM.createPortak(렌더될돔, 렌더할컨테이너)`
    + 요거 포탈은 getElementById등으로 DOM을 직접 넘기는 수밖에 없는가
- App 컴포넌트 안에 Dialog 컴포넌트를 집어넣었는데도 아예 body 밖으로 뺄 수 있다
- 언제 사용?
    + 논리적으로는 하위 컴포넌트지만 시각적으로는 상위에 위치할 때
    + Dialog, Tooltip
    + ant design도 포탈 이용해서 많이 구현되어있음. 필요한 경우 많아서 현업에서 많이 사용

## Component composition
- OOP는 상속 많이 쓰지만, 리액트에서는 Composition(합성)으로 비슷한 개념을 구현
- https://reactjs.org/docs/composition-vs-inheritance.html
- 리액트 노드를 넘겨받기
- children props로 넘기면서 composition하기
- Composition specialization
    + 필요한 컴포넌트들은 PureComponent
    + 합성을 지원하는 컴포넌트의 성능 최적화를 위해 specialization 기법을 사용할 수 있다
    + https://reactjs-kr.firebaseapp.com/docs/composition-vs-inheritance.html#%ED%8A%B9%EC%88%98%ED%99%94-specialization

## Functinal component & Hook
- 컴포넌트는 근본적으로 함수다
- Input을 React.memo로 감싸기
    + Input이 같을 때 output이 같다는걸 이용해서
    + input이 들어올때마다 계산한 결과를 저장하고, 똑같은 인풋이 오면 저장한걸 반환
    + React.memo는 메모이제이션을 하는거냐? 또 그렇지도 않음
- useRef 훅도 있넹!
- useEffect: componentDidMount, componentDidUpdate, componentWillUnmount 과 같은 단계
- Custom hook
    + 로직의 재사용
- Hook은 항상 컴포넌트의 Top level scope에서 호출되어야 함
    + 즉 hook을 if, for, 콜백 안에서 사용하면 안됨.
    + render 호출시마다 항상 같은 순서로 hook을 호출해야 하기 때문
    + eslint
- Hook을 React 함수(함수형 컴포넌트, custom hook)이 아닌 다른 곳에서 호출해서는 안됨
- Hook으로 거의 모든 컴포넌트를 클래스 없이 구현할 수 있다.
    + React.memo는 함수형 컴포넌트의 PureComponent다
    + useCallback, useMemo를 통해 렌더링 최적화를 할 수 있다
    + useRef는 렌더링에 영향을 미치지 않는 값을 보관할 용도로 사용
    + useEffect는 클래스 컴포넌트의 lifecycle hook과 유사
    + 이미 나와있는 Hook을 통해 직접 Hook 제작 가능
    + 이렇게 만든 HOok은 로직을 추상화하고, 재사용하는데 유리

 
## Misc
- Misc
    + 안녕하세요 이현섭이라구요
    + 뽐(form)을 잘 짜기 뽐 ㅋㅋㅋㅋㅋㅋ, 깞, 마이크 때문인가
    + 모든 코드 예제를 stackblitz로 준거 좋네
    + 쫒아오기 힘든 분이 있다면 말씀해주세요 하는데 말할 방법 업음 -> sli.do 하면 좋겠음
    + 라이브코딩도 내 모니터에서 봤으면 좋겠다
    + 강의 구성도 작고 단단한 개념들을 유기적으로 묶어서 전달해주셨넹
    + 성능에 문제가 있다면 그건 리액트 포털의 문제가 아니라 본인의 문제일 가능성이 있습니다 (아 아니 본인의 코드 문제)
- 질문
    + form library 쓰시는거 있나요