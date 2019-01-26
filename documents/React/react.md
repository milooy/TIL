# 리액트 자료들

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

# React velopert inflearn 강의
https://www.inflearn.com/course/react-%EA%B0%95%EC%A2%8C-velopert/

## 리액트 장점과 단점
- 장점: 뛰어난 garbage collection, 메모리 관리, 성능, 서버&클라사이드 렌더링 모두 지원, 간편한 UI 수정 및 재사용, 페이스북이 밀어준다, 다른 프레임워크나 라이브러리와 혼용가능
- 단점: view only, IE8 이하 지원 x, 

## 리액트 설정
- ver 15이상부턴 react랑 react-dom 따로 import해줘야 한다. react-dom은 돔 조작에 관련된 것.
- JSX: XML-like syntax를 native js로 변경해줌. ""로 감싸지 않는다. babel에서 jsx로더를 사용해서 이걸 js로 변환해줌
- props
    - 컴포넌트 내부의 immutable data
    - jsx내부에 {this.props.propsName}
    - 컴포넌트를 사용 할 때, <>안에 propsName="value"
    - this.props.children은 기본적으로 갖고 있는 props로, <Cpnt>여기에 있는 값이 들어간다</Cpnt>
- state
    - 유동적인 데이터
    - jsx내부에 {this.state.stateName} 
    - 초기값 설정이 필수. 생성자(constructor)에서 this.state={} fh tjfwjd.
    - 값을 수정 할 때는 this.setState({...}), 렌더링 된 다음엔 this.state = 절대 사용 말것.

```html
class Codelab extends React.Component {
  // 모든 리액트 컴포넌트는 render메소드가 있음
  // 컴포넌트에서 여러 el을 렌더링 할때 꼭 container element안에 포함해야 한다
  render() {
    let foo = "123";
    return (
      // JSX에서 js를 표현하려면 {}로 매핑하면 된다
      // JSX안에서 style 설정하려면 string형식이 아니고 key가 camelCase인 객체 사용
      <div>
        <div style={{backgroundColor: 'gray'}}>
          {/* JSX안에서 주석 달려면 이렇게 해야한다*/}
          Codelab {foo}    
        </div>
        <div>hello {this.props.name}</div>
        <div>{this.props.children}</div>
      </div>

    )
  }
}

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    }
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    this.setState({value: this.state.value + 1})
  }

  render() {
    return (
    <div>
        {this.state.value}
        <button onClick={this.handleClick}>+1</button>
    </div>
    )
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <Codelab name="jay">유루무 {this.props.mainName} {this.props.value}</Codelab>
        <Counter />
      </div>
    
    );
  }
}

// Type 검증: Component.propTypes = {...}
App.propTypes = {
  v1: React.PropTypes.string,
  v2: React.PropTypes.number.isRequired,
}
// 기본 값 설정: Component.defaultProps = {...}
App.defaultProps = {
  v1: 'Unknown',
  // v2: '3' 이러면 에러남
  v2: 3
};




// ReactDOM: 실제 코드에 JSX를 렌더링할 때 사용됨
ReactDOM.render(<App mainName="메인"/>, document.getElementById('root'))
```

## 개발 환경 세팅
- Webpack: 브라우저 위에서 import(require)를 할 수 있게 해주고 자바스크립트 파일들을 하나로 합쳐줌
- webpack-dev-server: 별도의 서버를 구축하지 않고도 static 파일을 다루는 웹서버를 열 수 있으며 hot-loader를 통해 코드가 수정될 때마다 자동으로 리로드 되게 할 수 있다.

```js
var webpack = require('webpack'); // 웹팩 불러오기

module.exports = { // 이 객체를 모듈로 내보낸다 -> 다른 파일에서 이 객체를 모듈로 가져올 수 있다. 나중에 웹팩 실행할 때 웹팩이 이 모듈 불러와서 설정 활용
    entry: './src/index.js', // entry로부터 require한 파일들을 불러오고, 그 require된 파일에서 또 require한 파일을 불러오고... 이렇게 재귀적으로 모든 파일을 불러온다. 배열로 여러 개 정해줄 수도 있다.

    output: { // public 폴더에 bundle.js로 저장하겠다
        path: __dirname + '/public/',
        filename: 'bundle.js'
    },

    devServer: { // 개발 서버 설정
        hot: true, // 파일이 수정될 때마다 리로드
        inline: true, // hot reload에 필요한 webpack dev server의 클라이언트를 bundle.js에 넣어주겠다
        host: '0.0.0.0', // server를 listen할 주소. 기본값은 localhost. 근데 localhost는 본인 컴에서만 되고 클라우드에선 안 되니까 이걸로 바꿔준다.
        port: 4000, // 개발 서버의 포트.
        contentBase: __dirname + '/public/', // index파일의 위치
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react'] // 모듈 로더를 통해서 es6와 react를 일반 js로 바꿔줌. 여기에 다른 css로더같은걸 넣으면 css도 require해서 사용할 수도 있음. less나 sass로더 쓰면 이를 css로 변환해줌. html minify로더 쓰면 압축.
                }
            }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin() // 핫 모듈 리로드도 플러그인 통해서 함.
    ]
}
```

## refer
- [원자로를 탐구하는 힙스터를 위한 가이드 (1): React 알아가기](http://spoqa.github.io/2015/09/09/react-guide-01.html)
- [React.js를 이해하다(1)](http://blog.coderifleman.com/post/122232296024/reactjs%EB%A5%BC-%EC%9D%B4%ED%95%B4%ED%95%98%EB%8B%A41)
- [페이스북의 인기 오픈소스 기술, ‘리액트’란?](http://www.bloter.net/archives/233564)
- [Removing User Interface Complexity, or Why React is Awesome](http://jlongster.com/Removing-User-Interface-Complexity,-or-Why-React-is-Awesome)
- [리안 개발 일기 #1: Front-End 개발(React)](https://medium.com/@RianCommunity/%EB%A6%AC%EC%95%88-%EA%B0%9C%EB%B0%9C-%EC%9D%BC%EA%B8%B0-2-front-end-%EA%B0%9C%EB%B0%9C-react-9f6ccb5b016d)
- [Do we need Redux? (Part1)](https://medium.com/@FourwingsY/do-we-need-redux-ebabf8d2740e)
