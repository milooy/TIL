# Redux saga

https://mskims.github.io/redux-saga-in-korean/
https://redux-saga.js.org/docs/introduction/BeginnerTutorial.html

## 리덕스 사가란?
- 잔망스러운 비동기 동작(데이터 fetching, 브라우저 캐시 접근)을 쉽게 만들기
- 사가: 애플리케이션에서 사이드 이펙트만을 담당하는 별도 쓰레드.
- redux saga: 리덕스 미들웨어라서 쓰레드가 메인 A에서 일반적인 리덕스 액션을 통해 실행되고, 멈추고 취소. 그리고 모든 리덕스 상태에 접근 가능하고 액션 디스패치

## 예제

1. 버튼을 눌렀을 때 `USER_FETCH_REQUEST`란 액션을 `dispatch`한다 (paylod로 userId도 보내구)
```js
class UserComponent extends React.Component {
    onButtonClicked() {
        const {userId, dispatch} = this.props
        dispatch({type: 'USER_FETCH_REQUESTED', payload: {userId}})
    }
}

```

2.  사가는 `USER_FETCH_REQUEST`를 계속 지켜보다가 이게 불리면 데이터를 fetch하는 api를 부를것이다
```js
// sagas.js
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import Api from '...'

// (밑에 사가에서 불릴 함수)
function* fetchUser(action) {
   try {
      const user = yield call(Api.fetchUser, action.payload.userId);
      yield put({type: "USER_FETCH_SUCCEEDED", user: user});
   } catch (e) {
      yield put({type: "USER_FETCH_FAILED", message: e.message});
   }
}

// 사가! takeEvery는 USER_FETCH_REQUESTED액션이 일어날 때 fetchUser를 실행(동시 실행 가능)한다.
// USER_FETCH_REQUEST가 불리는걸 사가가 듣고있다가, fetchUser함수 실행. 동시 실행 가능
function* mySaga() {
  yield takeEvery("USER_FETCH_REQUEST", fetchUser);
}

// USER_FETCH_REQUEST가 불리는걸 사가가 듣고있다가, fetchUser함수 실행. takeLatest는 동시 실행 불가능
function* mySaga() {
  yield takeLatest("USER_FETCH_REQUEST", fetchUser);
}

export default mySaga;
```
- 사가: USER_FETCH_REQUESTED액션 듣고 있으며 유저데이터fetchAPI 호출할것
- 사용하려면 SagaMiddleware를 store에 연결해야 함.
