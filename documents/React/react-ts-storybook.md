# Workshop: TypeScript 와 Storybook을 사용한 리액트 디자인 시스템 구축하기

에서 재밌게 만든 React + TypeScript + Storybook 앱이당

- 워크샵 신청 링크: https://innovationlab191121workshop.splashthat.com/
- 강의 자료: http://bit.ly/1121-storybook
- Storybook tutorial: https://velopert.gitbook.io/storybook-tutorial/

## 디자인 시스템이란?
- Design system: `Style Guide` + `Component library`
    + Style guide: 특정 브랜드나 UI를 만들 때 꼭 지켜야 하는 규칙들 (color, typography, motion, spacing)
        + https://www.carbondesignsystem.com/components/overview
    + Component library: UI kit, 


## 문서화
- "If you don't document it, it doesn't exist"
- Storybook
    + Storybook v5.2 부터 MDX 지원! <- 편함
- Docz: https://www.docz.site/
    + MDX 지원
- react-styleguidist: https://react-styleguidist.js.org/

## Styling
- emotion beat the styled components (https://velopert.gitbook.io/storybook-tutorial/04.create-design-system/04a.button#emotion)
    + styledComponent 말고 emotion써야 라이브러리로 올릴때 따로 컴파일 서버 필요 없어서 좋음

## 라이브러리 RollUp으로 배포하기
- 문서: https://velopert.gitbook.io/storybook-tutorial/05.publish-library/05a.bundle-with-rollup