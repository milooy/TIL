## 파이님 주소
```
http://10.0.0.249:8987/
```

## Tips
- 메인 화면에 home_banner가 3개만 나오는걸 4개로 바꾸고 싶다
    + admin으로 하나 더 올리고, store>views.py에서
    + `context['home_banner'] = Featured.live_home_banner_objects.all()[:4]` 3을 4로 바꾼다.
- 

## Refer
[meterializecss](http://materializecss.com/grid.html)
