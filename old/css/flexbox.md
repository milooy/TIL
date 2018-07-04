# CSS Flex Box

`container`와 `items`기준으로 설명.

## 수평 레이아웃
```css
.container {
    display: flex;
}
```
items 손대지 않고도 수평 정렬 된다.

## 수직 레이아웃
```css
.container {
    display: flex;
    flex-direction: column;
}
```
위의 수평 레이아웃과 수직/수평 축 전환됨.

## 축 정렬
```css
.container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
```
위의 수직 레이아웃을 다시 수평으로 만들려면 `flex-direction`을 `row`로 바꾸면 된다.
`justify-content`를 `center`로 하면 중심축(수평)의 중앙에 정렬된다.
`align-items`를 `center`로 하면 교차축(수직)의 중앙에 정렬된다.

- justify-content
    + flex-start(default)
    + flex-end
    + center
    + space-between
    + space-around
- align-items
    + flex-start(default)
    + flex-end
    + center
    + baseline
    + stretch

## Items
축에 따른 전체적 정렬 말고도, 각각 아이템을 정렬 할 수 있다.
```css
.item1 {
    align-self: flex-end;
}
```
아이템1만 하단을 기준으로 정렬된다.
 
## Refer
https://joshuajangblog.wordpress.com/2016/09/19/learn-css-flexbox-in-3mins/
