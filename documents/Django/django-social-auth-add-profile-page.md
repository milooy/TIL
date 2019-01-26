# Django social auth 프로필 추가 페이지 제작

## Problem
`django-social-auth`를 사용하여 핑크퐁 북스토어에 페이스북 로그인을 달았다. 
우리는 추가 정보로 `핸드폰 번호`, `SMS 수신 동의`, `email 수신 동의`를 따로 받는데, 페이스북 가입 시에도 이를 처리할 페이지가 필요하다.

## Solution
1. optional_user_data: 유저 데이터를 받을 템플릿 연결
2. save_profile: 위의 템플릿에서 받은 데이터를 프로필에 저장

두 개의 custom pipeline을 만든다. 사실 1과 2를 합치고 싶은데, 예제를 참고해 하다보니 두 함수로 나뉘게 되었다. *장알못의 슬픔...*

## settings.py
```python
SOCIAL_AUTH_PIPELINE = (
    'social.pipeline.social_auth.social_details',
    'social.pipeline.social_auth.social_uid',
    'social.pipeline.social_auth.auth_allowed',
    'social.pipeline.social_auth.social_user',
    'social.pipeline.user.get_username', 

    'accounts.social.optional_user_data', # 얘 추가!
    
    'social.pipeline.user.create_user', # 중간에 create_user가 끼어있다
    
    'accounts.social.save_profile', # 얘 추가!
    
    'social.pipeline.social_auth.associate_user',
    'social.pipeline.social_auth.load_extra_data',
    'social.pipeline.user.user_details'
)
```

optional_user_data, save_profile을 파이프라인에 추가한다.
optional_user_data는 `@partial`이기 때문에 create_user위에 두어야 한다.
이는 [공식 예제](https://python-social-auth.readthedocs.org/en/latest/use_cases.html#enable-a-user-to-choose-a-username-from-his-world-of-warcraft-characters)를 참고하였다.

save_profile 공식 예제: [링크](http://python-social-auth.readthedocs.org/en/latest/pipeline.html)

## social.py
```python
# -*- coding: utf-8 -*-
from functools import wraps

from django.shortcuts import render_to_response


def partial(func):
    @wraps(func)
    def wrapper(strategy, pipeline_index, *args, **kwargs):
        out = func(strategy=strategy, pipeline_index=pipeline_index,
                    *args, **kwargs) or {}
        if not isinstance(out, dict):
            values = strategy.partial_to_session(pipeline_index, *args,
                                                 **kwargs)
            strategy.session_set('partial_pipeline', values)
        return out
    return wrapper


@partial
def optional_user_data(backend, details, response, request, user, is_new=False, *args, **kwargs):
    if backend.name == 'facebook' and is_new:
        data = backend.strategy.request_data()
        if data.get('phone') is None:
            return render_to_response('registration/signup_option.html', {'fb_details': details, })
        else:
            return {'phone': data.get('phone')}


def save_profile(backend, user, response, is_new, *args, **kwargs):
    if backend.name == 'facebook' and is_new:
        data = backend.strategy.request_data()

        profile = user.profile
        profile.phone = data.get('phone', '')
        profile.email = response.get('email', '')
        profile.name = response.get('name', '')
        profile.sms_receiving_consent = data.get('sms_receiving_consent', '')
        profile.email_receiving_consent = data.get('email_receiving_consent', '')
        profile.save()

```

**optional_user_data**
backend가 facebook이고, 새로운 유저라면(로그인/가입 동시에 처리하기 때문에 `is_new`면 첫 가입 상태로 판별하면 된다) `signup_option.html`템플릿을 보여준다.
`data`에 `backend.strategy.request_data()`를 저장한다. 이는 form에서 보낸 데이터들이 저장된다. 맨 처음 접근하면 `phone` 데이터가 없으니 `if data.get('phone') is None:`로 들어간다.
`signup_option.html`의 form에서 `post`로 데이터를 보내면 else타고 나간다.

맨 앞에 `@partial`도 붙여야 한다. 내 경우는 왠지 모르게 `from social.pipeline.partial import partial`이 계속 에러나서 그냥 @partial함수 자체를 가져왔다. (삽질삽질)

**save_profile**
`optional_user_data`에서 저장한 form data를 `data`변수에 저장한다. 
심호흡을 한 뒤 response나 data에서 원하는 데이터들을 받아와 `user.profile`에 저장한다.
`data.get('sms_receiving_consent', '')`에서 뒤에 ''를 넣지 않으면 `null`인 경우에 아무것도 저장이 안나서 에러가 날 수 있다.

## signup_option.html
```html
{% block content %}
    <h4 class="header">선택정보 입력</h4>
    안녕하세요, {{ fb_details.username }}님!
    <form id="signup_form" method="post" action="/social/complete/facebook/">
        {% csrf_token %}
        <input type="hidden" name="next" value="{{ next }}"/>

        <div class="row">
            <h5 class="header col s12">선택 정보</h5>
            <div class="input-field col s12">
                <input class="validate" id="id_phone" name="phone" type="tel">
                <label class="s12" for="id_phone">휴대폰 번호</label>
            </div>
            <div class="col s12">
                <div class="">
                    <div class="checkbox">
                        <input checked="checked" id="id_email_receiving_consent" name="email_receiving_consent" type="checkbox"> <label for="id_email_receiving_consent">이메일 수신 동의</label>
                    </div>
                </div>
            </div>
            <div class="col s12">
                <div class="">
                    <div class="checkbox">
                        <input checked="checked" id="id_sms_receiving_consent" name="sms_receiving_consent" type="checkbox"> <label for="id_sms_receiving_consent">SMS 수신 동의</label>
                    </div>
                </div>
            </div>
        </div>
        <div class="action">
            <button class="btn btn-block ms-small right" type="submit">
                <i class="material-icons">send</i>
                가입하기
            </button>
        </div>
    </form>
{% endblock %}
```

action을 `action="/social/complete/facebook/"`처럼 적어준다. 나는 `python-social-auth`는 url 앞에 `/social/`을 달아줬기 때문에 그것도 붙였다.


## Conclusion
점점 **장**(고)**알**(지도)**못**(하는사람)에서 **장덜알못**이 되어가고 있다.
장고덕에 차근차근 혼자 기능을 만들어가고 있다. 고맙고 미운 장고.

