# React: Render props

Component를 재사용하기 위해 사용하는 기법(다른건 HOC(High Order Component)가 있다).
말그대로 `render`를 `props`로 사용하는거임.

```html
<DataPropvider render={data => (
    <h1>Hello {data.target}</h1>
)} />
```

예를 들어 `<MouseTracker />`라는 컴포넌트에서 마우스 위치를 계산하는 로직을 짰다고 하자. 근데 다른 컴포넌트에서 이걸 쓰고 싶다면?

```html
class MouseTracker extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>
        <h1>Move the mouse around!</h1>
        <p>The current mouse position is ({this.state.x}, {this.state.y})</p>
      </div>
    );
  }
}
```

### Render prop으로 재사용가능한 component 만들기

- 나의 목표: 마우스를 움직일때 거기에 고양이 이미지가 달라붙는 앱
- Component
    + Mouse: 마우스 위치를 추적해서 x, y state에 위치 저장. 다만 그냥 render하지 않고 props로 render할거를 받아서 x, y state를 넘겨줌
    + Cat: mouse 데이터를 props로 받아 고양이 이미지를 해당 위치에 보여주는 단순한 컴포넌트
    + MouseTracker: `Mouse` 컴포넌트에 render prop으로 `Cat` 컴포넌트를 넘긴다. 다만 함수로 넘기는데 인자를 Cat에 mouse란 이름으로 넘긴다. 그러면 Mouse컴포넌트의 state가 mouse란 이름의 prop로 넘어간다.

```html
class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <img src="/cat.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
    );
  }
}

class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>

        {/*
          Instead of providing a static representation of what <Mouse> renders,
          use the `render` prop to dynamically determine what to render.
        */}
        {this.props.render(this.state)}
      </div>
    );
  }
}

<!-- 메인 컴포넌트.   -->
class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>
        <Mouse render={mouse => (
          <Cat mouse={mouse} />
        )}/>
      </div>
    );
  }
}
```

- children이란 이름의 prop으로 넘겨도 된다. 다만 헷갈리지 않게 children의 PropTypes를 `PropTypes.func.isRequired`으로 잡아줄 것.


## Refer
- https://reactjs.org/docs/render-props.html
- https://medium.com/@la.place/react-render-props-pattern-1c53a6b9645c