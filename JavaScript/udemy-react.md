# Udemy React-Redux

## 유투브 앱 만들기

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
    // videos라는 props 넘기기
    return (
      <div>
        <SearchBar onSearchTermChange={term => this.videoSearch(term)}/>
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
