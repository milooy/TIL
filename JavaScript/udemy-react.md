# Udemy React-Redux

## 유투브 앱 만들기 (ch.1~ch.31)

### 깨알 팁
- package.json에 저장하며 install하려면 `npm install --save lodash`

### 깨알 ES2015

### 깨알 리액트
#### Functional component vs Class based component
1.Functional component
Searchbar 변수에 익명함수를 할당한다.
functional components는 state가 없고 CBC만 state 있다.
```js
const SearchBar = () => {
  return <input />;
};

// ES5
var SearchBar = function() {
  return foo;
};
```

2.Class based component
```js
class Searchbar extends Component{
  return foo;
}
```



### Index.js
```javascript
// 자바스크립트 모듈. 모든 js 라이브러리들 캡슐화한다.
import React, { Component } from 'react' // 리액트를 쓰고싶어요~ (node_modules 안에 있음). 리액트 컴포넌트 만드는데 쓰고
import ReactDOM from 'react-dom' // 돔 만드는데 쓴다
import SearchBar from './components/search_bar' // 라이브러리는 이름만 써도 되고, 컴포넌트는 상세 경로 써줘야 함.
import YTSearch from 'youtube-api-search'
import VideoList from './components/video_list'
import VideoDetail from './components/video_detail'

const API_KEY = 'AIzaSyB5xh3OSMPQmo1L8CdFXBbYO4HvDilhn1E';
```
- 필요한 라이브러리, 컴포넌트를 import한다.
- `reactDOM`, 유투브 검색 api, `SearchBar` `VideoList` `VideoDetail` 컴포넌트를 가져옴
- 라이브러리는 이름만 쓰고, 컴포넌트는 상세 경로 쓴다

```js
// 컴포넌트 만들기. HTML을 만들어낸다. 이건 컴포넌트 인스턴스 아니고 클래스.
// 한 파일당 한 컴포넌트만 만든다!
class App extends Component { // 리액트 Component를 상속받는 클래스 App 만들기
  constructor(props) { // 생성자
    super(props); // 
    this.state = {
      videos: [],
      selectedVideo: null
    };
    this.videoSearch('surfboards');
  }

  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
       });
    });
  }
  render() {
    const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300); // 300ms마다 호출

    // videos라는 props 넘기기
    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch}/>
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos}/>
      </div> // JSX를 반환하는 js function
    );
  }
};

// 이 컴포넌트로 만들어진 HTML을 페이지(의 DOM)으로 넣어라
ReactDOM.render(<App />, document.querySelector('.container')); //리액트야! 렌더해줘! 앱을! JSX태그 </>로 감싸서 클래스를 인스턴스화 하였다.
```
- 리액트의 `Component`를 상속받아 `App`이란 컴포넌트 클래스를 만듦.
- `constructor` (생성자)
  + 상속받은 props를 한 번 호출해주고
  + `state`에 `videos`, `selectedVideo`를 초기화 해 넣어준다.
  + videoSearch함수를 surfboards 키워드로 불러준다
- `videoSearch` (함수)
  + term을 받아서 유투브 api에 넘기면 콜백으로 video list가 온다. 그걸 state에 set해줌
- `render` (리액트 함수)
  + JSX를 반환한다
  + <SearchBar>: onSearchTermChange에 term을 `videoSearch`함수에 넘기는 함수를 넣는다
  + <VideoDetail>: `video` props에 지금의 `selectedVideo` state를 넘긴다
  + <VideoList>: onVideoSelect에 selectedVideo를 setState한다, videos에 this.state.videos를 넘긴다
- ReactDom의 `render`함수를 호출한다. 
  + 리액트야, 렌더해줘, 앱클래스를, ('.container')에다가!

### search_bar.js
```js
// const Component = React.Component 랑 같음
import React, { Component } from 'react';

// React.Component가 갖는 모든 속성을 extends받는 클래스
class SearchBar extends Component {
  // 새 클래스 만들어지면 처음에 한 번 불림.
  constructor(props) {
    // extends받은 Component의 props를 불름
    super(props);
    // function component는 state 없고 class based component만 state 있다
    this.state = { term: '첫 밸류' };
  }

  render() { // function이라 써주지 않았지만 함수다. normal function 대신 render function 써준것.
    return (
      <div className="search-bar">
        <input
          value={this.state.term}
          onChange={event => this.onInputChange(event.target.value)} />
      </div>
    );
  }

  onInputChange(term) {
    this.setState({term});
    this.props.onSearchTermChange(term);
  }
}

export default SearchBar;
```
- Component를 상속받은 SearchBar 클래스를 만든다
- `constructor` (생성자)
  + 새 클래스 만들어질 때 한 번 불림
  + extends받은 component의 props를 부름
  + this.state에 term:"어쩌구" 딕셔너리를 할당한다
- `render`
  + `div className="search-bar">`
    * `input`: value는 this.state.term, onChange가 일어나면 `onInputChange`함수에 현재 input value를 넘긴다
- `onInputChange` (함수)
  + this.state.term에다가 넘겨받은 term을 주입
  + this.props.onSearchTermChange(app.js에서 props로 넘김)에 term을 넘긴다. 그러면 유툽 api로 videosearch를 하겠지?
- 즉, 클래스 search-bar안의 input이 onchange될때마다, onInputChange함수를 부르고,
  + 그 함수에서 searchbar의 state에 term을 다시 박아주고 app.js에서 props로 넘겨준 onSearchTermChange에 term을 또 넘겨준다
  + 그럼 app.js의 그 함수에서 videoSearch란 함수에 term을 또 넘겨준다. 
  + 그 함수에서 term을 받아서 유투브 api에 넘기면 콜백으로 video list가 온다. 그걸 state에 set해줌. 그럼 videos랑 selectedVideos가 바뀌겠지? 그럼 디테일이랑 리스트도 바뀔것이다.
- `SearchBar`란 이름으로 export해준다.


### video_list.js
(여긴 마크다운 하이라이팅 이상해서 코드블럭으로 안 감쌈)
---
import React from 'react';
import VideoListItem from './video_list_item'

const Videolist = (props) => {
  const videoItems = props.videos.map((video)=> {
    return <VideoListItem
      onVideoSelect={props.onVideoSelect}
      key={video.etag}
      video={video} />
  });

  return (
    <ul className="col-md-4 list-group">
      { videoItems }
    </ul>
  );
};
export default Videolist;
---
- 여기는 functional Components.
- `videoItems`에 app.js에서 넘긴 `videos`리스트 props를 map해서 저장한다. 
  + VideoListItem 컴포넌츠인데, props로 위에서 받아온 onVideoSelect함수(app.js의 state에 ㄴselectvideo를 넘기는 함수)를 넘기고, key로는 현재 맵 데이터 video의 etag, video로는 현재 맵 데이터 video를 넘긴다.
- ul 안에 videoItems를 감싸서 return한다

### video_list_item.js
```js
import React from 'react';

// const video = props.video; const onVideoSelect=props.onVideoSelect 이렇게 한 효과가 난다
const VideoListItem = ({video, onVideoSelect}) => {
  const imageUrl = video.snippet.thumbnails.default.url;
  return (
    <li onClick={()=> onVideoSelect(video)} className="list-group-item">
      <div className="video-list media">
        <div className="media-left">
          <img className="media-object" src={imageUrl}/>
        </div>
        <div className="media-body">
          <div className="Media-heading">{video.snippet.title}</div>
        </div>
      </div>
    </li>
  );
};

export default VideoListItem;
```
- Video_List.js에서 넘긴 video, onVideoSelect props들
  + video에서 imageURL 받아오고
  + `<li>`: onClick시 onVideoSelect(app.js에서 타고 내려온 props. selectedVideo를 setState해준다)에 클릭한 비디오를 넘긴다

### video_detail.js
---js
import React from 'react';

const VideoDetail = ({video}) => {
  if(!video) {
    return <div>로딩중...</div>;
  }
  const videoId = video.id.videoId;
  const url = `https://www.youtube.com/embed/${videoId}`

  return (
    <div className="video-detail col-md-8">
      <div className="embed-responsive embed-responsive-16by9">
        <iframe className="embed-responsive-item" src={url}></iframe>
      </div>
      <div className="details">
        <div>{video.snippet.title}</div>
        <div>{video.snippet.description}</div>
      </div>
    </div>
  );
};

export default VideoDetail;
---

- app.js에서 props로 넘겨준 video를 받아 보여준다


---

## Redux (ch.39~42)
Redux: function that returns peices of application state

```js
// application state - reducers가 만들어줌
{
  books: [{title: '책이름1'}, {title: '책이름2'}], // Books reducer와 소통
  activeBook: {title: '책이름2'} // ActiveBook Reducer와 소통
}
```

### reducers/index.js
```js
import { combineReducers } from 'redux';
import BooksReducer from './reducer_books'

const rootReducer = combineReducers({
  books: BooksReducer
});

export default rootReducer;
```
- redux에서 `combineReducers`를 import
  + 이를 이용해서 books에 BooksReducer를 넣는다
  + 이를 `rootReducer`란 이름으로 export

### reducers/reducer_books.js
```js
export default function() {
  return [
    {title: 'JS는 짱'},
    {title: '해리포터'},
    {title: '반지의 제왕'},
    {title: '파이썬 배우자'},
  ]
}
```
책 데이터 오브젝트를 리턴.
이는 index.js에서 books란 이름으로 combineReducers 된다

### index.js
---js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/app';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>
  , document.querySelector('.container'));
---

- React(react), ReactDOM(react-dom), Provider('react-redux'), createStore, applyMiddleware(redux)를 import한다
- `createStoreWithMiddleware`란 이름으로 applymiddleware에 createStore를 넣는다
- render
  + `<Provider/>`
    * store에 createStoreWithMiddleware(reducers)
    * 안에 `<App />`을 넣는다
   + `'.container'` 에 넣는다

### components/app.js
---js
import React, { Component } from 'react';

import BookList from '../containers/book-list'

export default class App extends Component {
  render() {
    return (
      <div>
        <BookList />
      </div>
    );
  }
}
---
- BookList를 div에 감싸서 반환

### containers/book-list.js
---js
import React, { Component } from 'react'; // Component 대신 container쓴다. Redux에서 쓰는 react component임. React랑 redux랑 연결하려면 react-redux써야됨!
import { connect } from 'react-redux'

class BookList extends Component {
  renderList() {
    return this.props.books.map((book) => {
      return (
        <li key={book.title} className="list-group-item">{book.title}</li>
      );
    });
  }
  
  render() {
    return (
      <ul className="list-group col-sm-4">
      {this.renderList()}
      </ul>
    )
  }
}

function mapStateToProps(state) {
  // 리턴되는게 this.props가 됨
  return {
    books: state.books
  };
}

export default connect(mapStateToProps)(BookList);
---
- redux에서 react component를 container라고 함.(?)
- react랑 redux 연동하기 위해 `react-redux`를 import
- BookList(컴포넌트)
  + `render()`
    * ul 안에 this.renderList()를 반환
    * 이렇게 반환한 ul li들은 components/app.js에 들어감 (그 app.js는 index.js에 들어감)
   + `renderList()` 
     * this.props.books를 map해줌. 여기서 this.props.books는 react-redux의 connect함수(아래에 정의)에서 넣어준다.
     * book-title을 보여주는 li
- `mapStateToProps(state)`
  + books에 state.books를 넣는다
- mapStateToProps랑 BookList를 connect해서 export default한다

### 나름대로 이해해보자
- 즉, `index.js`에서 Provider store를 나의 reducer들로 쓴다고 말한다.
- `reducer`에서는 books에 책 리스트 데이터들을 담아서 넘겨주었다
- 메인으로 보여줄 `app.js`에서는 책 리스트를 li 리스트로 보여줄건데
  + 여기선 `react-redux`를 사용해서 books란 변수에 reducer에서 이미 정해둔 books 데이터를 넣어주었다. 그래서 this.props.books하면 redux에서 넘겨준 books데이터가 나온다.
- application의 state는 reduce function으로 만들어진다

--- 

## Weather 만들기

![image](../img/udemy-react/1.png "image")

### 나름대로 이해해보자
- 나는 reducer들을 쓸것이다. 이는 `index.js`에 store로 저장해뒀다.
- `containers/search_bar.js`
  + constructor(props)
    * state안에 들어있는 term을 초기화 해준다.
    * onInputChange랑 onFormSubmit을 밑에서 쓰기 위해 this랑 바인딩 해준다
  + Input 이 입력될때마다 `onInputChange`를 부른다. 여기선 term에 현재 쓰고있는 값을 저장해준다
  + Input이 제출되면 `onFormSubmit`을 부른다. props에 있는 `fetchWeather`에 현재 term을 넘겨주고 term을 초기화해준다
    * 여기서 props.fetchWeather을 쓸 수 있었던 건 밑에서 `bindActionCreators`로 fetchWeather, dispatch를 묶고, 이 함수랑 SearchBar 컴포넌트를 묶어줬기 때문이다.
- `containers/weather_list.js`
  + this.props.weather 를 보여준다. 이를 쓸 수 있던건 아래에서 state.weather를 weather란 state로 묶어줬기 때문이다. 여기서 state.weather는 맨 처음에 `reducers/index.js`의 리듀서 안에 weather란 이름으로 WeatherReducer를 받아왔기 때문이다. 이는 `FETCH_WEATHER`액션이 일어나면 불려서 업데이트된 값이다. 이 액션은 `search_bar.js`에서 form submit할때 불렀었다



## 그럼 어케 해야하지
- `RetailerShipping.js`에 들어가면 
  + constructor에서 `FETCH_RETAILER`액션을 불러버린다. 그 액션에선 리테일러를 받아와서 `retailer`라는 state에 데이터를 저장시킨다.

## 블로그 만들기
### React Lifecycle
- 순서
  + 컴포넌트 생성: constructor -> componentWillMount -> render -> componentDidMount
  + 컴포넌트 제거: componentWillUnmount
  + 컴포넌트 Prop변경: componentWillReceiveProps -> shouldComponentUpdate -> componentWillUpdate-> render -> componentDidUpdate
- 디테일
  + `constructor`: 생성자. 컴포넌트가 처음 만들어질때 실행
  + `componentWillMount`: 컴포넌트가 DOM 위에 만들어지기 전에 실행
  + `render`: 컴포넌트 렌더링
  + `componentDidMount`: 컴포넌트 만들어지고 첫 렌더링을 다 마친 후. 여기서 다른 js프레임웍을 연동하거나 setTimeout, setInterval 및 ajax처리한다.
  + `componentWillReceiveProps`: 컴포넌트가 prop을 새로 받았을 때 실행. prop에 따라 state를 업뎃해야 할 때 사용하면 유용. 이 안에서 `this.setState()`해도 추가렌더링 안함
  + `shouldComponentUpdate`: props/state가 변경되었을 때 리렌더링을 할지 말지 정하는 메서드.
  + `componentWillUpdate`: 컴포넌트가 업뎃되기 전에 실행. 여기서 this.setState하면 무한루프
  + `componentDidUpdate`: 컴포넌트가 리렌더링 마친 후 실행
  + `componentWillUnmount`: 컴포넌트가 DOM에서 사라진 후 실행

https://velopert.com/1130
