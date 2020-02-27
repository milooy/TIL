# Redux

## Redux
- Redux가 요구하는 것
    + 1. 앱의 상태를 평범한 객체와 배열로 만드삼
    + 2. 변경사항을 평범한 객체로 만드삼
    + 3. 변경을 다루는 로직을 순수함수로 만드삼
- 이 요구하는 것 덕의 장점
    + initialData를 서버에서 받아 앱을 시작할때 채우는게 편함
    + 사용자의 액션을 직렬화해서 자동으로 버그리포트에 첨부 -> 유림 덧: 액션이 모여있으니까 redux-beacon 등에서 원하는 곳에 액션 쏘기 편하긴 하더라
    + 개발할 때 상태 내역 사이를 오고가고 액션 내역에서 현재 상태를 다시 계산하는 일을 TDD로 할 수 있음
+ 리듀서란?
    * `Re`act state pro`ducer`. 리액트의 상태를 만들어주는 생성자. [아이디어 참고](https://devlog.jwgo.kr/2018/08/23/redux-which-is-weird-term/)
    * 어플리케이션의 state를 반환하는 함수
        - 여러 reducer를 만들어서 combineReducers라는 함수로 묶어서 rootReducer라고 쓴다.
- 리덕스의 장점
    + 손에 익숙한 사람은 편하기도 하고, 미들웨어같은 강력한 기능은 Context API로 대체할 수 없다.
+ 상태관리 라이브러리를 사용해야 하는 이유?
    * 1. 복잡한 상태 업데이트 로직들을 컴포넌트에서 뜯어내기. 이를 모듈화 하여 높은 유지보수성.
    * 2. 더 쉬운 상태관리 (드릴링 피하기)

```jsx
import React, { Component } from 'react';

// 카운터 리듀서. state와 action을 받는다. INCREMENT액션이 오면 state.value를 +1조작해서 넘기고 vise versa. 요약하자면 넘긴 action이름에 따라 미리 정해둔 규칙대로 넘겨준 state를 조작해서 반환.
const counter = (state = { value: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { value: state.value + 1 };
    case 'DECREMENT':
      return { value: state.value - 1 };
    default:
      return state;
  }
}

class Counter extends Component {
  // 지역 state 초기화. state = {value: 0}
  state = counter(undefined, {});
  
  // 액션 이름을 받고 지역 state를 조작하는 reducer를 콜함
  dispatch(action) {
    this.setState(prevState => counter(prevState, action));
  }

  // increment액션. INCREMENT란 타입의 액션을 dispatch한다.
  increment = () => {
    this.dispatch({ type: 'INCREMENT' });
  };

  decrement = () => {
    this.dispatch({ type: 'DECREMENT' });
  };
  
  render() {
    return (
      <div>
        {this.state.value}
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
      </div>
    )
  }
}
```

### 개념 정의
- 액션: 상태 변화가 필요할때 호출. 객체로 표현. type이 필수로 들어가고 외에는 맘대로
```json
{
  type: "ADD_TODO",
  data: {
    id: 0,
    text: "리덕스 배우기"
  }
}
```
- 액션 생성함수(Action creator)
    + 액션 객체을 만드는 함수. ADD_TODO를 바로 부르는게 아님. addTodo(data)를 부르지.
```js
const addTodo = (data) => ({
    type: "ADD_TODO",
    data,
})
```
- 리듀서
    + 변화를 일으키는 함수. state 반환.
```js
const reducer = (state, action) => {
    // 상태 업데이트 로직
    return alteredState;
}
```
- 스토어 (store)
    + 리덕스에서는 한 앱당 하나의 스토어 만듦. 스토어 안에는 state와 reducer가 있고, 추가적으로 몇개의 내장함수가 있다.
- 디스패치(dispatch)
    + 스토어의 내장함수. 액션을 '발생시키는' 것. 
    + `dispatch(action)`로 호출하면 스토어는 리듀서를 실행시켜 해당 액션을 처리하는 로직이 있다면 새 상태 만들어줌
+ 구독 (subscribe)
    * 역시 스토어의 내장함수. 함수 형태의 값을 파라미터로 받음
    * 여기 함수를 전달하면 액션이 디스패치 될때마다 전달해준 함수가 호출됨

## Redux middleware
- 미들웨어란?
    + 액션이 dispatch되었다----> 리듀서에서 state를 조작한다
        * 이 사이에 사전에 지정된 작업 하는거임 (액션과 리듀서의 중간자)
* 미들웨어가 할 수 있는 작업 예시
    - 단순하게 액션을 콘솔에 찍기
    - 전달받은 액션에 기반해서 이걸 아예 취소시키거나 다른 종류의 액션을 추가적으로 dispatch
- Redux thunk
```js
import * as api from 'api';
import {loginRequest, loginSuccess, loginFailure} from './loginActions';

export const loginThunk = (name, password) => (dispatch, getState)=> {
    dispatch(loginRequest());
    try{
      api.login(name, password);
    }
    catch(err){
      dispatch(loginFailure(err));
      return;
    }
    dispatch(loginSuccess())
};
```
    -  첫번째 함수의 parameters들은 thunk 호출시 추가적인 정보 넘기기 위함
    -  두번째 함수의 dispatch, getState는 thunk가 제공.
    -  액션 콜하고 thunk라는 함수에서 필요한 작업을 하고 원하는 다른 액션을 dispatch할 수 있다.
    -  thunk란, 특정 작업을 나중에 하도록 미루기 위해서 함수형태로 감싼것을 말함
    -  redux thunk는 함수를 생성하는 액션 생성함수를 작성하게 해줌 => 보통 액션생성자는 그냥 하나의 액션객체를 생성할 뿐이지만 redux thunk를 통해 만든 액션생성자는 그 내부에서 여러가지 작업 할 수 있음. 여기서 네트워크 요청 해도 무방! 안에서 여러번 액션 디스패치 해도 된다.
```js
// 리덕스가 기본으로 쓰는 액션크리에이터 - 특정 액션이 몇초뒤에 실행되거나, 상태에 따라 액션이 무시되게 하려면 이걸로는 부족함.
const actionCreator = (payload) => ({action: 'ACTION', payload});

// Thunk 예제
function incrementIfOdd() {
  return (dispatch, getState) => {
    const { counter } = getState();

    if (counter % 2 === 0) {
      return;
    }

    dispatch(increment());
  };
}
```
- Redux saga
    + saga라고 불리는 순수함수로 복잡한 어플리케이션 로직을 표현할 수 있도록 해줌.
    + sagas는 generator로 구성됨. 
    + 한글 문서: https://mskims.github.io/redux-saga-in-korean/
```js
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import Api from '...'

// worker Saga: USER_FETCH_REQUESTED 액션에 대해 호출될 것입니다
function* fetchUser(action) {
   try {
      const user = yield call(Api.fetchUser, action.payload.userId);
      yield put({type: "USER_FETCH_SUCCEEDED", user: user});
   } catch (e) {
      yield put({type: "USER_FETCH_FAILED", message: e.message});
   }
}

/*
  각각의 dispatch 된 `USER_FETCH_REQUESTED` 액션에 대해 fetchUser를 실행합니다.
  동시에 user를 fetch하는 것을 허용합니다. (takeLatest 쓰면 대기상태껀 취소되고 최근것만 실행)
*/
function* mySaga() {
  yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
}
```
- thunk vs saga
    + Saga장점:
        * thunk와는 달리 콜백 지옥에 빠지지 않으면서 비동기 흐름을 쉽게 테스트할 수 있고 액션을 순수하게 유지한다.
        * thunk는 액션에 응답을 줄 수 없는 반면 Saga는 store를 구독하고 특정 작업이 디스패치될때 saga가 실행되도록 유발 가능

### Refer
- [thunk vs saga](https://velog.io/@dongwon2/Redux-Thunk-vs-Redux-Saga%EB%A5%BC-%EB%B9%84%EA%B5%90%ED%95%B4-%EB%B4%85%EC%8B%9C%EB%8B%A4-)
- [Redux middleware](https://velopert.com/3401#comment-2056)
- [Velopert series](https://velopert.com/3358)
- [You might not need redux](https://medium.com/lunit-engineering/%EB%8B%B9%EC%8B%A0%EC%97%90%EA%B2%8C-redux%EB%8A%94-%ED%95%84%EC%9A%94-%EC%97%86%EC%9D%84%EC%A7%80%EB%8F%84-%EB%AA%A8%EB%A6%85%EB%8B%88%EB%8B%A4-b88dcd175754?)




---

# Redux 카툰 안내서

http://bestalign.github.io/2015/10/26/cartoon-intro-to-redux/index.html
## 왜 flux말고 redux?
스토어 객체 하나에 1. 상태 변환 위한 로직 2. 현재 애플리케이션 상태 두 가지 모두 가지고 있으면 핫 리로딩 시 스토어의 기존 상태도 잃어버리고 event subscription 까지 망가져 버림.

두 기능을 이렇게 분리
1. 애플리케이션 상태만 가짐. 리로딩x, 
2. 모든 상태 변환 로직 가짐. 상태는 안 가지고 있으니 리로딩 o

redux로 바꾸면 서드파티 플러그인이 들어갈 장소도 생김.

## 캐릭터
- **Action creators**
    + 애플리케이션 상태 바꾸고 싶으면 항상 액션 보내야 함 (유일한 방법)
    + flux와는 다르게 dispatcher로 액션 보내지 x, 대신 포맷을 바꾼 뒤 액션을 돌려줌
- **Store**
    + flux는 다수의 스토어 가질 수 있지만 redux는 하나의 스토어만을 가짐.
    + state tree전체를 유지하는 책임.
- **The reducers**
    + 스토어는 액션이 어떤 상태 변화를 만드는지 알 필요가 있을 때 리듀서에게 물음.
    + `Root reducer`는 애플리케이션 상태 객체의 key를 기준삼아 상태를 조각조각 나눔. 이렇게 나눈 상태 조각은 그 조각을 처리할 줄 아는 리듀서로 넘김
    + 상태 객체는 직접 변경 x, 대신 각각 상태 조각 복사 후 변경되고 새로운 상태 객체 하나로 합쳐짐 (redux의 키 아이디어 중 하나)
    + 작은 앱이라면 하나의 리듀서만 가질 수도 있는데, 큰 앱은 많은 리듀서를 가진 리듀서 트리를 사용할 수도 있다.
    + Redux는 리듀서가 트리 모양의 계급구조 안에 존재.
- **the views: smart and dumb components**
    + smart component는 관리자
        * 액션 처리를 책임. smart밑의 dumb컴포넌트가 액션해야 하면 smart가 props통해서 함수 넘겨줘야 한다.
        * 자기 자신의 css style을 가지고 있지 않다
        * 자기 자신의 DOM을 거의 가지고 있지 않다. 대신 DOM 요소들을 관리하는 dumb컴포넌트들을 관리
    + dumb component
        * 액션에 직접 의존성을 가지진 않고 모두 props를 통해 넘겨받음.
        * 그래서 다른 로직 가진 앱에서 재사용될 수 있다.
- **the view layer binding**
    + react-redux가 이 일을 함. 스토어를 뷰에 연결해준다.
    + 뷰 트리를 위한 IT부서와 같음. 모든 컴포넌트를 스토어에 연결하고, 많은 기술적인 세부사항들을 처리해 트리 구조가 세부사항에 신경쓰지 않도록 한다.
    + 세가지 컨셉
        + `provider component`: 컴포넌트 트리를 감싸는 컴포넌트. connect()로 루트 컴포넌트 밑의 컴포넌트들이 스토어에 연결되기 쉽게 만들어줌.
        + `connect()`: react-redux가 제공하는 함수. 컴포넌트에서 애플리케이션 상태 업데이트 받고 싶을 때 쓴다.
        + `selector`: 직접 만들어야 하는 함수. 애플리케이션 상태 안의 어느 부분이 컴포넌트에 props로 필요한 것인지 지정
- **the root component**
    + 모든 리액트 애플리케이션은 루트 컴포넌트를 가짐.
    + C레벨 임원과 같음. 스토어를 생성하고 무슨 리듀서를 사용할지 알려주며 뷰 레이어 바인딩과 뷰를 불러옴.
    + 애플리케이션을 초기화한 뒤로는 거의 하는 일이 없음.

## 어떻게 함께 동작하는가
- 준비
    + 1. 스토어를 준비
        * 루트 컴포넌트: createStore()로 스토어 생성, 무슨 리듀서 사용할지 알려줌, combineReducers()로 다수 리듀서 하나로 묶음.
    + 2. 스토어와 컴포넌트 


> - view layer binding 잘 이해 안감

# Velopert - Redux
https://velopert.com/1225

## Redux란?
- javascript 어플리케이션에서 data-state와 UI-state 관리 도구
- 상태적 데이터 관리가 시간이 흐를 수록 복잡해질 수 있는 SPA에서 유용
- 컴포넌트가 많아지거나 데이터를 교류할 컴포넌트들이 parent-child관계가 아니면 데이터 교류가 복잡해짐
    + 이를 위해선 글로벌 이벤트 시스템을 설정하는 방법이 있음 -> 이게 flux 패턴
- Flux 패턴
    + 시스템에서 `action` 받았을 때 `Dispatcher`가 받은 `Action`들을 통제해서 `Store`에 있는 데이터를 업뎃함. 그리고 변동된 데이터가 있으면 `View`에서 리렌더링
    + 그리고 `View`에서 `Dispatcher`로 `Action`을 보낼 수도 있다. Dispatcher는 작업이 중첩되지 않게 해줌. 어떤 Action이 D를 통해 S에 있는 데이터 처리하고, 그 작업이 끝날 때 까지 다른 Action들을 대기시킴
- Redux: Flux아키텍쳐를 좀 더 편하게 사용할 수 있도록 해주는 라이브러리.
    + store에서 모든 데이터를 담고 있고, 컴포넌트끼리는 직접 교류하지 않고 store중간자를 통해 교류
    + dispatch로 store에 있는 데이터를 업뎃시킴 & subscribe로 해당 컴포넌트에서 store의 특정 데이터의 변동을 주의하고 있다가 변동있으면 바로 반영

## Redux의 3가지 원칙
- `1. Single Source of Truth`
    + redux는 어플리케이션의 state를 위해 단 한개의 store 사용.
    + 모든 state가 한 곳에 있기 때문에 single source of truth
    + flux(여러개의 store )와의 가장 큰 차이
    + 데이터 구조는 개발자 하기 나름. 보통 매우 nested된 구조.
- `2. State is read-only`
    + state를 변경하는 유일한 방법은 어떤 일이 발생했는지 나타내주는 action 객체를 전달
    + 어플리케이션에서 state를 직접 변경 불가. action 이 dispatch(==보낸다)되어야 함
- `3. Changes are made with Pure Functions`
    + state를 변경하기 위해선 action을 dispatch해야 함. 이 과정에서 받아온 action객체를 처리하는 함수를 reducer라고 부름. 
    + action 은 어떤 변화를 일어나야 할 지 알려주는 객체라면, reducer는 그 정보를 받고 애플리케이션의 상태를 어떻게 바꿀지 정의.
    + reducer는 '순수 함수'로만 작성되어야 함.
        * 외부 네트워크 혹은 db에 접근 x
        * return 값은 오직 parameter값에만 의존되어야 함
        * 인수는 변경되지 않아야 함
        * 같은 인수로 실행된 함수는 언제나 같은 결과를 반환해야 함
        * 순수하지 않은 API호출을 하지 말아야 함


# Velopert - Redux with React
https://velopert.com/3346

## 카운터 만들기
- react-redux: redux를 컴포넌트 상에서 더 간편하게 사용할 수 있게 해 주는 라이브러리. 이걸 사용하면 컴포넌트에서 store를 props로 받아오거나, subscribe를 직접 할 필요가 없다
- 디렉토리
    + actions: 액션생성자 파일 저장
    + components: 뷰만을 담당하는 `presentational` 컴포넌트들이 저장
        * 오직 props로만 데이터 가져올 수 있고 store엔 직접적 접근 권한 x
        * 대부분의 경우 state를 갖고있지 않으며, 갖고있을 경우엔 데이터에 관련된 것이 아니라 UI에 관련된 것이어야 함
        * 주로 함수형 컴포넌트로 작성, state를 갖고있어야 하거나 최적화를 위해 lifecycle이 필요해질 때 클래스형 컴포넌트로.
    + containers: store에 접근이 닿는 `container` 컴포넌트들이 저장
        * 주로 내부에 DOM엘리먼트가 직접적으로 사용되는 경우는 X. 감싸는 용도일때만 사용.
        * 스타일을 가지고 있지 않아야 함.
    + reducers: 스토어의 기본상태와 상태의 업데이트를 담당하는 리듀서 파일들이 저장
        * 액션의 type에 따라 변화를 일으키는 함수. 최초변화를 일으키기 전 지니고 있어야 할 초기상태 정의
    + utils: 일부 컴포넌트들에서 공용되는 파일 저장
- `connect`
    + 컨테이너 컴포넌트와 store 연결하기.
    + 파라미터로 컴포넌트에 연결시킬 상태와 액션함수들을 전달해주면 컴포넌트를 리덕스 스토어에 연결시키는 또 다른 함수 반환. 이 과정에서 리턴된 함수 안에 컴포넌트를 파라미터로 전달해주면 리덕스 스토어에 연결된 컴포넌트가 새로 만들어짐.
    + 상태를 연결시킬땐 state, 액션함수를 연결시킬 땐 dispatch를 파라미터로 전달받는 함수를 만들어서 객체를 반환하면 이를 props로 사용할 수 있다.
- 정리
    + div를 누르면 카운터가 올라가게 하고싶다
    + components/counter.js
        * div를 누르면 props.onIncrement를 부른다
        * 그 onIncrement는 타입이 function 이라고 PropTypes.func을 정해준다
        * 그 onIncrement의 defaultProps도 정해준다
    + actions/ActionTypes.js
        * export const INCREMENT = 'INCREMENT
    + actions/index.js
        * INCREMENT를 type으로 가지는 increment()라는 함수를 만듦
        * setColor는 파라미터 color도 같이 받음
    + reducers/index.js
        * initialState를 만든다. number: 0
        * action type을 받아서 새로운 state를 리턴하는 switch문을 만든다.
        * types.INCREMENT면 기존 state에 number: state.number+1을 짬뽕해서 반환
    + containers/CounterContainer.js
        * mapStateToProps로 state.number 받음
        * mapDispatchToProps로 actions.Increment()를 받아옴
    + 즉
        * 카운터 넘버는 reducer의 state에서 가져오고
        * 카운터 올리는 액션은 action에서 가져오면 그 액션을 리듀서가 짬뽕해서 새로운 스테이트를 만들어서 결국 카운터 넘버도 올라가도록 보임

