# Today I Learned

JayJin이 오늘 새로 배운 것을 다음의 규칙으로 commit 합니다. [thoughtbot til 참고](https://github.com/thoughtbot/til)

## 작성 규칙

- 문서 생성은 [GFM (Github Flavored Markdown)](https://help.github.com/articles/github-flavored-markdown/) 을 사용한다. (확장자 `.md`)
- 언어나 기술명으로 폴더를 만든다. (root에 문서를 만들지 않는다.)
- 파일명은 영어로.


## 로컬에서 띄우기

[gollum](https://github.com/gollum/gollum), [pow](http://pow.cx/) 와 [anvil](http://anvilformac.com/)을 사용한다.

### gollum 설치
```bash
$ [sudo] gem install gollum
```

### pow 설치 및 제거
```bash
$ curl get.pow.cx | sh

$ curl get.pow.cx/uninstall.sh | sh
```

### 사용법

다음 설정을 하고 브라우저에서 [http://til.wiki.dev/](http://til.wiki.dev/)로 접속한다.

```bash
$ cd ~/.pow
$ ln -s path/to/this_local_repo til.wiki
```

### Anvil 설치
GUI pow 관리툴 Anvil [http://anvilformac.com/](http://anvilformac.com/)
