# Introduction to Docker

## Hello world
```bash
# 'hello-world'란 컨테이너 돌리기. 로컬에 있으면 그거 돌리고 없으면 Docker hub에서 찾아서 pull받음
$ docker run hello-world
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
9db2ca6ccae0: Pull complete
Digest: sha256:4b8ff392a12ed9ea17784bd3c9a8b1fa3299cac44aca35a85c90c5e3c7afacdc
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.

# 컨테이너 이미지들 보기
$ docker images
REPOSITORY     TAG      IMAGE ID       CREATED       SIZE
hello-world    latest   1815c82652c0   6 days ago    1.84 kB

# 돌고 있는 컨테이너 보기. 아까 hello-world는 바로 exit되서 안나온다
$ docker ps

# 끝난 컨테이너도 보기
$ docker ps -a
CONTAINER ID      IMAGE           COMMAND      ...     NAMES
6027ecba1c39      hello-world     "/hello"     ...     elated_knuth
358d709b8341      hello-world     "/hello"     ...     epic_lewin
```

## 빌드(Build)

간단한 노드를 베이스로 하는 도커 이미지를 만들어보자!

```bash
$ mkdir test && cd test

cat > Dockerfile <<EOF
```

Dockerfile 작성하기
```bash
# 노드 버전6을 가리키는 오피셜 도커 이미지를 부모 이미지로 함
FROM node:6

# 워킹 디렉토리 설정
WORKDIR /app

# 현재 디렉토리의 컨텐츠를 /app에 복사
ADD . /app

# 컨테이너에 80번 포트를 뚫어서 접근 가능하도록
EXPOSE 80

# app.js를 노드로 돌린다
CMD ["node", "app.js"]
EOF
```

app.js 만들기. 간단히 80번 포트에 hello world 띄워주는 HTTP Server
```js
const http = require('http');

const hostname = '0.0.0.0';
const port = 80;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
        res.end('Hello World\n');
});

server.listen(port, hostname, () => {
    console.log('Server running at http://%s:%s/', hostname, port);
});

process.on('SIGINT', function() {
    console.log('Caught interrupt signal and will exit');
    process.exit();
});
```

```bash
# 도커 이미지 빌드하기. -t는 태그달기, node-app이란 이름의 이미지고 tag는 0.1이라는것. 태그는 도커 이미지 빌드할때 꼭 적는게 좋다. 안적으면 latest란 이름으로 만들어지는데 최신껄 구별하기 어려움.
$ docker build -t node-app:0.1 .
Sending build context to Docker daemon  3.072kB
Step 1/5 : FROM node:6
6: Pulling from library/node
ab1fc7e4bf91: Pull complete
35fba333ff52: Pull complete
f0cb1fa13079: Pull complete
3d1dd648b5ad: Pull complete
49f7a0920ce1: Pull complete
1d199f738c5f: Pull complete
1f5b9192d3e9: Pull complete
6b45c21448e5: Pull complete
Digest: sha256:b567cbc706f6d8f498adc0b056f3e904043478a2c814124af62fc9f18ffcb9c2
Status: Downloaded newer image for node:6
 ---> 554a99f911d9
Step 2/5 : WORKDIR /app
Removing intermediate container 613e84f7c38e
 ---> 19526c64979a
Step 3/5 : ADD . /app
 ---> 36ec7ba933e7
Step 4/5 : EXPOSE 80
 ---> Running in 51c2424677d4
Removing intermediate container 51c2424677d4
 ---> a07151f17077
Step 5/5 : CMD ["node", "app.js"]
 ---> Running in fd7b7d36c33a
Removing intermediate container fd7b7d36c33a
 ---> 1b627525501c
Successfully built 1b627525501c
Successfully tagged node-app:0.1

# 컨테이너 이미지들 보기. node-app은 node를 베이스로 한 이미지다. node를 지우려면 node-app을 먼저 지워야 함. node:slim이나 node:alpine은 용량이 작은 이미지니 잘 골라서 써라.
$ docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
node-app            0.1                 1b627525501c        2 minutes ago       882MB
node                6                   554a99f911d9        3 days ago          882MB
hello-world         latest              fce289e99eb9        3 weeks ago         1.84kB
```

## 돌리기 (Run)
```bash
# --name 플래그를 붙여 my-app이라고 이름을 지어줄 수 있다. -p 플래그로는 호스트 포트 4000을 컨테이너 포트 80으로 맵해줄 수 있다(아까 node-app을 80으로 띄웠으니까). 이젠 내 로컬에서 localhost:4000 으로 접근 가능. 포트 매핑 안하면 localhost에서 못 본다. -d플래그 붙이면 터미널 세션을 꺼도 백그라운드에서 돌아감
$ docker run -p 4000:80 --name my-app node-app:0.1
Server running at http://0.0.0.0:80/
```

터미널 하나 더 띄워서 다음 명령어 적는다
```bash
$ curl http://localhost:4000
Hello World
```

```bash
# 원래 터미널로 돌아가 컨테이너를 멈추고 remove 해준다.
$ docker stop my-app && docker rm my-app

# 이번엔 -d 플래그를 붙여 백그라운드에서 띄워준다.
$ docker run -p 4000:80 --name my-app -d node-app:0.1

# 뭐가 돌아가고 있나 확인
$ docker ps

# 로그는 아래 명령어로 볼 수 있다.
$ docker logs [container_id]
Server running at http://0.0.0.0:80/

# app.js를 조금 수정하고, 태그를 0.2로 달아 새로 빌드를 해본다. step2까지는 캐시에서 불러온 걸 볼 수 있다. 3부터는 새로 써진걸로 다시 빌드함.
docker build -t node-app:0.2 .
Step 1/5 : FROM node:6
 ---> 67ed1f028e71
Step 2/5 : WORKDIR /app
 ---> Using cache
 ---> a39c2d73c807
Step 3/5 : ADD . /app
 ---> a7087887091f
Removing intermediate container 99bc0526ebb0
Step 4/5 : EXPOSE 80
 ---> Running in 7882a1e84596
 ---> 80f5220880d9
Removing intermediate container 7882a1e84596
Step 5/5 : CMD node app.js
 ---> Running in f2646b475210
 ---> 5c3edbac6421
Removing intermediate container f2646b475210
Successfully built 5c3edbac6421
Successfully tagged node-app:0.2

# 다른 컨테이너를 다른 포트(8080)으로 띄워본다

$ docker run -p 8080:80 --name my-app-2 -d node-app:0.2
```

## 디버그(Debug)





