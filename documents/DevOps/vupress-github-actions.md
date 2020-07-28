# GitHub Actions로 Vuepress 배포하기

2020.07.28

이 글을 쓴 TIL 사이트는 [Vuepress](https://vuepress.vuejs.org/)로 말아져 있당
커스텀하기 편하고 가볍다.
정적 사이트 장점을 살려 GitHub Pages에 배포해뒀다.

사이트를 배포하는 가장 기본적인 방법은
매번 글을 작성할때마다 로컬에서 빌드 -> gh-pages 브랜치에 force push 하는건디
증맬 귀찮은 일이다.

package.json에 deploy 스크립트를 만들어서 가-끔 생각날때마다 돌려주곤 했는데...

```
"scripts": {
    "dev": "vuepress dev documents",
    "build": "vuepress build documents",
    "commit": "vuepress build documents && git add build -f && git commit -m 'Subtree commit'",
    "deploy": "git push origin `git subtree split --prefix build master`:gh-pages --force"
  },
```

GitHub Actions를 사용해
코드를 푸시할때마다 자동으로 위 스크립트가 돌도록 업데이트를 해봤다.
(그전까진 왜 안한겨.. 생각보다 나의 참을성이 좋구머잉)

하는법 간단히 기록해두기~

## Step 1: Vuepress로 사이트를 만든다

다큐멘테이션 보면 금방 만들어용 https://vuepress.vuejs.org/
다 만들면 GitHub 저장소에 푸시하셈.

## Step 2: 저장소에 GitHub Pages 세팅하기.

저장소 Settings탭 -> GitHub Pages 섹션에 가서
Source를 'gh-pages'로 바꾼다. 그러면 gh-pages브랜치에 있는 index.html 읽어서 사이트를 보여줌.

![image](https://user-images.githubusercontent.com/3839771/88663984-56446f80-d117-11ea-9653-5c8a6d3a9d42.png)

## Step 3: workflow 파일 생성

저장소 루트에 `.github/workflows/main.yml` 파일을 만든다. main말고 원하는 다른 이름 써도 무방.

아래 코드를 복사하고 저장한다.
jenkey2011이란 깃헙 유저가 배포한 action 가져다 쓴거다.
https://github.com/marketplace/actions/vuepress-deploy

Dockerfile, Docker Hub 이라고 생각함 될듯. 선언적 문법 매력적이다. 일해라 절해라 적어두기.

[main.yaml](https://github.com/milooy/TIL/blob/master/.github/workflows/main.yml) 참고

## Step 4: GitHub 저장소에 환경변수 세팅

위 yaml 파일 보면 `ACCESS_TOKEN`를 쓰는데, GitHub 저장소에 ACCESS_TOKEN 환경변수를 세팅해줘야 한다. 

먼저 내가 나라는걸 증명하는 프라이빗 토큰을 발급받자.
`Settings > Developer settings > Personal access tokens`에 들어가
https://github.com/settings/tokens 

Generate new token 하면 된다(기존에 만들어놨다면 재활용 해도 된다)
![image](https://user-images.githubusercontent.com/3839771/88664767-893b3300-d118-11ea-95cc-93a962eef299.png)

이렇게 만든 토큰을
`저장소 Settings > Secrets > New secret`에 key는 `ACCESS_TOKEN`라 적고 value에 토큰을 복사 붙여넣기 하면 된다. 고럼 yaml 파일이 돌면서 저장소 환경변수를 참고해감.

![image](https://user-images.githubusercontent.com/3839771/88664600-437e6a80-d118-11ea-969e-b07d88bcf008.png)

## Step 5: Happy TIL-ing!

yaml 파일을 GitHub에 올린다. 코드를 Push할때마다 자동으로 GitHub액션이 돌며 위에 선언한 Yaml코드가 실행된다.
저장소 Actions 탭에서 확인 가능!

![image](https://user-images.githubusercontent.com/3839771/88665046-f949b900-d118-11ea-9934-de8c9f1858a5.png)
