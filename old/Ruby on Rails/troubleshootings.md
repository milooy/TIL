# There is a version mismatch between the spring client and the server.

## 현상

레일즈 프리로더 젬인 spring 젬이 업데이트 되었을 때 발생

## 해결

백그라운드에서 실행 중인 프로세스를 멈춰야 하기 때문에 터미널에서 아래 명령어를 입력한다.

```
$ spring stop
```

## 참고 문서

- [Client-server version mismatch when multiple versions of spring installed for the current Ruby · Issue #295 · rails/spring](https://github.com/rails/spring/issues/295)
