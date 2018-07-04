# Atom customizing

## 현재 라인, 텍스트 셀렉트시 배경 색 변경

styles.less를 변경한다.
```css
atom-text-editor::shadow .selection .region, :host .selection .region,
atom-text-editor::shadow .line.cursor-line, :host .line.cursor-line {
  background-color: red;
}

atom-text-editor::shadow .selection .region {
  background-color: blue !important;
}
```
