# ngrok을 pow와 함께 사용하기

## 문제

ngrok을 pow와 함께 사용하고 브라우저에서 접근하면 pow 기본 설정 화면이 나온다.

```
$ ngrok http myapp.dev:80
```

## 해결

`~/.powconfig` 파일에 아래 내용을 적어준다.

```
export POW_EXT_DOMAINS=ngrok.io
```

## 기타

서브도메인을 사용하려면 `-subdomain` 옵션을 추가한다.
```
$ ngrok http -subdomain=myapp myapp.dev:80
```

## 참고 문서

- [ngrok - secure introspectable tunnels to localhost](https://ngrok.com/)
