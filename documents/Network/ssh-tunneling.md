# SSH

- Secure Shell
- 네트워크 보안을 위해 만들어진 프로토콜
- 인증/암호화/무결성/압축

## 터널링
- a.k.a Forwarding
- A에 SSH클라이언트 설치하고, B에도 설치하고, A의 SSH클라이언트를 통해 SSH서버에 접속. 이 연결 통로를 `터널`이라 한다.
- 암호화 등을 통해 터널처럼 외부로부터 연결 보호.
- 이 터널을 다른 애플리케이션이 이용 가능. => `포트 포워딩(Port Forwarding)`

## 사용 예
```shell
$ ssh 서버명
```

### Local Port Forwarding
```shell
$ ssh -L 포트번호1:호스트명:포트번호2 서버명
```
- 포트번호1: SSH 클라이언트가 검사(Listen)하고 있을 포트번호 지정
    + 이 포트번호1로 데이터가 왔을 때 SSH클라가 SSH서버로 데이터를 전송
    + SSH서버는 이 데이터를 다시 `포트번호2`로 보냄
*참고: 포트
- 1024~65535사이의 임의의 숫자
- 1~1023까지 포트는 예약된 포트로 보통 수퍼유저만 지정 가능

## 나의 예시
상황: 회사에서 아마존 DB에 접속하는 키가 있고, 그걸 동료에게 받아서 사용
해결: 동료 개발자에게 키를 받아서 `~/.ssh/`폴더에 `어쩌구-저쩌구.pem`이란 이름으로 `RSA PRIVATE KEY`를 넣었다.

그리고 아래 명령어를 넣었더니 
```shell
$ ssh-add -K <key filename>
```

퍼미션 에러가 떴당 ^^; 햄복할수업성
```
ssh-add -K 어쩌구-저쩌구.pem
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@         WARNING: UNPROTECTED PRIVATE KEY FILE!          @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
Permissions 0644 for '어쩌구-저쩌구.pem' are too open.
It is required that your private key files are NOT accessible by others.
This private key will be ignored.
```


[이 글](http://www.howtogeek.com/168119/fixing-warning-unprotected-private-key-file-on-linux/)을 참고해 퍼미션을 변경해주니 완료!

```shell
$ ssh-add -K 어쩌구-저쩌구.pem
```

실행을 해본다.
```shell
$ ssh -L 포트번호1:호스트명:포트번호2 서버명
```


## refer
http://www.hanbit.co.kr/network/view.html?bi_id=547
http://118k.tistory.com/64
