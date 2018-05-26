# Redux saga
https://mskims.github.io/redux-saga-in-korean/
https://redux-saga.js.org/docs/introduction/BeginnerTutorial.html

## 리덕스 사가란?
- 잔망스러운 비동기 동작(데이터 fetching, 브라우저 캐시 접근)을 쉽게 만들기
- 사가: 애플리케이션에서 사이드 이펙트만을 담당하는 별도 쓰레드.
- redux saga: 리덕스 미들웨어라서 쓰레드가 메인 A에서 일반적인 리덕스 액션을 통해 실행되고, 멈추고 취소. 그리고 모든 리덕스 A의 상태에 접근 가능하고 액션 디스패치

## 예제
`sagas.js`
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

// 사가! takeEvery는 USER_FETCH_REQUESTED액션이 일어날 때 fetchUser를 실행(동시 실행 가능)한다.
function* mySaga() {
  yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
}

// 사가! takeEvery는 USER_FETCH_REQUESTED액션이 일어날 때 fetchUser를 실행(동시 실행 불가능. 항상 최근것만 실행)한다.
function* mySaga() {
  yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
}

export default mySaga;
```
- 사가: USER_FETCH_REQUESTED액션 듣고 있으며 유저데이터fetchAPI 호출할것
- 사용하려면 SagaMiddleware를 store에 연결해야 함.
