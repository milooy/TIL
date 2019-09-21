# React: High Order Component

* New update
- HOC가 해결하려고 했던 대부분의 문제가 Hooks로 해결됨.
- 참고: https://github.com/acdlite/recompose

- 컴포넌트 기능 상에서도 자주 반복되는 코드가 나타날때. 이를 재사용하기 위함.
- 보통 `with`BlahBlah라는 이름으로 지음.
- HOC의 원리

## HOC 틀 잡기

함수를 리턴하는 함수. 특정 컴포넌트에 props를 넘기는 컴포넌트를 리턴한다.

```js
import React, { Component } from 'react';

// url을 인자로 받는 함수에서 WrappedComponent를 인자로 받는 함수를 리턴.
// (url, WrappedComponent) 처럼 한번에 만들지 않은 이유는 나중에 여러개의 HOC를 사용할 때 cmpose같은 함수로 편하게 사용하기 위함
const withRequest = (url) => (WrappedComponent) => {
  return class extends Component {
    render() {
      return (
        <WrappedComponent {...this.props}/>
      )
    }
  }
}

export default withRequest;
```

## HOC에 기능 넣기

```js
import React, { Component } from 'react';
import axios from 'axios';

const withRequest = (url) => (WrappedComponent) => {
  return class extends Component {

    state = {
      data: null
    }

    async initialize() {
      try {
        // url에서 get해와서 데이터를 state.data에 저장한다
        const response = await axios.get(url);
        this.setState({
          data: response.data
        });
      } catch (e) {
        console.log(e);
      }
    }

    componentDidMount() {
      this.initialize();
    }

    render() {
      const { data } = this.state;
      return (
        <WrappedComponent {...this.props} data={data}/>
      )
    }
  }
}

export default withRequest;
```

### HOC 사용하기
- 기존에는 각 component에서 axios.get으로 각 url넘겨서 state에 저장하고 난리 부르스 했는데
- 이제는 HOC로 감싸서 state에 있는 데이터 바로 props로 받아서 쓸 수 있게 되었다.

```html
import React, { Component } from 'react';
import withRequest from './withRequest';

class Post extends Component {
  render() {
    <!-- HOC에서 state에 저장했던 data를 WrappedComponent에 props로 넘겼으니 여기서도 props로 받아서 쓸 수 있는것임 -->
    const { data } = this.props;
    
    if (!data) return null;

    return (
      <div>
        { JSON.stringify(this.props.data) }    
      </div>
    );
  }
}

<!-- withRequest의 첫 번째 인자에 url을 넘기고, 두 번째 인자에 Post 컴포넌트를 넘긴다. -->
export default withRequest('https://jsonplaceholder.typicode.com/posts/1')(Post);
```

## Refer
- https://velopert.com/3537
