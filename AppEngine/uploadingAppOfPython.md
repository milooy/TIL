## 콘솔에서 python app 업로드 하기

```bash
  # https://cloud.google.com/appengine/docs/python/gettingstartedpython27/uploading

  $ appcfg.py --oauth2 -A {application ID} update ./

  # 경로는 app.yaml 있는 application root.
  # app.yaml에 `application:`가 설정되어있어도 {application ID}로 배포가능.
  # --oauth2 옵션이 없으면 암호 입력을 해야함. (https://cloud.google.com/appengine/docs/python/tools/uploadinganapp#Python_Password-less_login_with_OAuth2)
```