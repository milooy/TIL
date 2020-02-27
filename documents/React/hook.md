# React: Hook

## Hook이란
- React 16.8부터 들어옴. State나 다른 피쳐를 클래스 없이 사용하게 해줌.

```html
import React, { useState } from 'react';

function Example() {
  // useState으로 count랑 setCount 
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

- 점진적으로 적용할 수 있다.
- 클래스를 없애겠다는건 아님
- UI의 상태 관련 동작 및 side effects를 캡슐화하는 가장 간단한 방법. React에서 처음 도입되ㅓ, Vue나 svelte같은 다른 프레임워크에 광범위하게 도입되었다. 일반적 함수형 js에서도 씀.
- Hooks쓰면 this의 고통에서 벗어나는 대신 클로저가 등장한다

## Hook 만든 동기

### 1. stateful한 로직을 컴포넌트간에 재사용하기 힘들다
- 컴포넌트에 재사용가능한 behavior를 붙이기 힘듦(e.g. store에 연결하기)
- Render props나 HOC가 이걸 해결하려 했음
- 근디 얘네를 쓰려면 코드 구조를 바꿔야함. 그래서 부담스럽고 읽기도 어려움. React DevTools로 봐도 Wrapper가 엄청 많아서 지옥같음. 온갖 providers, consumers, HOC, render props나 다른 추상적인 애들로 쌓여있음(물론 devtools에서 filter out할순 있지만...).
- 리액트는 stateful한 로직을 share할 방법이 필요함
- Hooks쓰면 컴포넌트에서 stateful한 로직을 빼내서, 재사용하거나 따로 테스트 가능함. 그리고 컴포넌트 구조를 바꾸지 않고도 쓸 수 있음.

### 2. 복잡한 컴포넌트는 점점 이해하기 어렵다
- 간단하게 시작했지만 점점 통제 불가능하게 커진 컴퍼넌트.
- 각 라이프사이클 메서드에 stateful한 로직들이 어지럽게 담겨있다.
- stateful로직이 너무 많아서 컴퍼넌트를 작게 쪼개기도 어렵다. 이래서 redux 등 state management library썼음. 근디 그건 추상화를 심하게 만들고 파일간 엄청 이동하게 하고 컴포넌트를 재사용하는걸 힘들게 만들기도 한다.
- Hooks는 이걸 해결하기 위해 컴포넌트를 작은 함수들로 쪼개게 한다. 라이프사이클 메서드로 쪼개는 것 대신. 

### 3. Classes는 사람도 기계도 헷갈려한다
- 클래스가 리액트를 배우는데 큰 장벽이라는걸 알았다. this가 동작하는걸 잘 이해해야하는데 다른 언어랑 다르기도 해서 어렵거든.
- 그리구 클래스는 minify도 잘 안되고 hot reloading을 불안정하게 한다.
- Hooks는 리액트 피쳐를 클래스 없게 쓸 수 있도록 도와준다.

---

## React hooks: 훅마법사의 시대
- 라이프사이클
  + useEffect가 궁극적으로 하고 싶은 것: 컴포넌트 내부/외부의 요소를 동기화
+ eslint-plugin-react-hooks: 댄 아브라모브가 옆에서 코드리뷰해주는 역할
* useReducer를 쓰면 state와 dispatch가 리턴된다 -> 컴포넌트를 표현하는 상태와 업데이트 로직을 분리해서 사용 가능
  - 근데 무조건 useReducer만 쓸필욘 없음: 닭 잡는데 소잡는 칼 ㄴㄴ
- useFetch vustom hook
- Formik as a hooks: https://jaredpalmer.com/formik/docs/api/useFormik
- Fetch data with react hooks: https://www.robinwieruch.de/react-hooks-fetch-data
- 



## Refer
- https://reactjs.org/docs/hooks-intro.html
- https://velog.io/@velopert/react-hooks
- RFC: https://github.com/reactjs/rfcs/blob/master/text/0068-react-hooks.md
- https://hewonjeong.github.io/deep-dive-how-do-react-hooks-really-work-ko/?fbclid=IwAR3GtmHuo-IIkQWp9S9HzATVkr8Wxr_KpBxlcTRFuFtoBuAD3jcDpL_ciEU