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


## Refer

