# Script Filter

알프레드 워크플로우의 입력 기능 중 하나. 키워드를 입력받아 처리한 후 XML 문장을 만들어 돌려주면 목록 형식으로 보여주는 기능. 이후 한 항목을 선택한 후 처리를 다른 워크플로우 항목으로 만들어 이어갈 수 있다.

## 주의사항

- 처리 후 다른 워크플로우 항목에 연결하려면 `<item>` 태그에 `arg` 속성을 채워야 한다.
- 항목을 선택 후 엔터를 누르지 않고 `⌘C`(복사), `⌘L`(대형 문자) 키를 활용하려면 `text` 속성을 채운다.
- 속성 값 또는 태그 내용에 사용하는 문자열은 XML 형식에 맞게 escape 해 준다.
    * `&amp;`, `&apos;`, `&gt;`, `&lt;`, `&quot;`
- `uid` 속성을 사용할 경우 `<item>` 태그 순서보다 `uid` 값을 기준으로 정렬한다. 사용하지 않을 경우는 태그 순서.

## 참고

- [Script Filter - Workflow Input Object - Alfred v2 Support](http://support.alfredapp.com/workflows:config:inputs-script-filter)
