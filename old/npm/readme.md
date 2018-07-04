# npm

package.json 생성하기. README.md 가 있어야 함.

```
    npm init
```

package.json의 devDependencies에 추가.

```
    npm install grunt --save-dev
```


## Truble shooting

### 모듈 설치시 Error: Eaccess 발생

`npm install` 시 아래와 같은 에러가 나는 경우.

```bash
npm ERR! Error: EACCES, open '/Users/chietala/.npm/-/all/.cache.json'
npm ERR!  { [Error: EACCES, open '/Users/chietala/.npm/-/all/.cache.json']
npm ERR!   errno: 3,
npm ERR!   code: 'EACCES',
npm ERR!   path: '/Users/chietala/.npm/-/all/.cache.json' }
npm ERR!
npm ERR! Please try running this command again as root/Administrator.

npm ERR! System Darwin 12.2.0
npm ERR! command "node" "/usr/local/bin/npm" "search" "bower"
npm ERR! cwd /Users/chietala
npm ERR! node -v v0.10.4
npm ERR! npm -v 1.2.18
npm ERR! path /Users/chietala/.npm/-/all/.cache.json
npm ERR! code EACCES
npm ERR! errno 3
npm ERR! stack Error: EACCES, open '/Users/chietala/.npm/-/all/.cache.json'
npm ERR!
npm ERR! Additional logging details can be found in:
npm ERR!     /Users/chietala/npm-debug.log
npm ERR! not ok code 0
```

이렇게 해결.

```bash
  sudo chown -R $(whoami) ~/.npm
```