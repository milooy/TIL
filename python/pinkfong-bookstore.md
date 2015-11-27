## 파이님 주소
```
http://10.0.0.249:8987/
```

## Tips
- 이 화면은 무슨 템플릿을 쓰지?
    + urls.py를 본다.
        * 정규식으로 되어있다.
        * 그 안에서도 또 `url(r'^cart/', include('shoppingcart.urls')),`처럼 urls가 있다.
- 메인 화면에 home_banner가 3개만 나오는걸 4개로 바꾸고 싶다
    + django admin으로 데이터 하나 더 올리고, store>views.py에서
    + `context['home_banner'] = Featured.live_home_banner_objects.all()[:4]` 3을 4로 바꾼다.
- 메인 화면 페이지네이션을 하고싶다.
    + store > views.py 에서 `class Home(TemplateView):`로 리스트뷰에서 템플릿뷰로 고쳐줬다.
    + `context = super(Home, self).get_context_data(**kwargs)` 이건 상속받아서 가져온거다.
    + product model에서 가져오고 싶은거니까 `from product.models import Product`를 써주고, 
    + `context['product_best_4'] = Product.objects.all()[:4]`처럼 'product_best_4'란 이름으로 Product objects를 가져온다. 뒤는 array처럼 취급해서 4개만 잘라온다고 함수적이게 한거.

## sign up 로직
- `http://localhost:8000/event/teaser/`로 접속
    + 회원가입 버튼 누름
- `/event/teaser/signup` 접속
    + view: `profile.SignupView.as_view()`
        * `SignupView`클래스를 본다.
        * FormView 받아옴
        * 템플릿은 `teaser/signup.html`
        * form은 위에서 받아온 `event.form`을 `SignupForm`이름으로 쓴다
        * 클래스에서 as_view()하면 안의 메서드들 다 실행시키는건가?
        * `form_valid`(폼뷰 기본제공)메서드로 폼 잘 적혔는지 체크한다.
            - valid form data가 POST되었을 때 불리는 메서드
            - 기존에 만든 form에서 세이브 클래스를 간다.
            - HTTPResponse를 리턴한다.
    + `forms.py`: form.save()
        * 여기서 self는 this같은건가?
        * def clean(self)는 언제 불리는거지, 자동으로 언제? 폼 불리면?
        * `def clean`
            - `cleaned_data` = super(SignupForm, self).clean() 하면 cleaned_data에 클린해온게 저장됨. form 기본제공.
                + 얜 어디서든 접근가능?
            - 비번 두개 맞나 체크
        * cd에 cleaned된 데이터를 저장
        * `_create_user`호출. 왜 앞에 _를 붙이지?
    + `models.py`
        * 디비에 모델이 저장되며 훅 낚아챈다
        * post_save.connect(create_user_profile, sender=User)
        * 프로필 모델을 유저 생성시 자동으로 만들고 걍 유저 생성시는 비활성화로 고쳐준다.
    * `SignupView`
        * `get_success_url` 기본 메서드. 폼이 성공적으로 validated되었을 때 불린다. 'welcome'으로 리다이렉트시킨다.

url 뒤에 /로 끝나는게 좋은 이유 
alt cmd l : 자동 포매팅
pep8 <- 포매팅에 대한 규칙
cmd alt o : 임포트 모듈 정리
alt enter: 커서 있는 것의 임포트 해오기 

## Refer
[meterializecss](http://materializecss.com/grid.html)
