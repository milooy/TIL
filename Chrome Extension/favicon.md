# 검색 기록 favicon 가져오기

검색 기록 API를 통해서 URL을 가져온 후 `chrome://favicon/{{url}}` 경로를 통해 favicon을 가져올 수 있다.

## 주의

`manifest.json` 파일에 권한을 설정하지 않으면 **Not allowed to load local resource** 오류가 발생한다.

```
    "permissions": [
        "chrome://favicon/"
    ]
```
