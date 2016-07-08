## git ignore이 안될 때

이미 add하고 올렸던 파일은 캐시가 남아 gitignore에 추가해도
사라지지 않는 경우가 있다.

그럴 땐 캐시를 삭제해주면 된다.
```shell
git rm --cached name_of_file
```

## refer
http://stackoverflow.com/questions/4308610/how-to-ignore-certain-files-in-git
