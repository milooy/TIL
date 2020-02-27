# TIL

## 200130
### 크롬 네트워크/프로파일 탭 export/load 하기
```
TIL(Today I Learned)
---
1. You can export the Network log(from chrome dev tools) and read it in https://toolbox.googleapps.com/apps/har_analyzer/
2. You can also export the Performance(from chrome dev tools) and load it in Performance tab(right click and load the file)

This can be useful to stack trace the network and performance log
```

## 190226
### Find text in certain extension in VS Code
```
**/*.spec.*
```

## 190102
### ESLint ignore next line
```
// eslint-disable-line no-use-before-define
```

## 181024
### Comment 'deprecated' tag in javascript file
The eslint plugin will work with 2 styles only: JSDoc style or TomDoc style. We have to follow one of these 2 style or the linter will not be able to generate warnings.

JSDoc style (1)
```/**
 * this is what you get when you trust a mouse talk show
 * @deprecated need to restart the experiment
 * @returns {Number} nonsense
 */
```

TomDoc (2)
```// Deprecated: This is what you get when you trust a mouse talk show, need to
// restart the experiment.
//
// Returns a Number nonsense
```

## 180709
### cURL 날리기
curl -v -X GET "http://localhost:8042/api/v1/notebooks/uniq-24/containerTask" -H "organizationId : UXXXXXXX1"

## 180526
### 함수형 setState
- this.props 및 this.state가 비동기적으로 업뎃될 수 있으므로 next state를 계산할 때 해당 값을 신뢰해서는 안 된다
- 함수형 setState를 쓸 때: 업데이트는 Queue에 쌓이고 추후에 호출 된 순서대로 진행. 객체형으로 여러번 setState하면 객체를 merge해서 쓴다

```html
class BadCounter extends React.Component{
  constructor(props){
    super(props);
    this.state = {count : 0} 
    this.incrementCount = this.incrementCount.bind(this)
  }

  incrementCount(){
    // Error: 2개씩 count 올라가야 하는데 하나씩 올라감
    this.setState({count : this.state.count + 1}) 
    this.setState({count : this.state.count + 1})
  }
  render(){
    return <div>
              <button onClick={this.incrementCount}>Increment</button>
              <div>{this.state.count}</div>
          </div>
  }
}

class GoodCounter extends React.Component{
  constructor(props){
    super(props);
    this.state = {count : 0} 
    this.incrementCount = this.incrementCount.bind(this)
  }

  incrementCount(){
    // Success: 2개씩 count 잘 올라간다
   this.setState((prevState, props) => ({
      count: prevState.count + 1
    }));
   this.setState((prevState, props) => ({
      count: prevState.count + 1
    }));
  }
  render(){
    return <div>
              <button onClick={this.incrementCount}>Increment</button>
              <div>{this.state.count}</div>
          </div>
  }
}

ReactDOM.render(
  <div><BadCounter/><GoodCounter/></div>,
  document.getElementById('root')
);
```

- 컴포넌트 밖에 함수로 빼두자. 컴포넌트도 짧아지고 상태를 계산하기 위해 추가 인자를 전달할 수도 있고 컴포넌트와 별개로 함수 테스트도 가능.
  + 즉 컴포넌트가 애플리케이션 전체에 걸쳐 재사용되는 일이 없더라도 테스트를 위해 컴포넌트나 함수를 내보내느게 좋다.
```html
function multipleby(multiplier) {
  return function update(state) {
    return { value: state.value * multiplier }
  }
}

class Counter extends React.Component {
  state = {value: 10};
  handleMultipleByFive = () => {
    this.setState(multipleby(5));
  }
  render() {
    return (
      <div>
        <h1>{this.state.value}</h1>
        <button onClick={this.handleMultipleByFive}>X5</button>
      </div>
    )
  }
}
```


## 180316
### VSCode 유용
- shift + ctrl + cmd + left/right: 셀렉션 축소 확장
- opt + cmd + up/down: 다중 커서 셀렉션
- F2: 이름 전체 변경
- shift + f12: 모든 이름 찾아서 리스트화
refer: https://www.vobour.com/%EA%B0%9C%EB%B0%9C-%EC%83%9D%EC%82%B0%EC%84%B1%EC%9D%84-%EC%98%AC%EB%A0%A4%EC%A3%BC%EB%8A%94-vscode%EC%9D%98-%EC%86%8C%EC%86%8C-%ED%95%9C-%EA%B8%B0%EB%8A%A5%EB%93%A4

# 180305
## 도커 죽이기
```shell
$ docker rm -f $(docker ps -a -q)
```

# 180221
## 떠있는 로디아 찾아서 죽이기
```shell
$ ps -ef | grep rhodia
$ lsof -n -i:$PORT | grep LISTEN # 혹은 포트넘버로 찾기
$ kill -9 포트넘버
```

## 180220
### ZSH에 custom alias 추가
`.zshrc`에 원하는 alias추가하고 `source ~/.zshrc` 를 통해 재실행
```
alias kp="sudo lsof -t -i tcp:8000 | xargs kill -9"
```
refer: https://wayhome25.github.io/etc/2017/03/12/zsh-alias/

### global gitignore
```shell
$ vi ~/.gitignore_global 
$ git config --global core.excludesfile ~/.gitignore_global
```

### direnv 세팅
```shell
$ brew install direnv
$ vi ~/.zshrc # and type: eval "$(direnv hook zsh)"
$ cd playground
$ echo export FOO=foo > .envrc
direnv: error .envrc is blocked. Run `direnv allow` to approve its content.
$ direnv allow
direnv: loading .envrc
direnv: export +FOO -PS2
$ cd ..
direnv: unloading
$ cd playground
direnv: loading .envrc
direnv: export +FOO -PS2
$ echo ${FOO}
foo
$ printenv
```

## 180118
### Github Pages로 배포할 폴더 변경하기
결론: subtree를 만들어서 `gh-pages`브랜치에 원하는 폴더만 올리면 된다.

1. .gitignore에서 배포 원하는 폴더를 주석처리 (e.g. /public, /dist)
2. 원하는 폴더를 add하고 commit한다: `git add 폴더이름 && git commit -m "Initial subtree commit"`
3. 서브트리로 gh-pages에 푸시 해준다: `git subtree push --prefix 폴더이름 origin gh-pages`

git add docs && git commit -m "Subtree commit"
git subtree push --prefix docs origin 
git push origin `git subtree split --prefix docs master`:gh-pages --force

git push heroku `git subtree split --prefix pythonapp master`:master --force


refer: https://gist.github.com/cobyism/4730490

## 171124
### handle 네이밍은 이벤트 받아 처리하는 handler
보통 handle- 이라는 네이밍을 주는 이유는 사용자의 이벤트를 받아서 처리하는 핸들러기 때문에 핸들을 붙여주는거에요.
handleExcel이라는 이름을 주면 네이밍에서 "아~ 이녀석은 액셀 버튼을 클릭한건가?" 라는 인식을 주게 되는데,..

코드를 보니 실제 액셀 버튼을 눌렀을때 반응하는 녀석은 아니네요.

```
<button type="button" className="download-excel btn btn-default pull-right"
               onClick={handleSubmit(this.handleExcel)} style={{ marginRight: '6px' }}>엑셀 다운
</button>
```
그래서 이렇게 쓰는게 어떨까 싶어요..

```
<button type="button" className="download-excel btn btn-default pull-right"
               onClick={this.handleDownloadExcel} style={{ marginRight: '6px' }}>엑셀 다운
</button>

// 클래스 바깥쪽 클로져 영역 
function downloadExcel (excelPath, data) {
  //   url 을 만들어서... 넣어줌.
   window.location.assign(url);
}

{ 
    // 클래스 안쪽
    handleDownloadExcel = ()=>{
        콜백 = downloadExcel.bind(this.props.pathnameForExcel)
        this.props.handleSubmit(콜백)
    }
}
```

코드 모양을 보니 handleSubmit 함수가 data를 "콜백"으로 주입하고 있어서 저렇게 동작할지는 모르겠으나.. 아무튼 저런 느낌적인 느낌 어떤가요? 이번에 빡시면 다음 PR로 미뤄도 됩니다.


## 171120
### arrow function으로 bind(this) 없애기
```js
onFliterClick={this.onFilterClick}

onFilterClick = () => {
    ... 요렇게 에로우 펑션으로 바꿔주면 this 가 자동 바인드 됩니다. 
} 
```

### 리액트 함수 이름 컨벤션
- 같은 클래스 내부 함수는 handle-
- props로 받은 함수는 on-
props로 받는 쪽은 무조껀 on 접두로 받고, 해당 props를 실제로 구현하는 쪽에서 handle 접두를 붙인다고 보심 될 거 같아요.
```js
# 부모
handleFilterClick() {
 // do sth
}
...
<FilterTable filter={ operation.filter } onFilterClick={this.handleFilterClick}

# 자식
<form onSubmit={this.props.onFilterClick}>
```


## 171114
Python timezone 다루기
'2017-11-11'을
begin에 넘겼을 때 `datetime.datetime(2017, 11, 10, 15, 0, 0, 0)`을,
end에 넘겼을 때 `datetime.datetime(2017, 11, 11, 14, 59, 59, 999999)`을 받고 싶다.

여기서 15시 14시는 UTC기준으로 00:00:00 KST ~ 23:59:59 KST 기간.
```python
import arrow

getutcfromstring = get_utc_from_string('2017-11-11')

>>> getutcfromstring
datetime.datetime(2017, 11, 11, 0, 0, tzinfo=tzfile('/usr/share/zoneinfo/Asia/Seoul'))

>>> arrow.get(getutcfromstring).to('UTC').datetime
datetime.datetime(2017, 11, 10, 15, 0, tzinfo=tzutc())


# timemax를 utc, asia로 바꿔보기
timemax = datetime.datetime.combine(getutcfromstring, datetime.time.max)
>>> timemax
datetime.datetime(2017, 11, 11, 23, 59, 59, 999999) # timemax 적용하면 timezone이 날아간다.

>>> pytz.timezone('UTC').localize(timemax)
datetime.datetime(2017, 11, 11, 23, 59, 59, 999999, tzinfo=<UTC>)

>>> pytz.timezone('Asia/Seoul').localize(timemax)
datetime.datetime(2017, 11, 11, 23, 59, 59, 999999, tzinfo=<DstTzInfo 'Asia/Seoul' KST+9:00:00 STD>)

>>> arrow.get(timemax).to('UTC').datetime
datetime.datetime(2017, 11, 11, 23, 59, 59, 999999, tzinfo=tzutc())
>>> arrow.get(timemax).to('Asia/Seoul').datetime
datetime.datetime(2017, 11, 12, 8, 59, 59, 999999, tzinfo=tzfile('/usr/share/zoneinfo/Asia/Seoul'))

# time max, time min
>>> datetime.datetime.combine(getutcfromstring, datetime.time.min)
datetime.datetime(2017, 11, 11, 0, 0)
>>> datetime.datetime.combine(getutcfromstring, datetime.time.max)
datetime.datetime(2017, 11, 11, 23, 59, 59, 999999)

# TIMEMAX에 seoul timezone설정해주고 utc로 변환
seoul_zone = pytz.timezone('Asia/Seoul')

>>> newtimemax = seoul_zone.localize(timemax)
datetime.datetime(2017, 11, 11, 23, 59, 59, 999999, tzinfo=<DstTzInfo 'Asia/Seoul' KST+9:00:00 STD>)

>>> arrow.get(newtimemax).to('UTC').datetime
datetime.datetime(2017, 11, 11, 14, 59, 59, 999999, tzinfo=tzutc())
```


## 171113

### 다중 필터 연산 깔끔하게 하기
```python
# build query
args = ()
kwargs = {}

if retailer_id:
  kwargs = {'retailer__id' :retailer_id}
if q:
  args = (Q(retailer__title__contains=q) | Q(serial_no__contains=q) | Q(destination__contains=q))

# do query
retailershipping_qs.filter(*args, **kwargs)
```

## 171110

### 파이썬에서 튜플을 간단히 dict로 바꾸기
매직 오브 파이썬이다
```python
a = [('a', 1), ('b', 2)]

# {'a': 1, 'b': 2}
b = dict(a)
```

### 파이썬 list comprehension
http://www.secnetix.de/olli/Python/list_comprehensions.hawk
```python
# 원본 리스트
a = [1, 2, 3]

# for - loop
b = []
for item in a:
    b.append(item)

# list comprehension
b = [item for item in a]
```
