# Styled-components

## 간단 예제
reusable `<Button />` component 만들기

```js
import styled, { css } from 'styled-components'

const Button = styled.button`` // 이게 React Component된다.

const Button2 = styled.button`
    background: transparent;
    border-radius: 3px;
`

const Button3 = styled.button`
    background: red;

    // 함수로 props를 받을 수 있음.
    ${props =>
        props.primary &&
        css`
            background: blue;
        `};
`

// Styled components는 render밖에 만들어라
render(
    <div>
        <Button3>Normal Button</Button>
        <Button3 primary>Primary Button</Button>
    </div>
)
```

## Basics
```js
const Title = styled.h1`
    font-size: 1.5em;
    color: ${props => props.primary ? "white" : "red"};
`

const Wrapper = styled.section`
    padding: 4em;
`

const TitleExtended = styled(Title)`
    color: blue;
`

render (
    <Wrapper>
        <Title primary>Hi</Title>
    </Wrapper>
)
```

## Styling components
```js
const Link = ({className, children}) => {
    <a className={className}>
        {children}
    </a>
}

const StyledLink = styled(Link)`
    color: red;
`

render (
    <div>
        <Link>Default link</Link>
        <StyledLink>Styled link</StyledLink>
    </div>
)

```

## Coming from CSS
```js
import styles from './styles.css'

// 모듈로 불러오는 방식
export default class Counter extends React.Component {
    render (
        return (
            <div className={styles.counter}>
                <button className={styles.button} />
            </div>
        )
    )
}
```

```js
const 
```

## Refer
- https://www.styled-components.com/