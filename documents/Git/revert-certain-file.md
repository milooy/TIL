# 특정 파일 특정 상태로 돌리기

체크아웃 뒤에 파일이름을 써준다.

```
$ git checkout ${커밋해시} -- ${파일경로} ${원하는파일또있으면더써도됨}
$ git checkout 4d4439d -- webapp/package.json
```