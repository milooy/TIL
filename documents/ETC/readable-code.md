# 이해하기 쉽게 코드 작성하기

## 이름 짓기
- 페이지를 요청할때는 `getPage()`보다는 `fetchPage()`
- 사이즈를 가져올때는 `size`보다는 `height`, `memoryBytes`처럼 구체적이게.
- 단위를 포함시키기 (startTime보다는 startMs)
- 고려해야하는것은 포함 (이스케이프 처리가 되어야한다면, comment -> unescapedComment)

## Refer
https://chodragon9.github.io/blog/easy-code/?fbclid=IwAR3iMMNrXuN2tPFAagsJ-1mPhvOe-fN0FaeozTzBRKnDF6sAkySWIOQ-0Zg