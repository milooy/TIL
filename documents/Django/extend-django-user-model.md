# 장고 유저 모델 확장하기

## Situation
장고로 개인 프로젝트를 개발하는 중이다.
장고 유저 모델을 사용해 회원관리를 할 예정인데, 기본 User는 `username`을 Id로 사용한다. 나는 `email`을 ID로 사용하고 싶고, 회원마다 아바타도 추가하고 싶다.

## Solution
### accounts/models.py
```python
# coding: utf-8

from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser,
    PermissionsMixin)


class MyUserManager(BaseUserManager):
    def create_user(self, email, nickname, password=None):
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=MyUserManager.normalize_email(email),
            nickname=nickname,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, nickname, password):
        u = self.create_user(email=email,
                             nickname=nickname,
                             password=password,
                             )
        u.is_admin = True
        u.save(using=self._db)
        return u


class MyUser(AbstractBaseUser,  PermissionsMixin):
    email = models.EmailField(
        verbose_name='email',
        max_length=255,
        unique=True,
    )
    nickname = models.CharField(
        u'닉네임', 
        max_length=10, 
        blank=False, 
        unique=True, 
        default='')
    avatar = models.ImageField(
        null=True,
        blank=True,
        upload_to='image/avatar/',
    )

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = MyUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nickname']

    def get_full_name(self):
        # The user is identified by their email address
        return self.email

    def get_short_name(self):
        # The user is identified by their email address
        return self.email

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin

```
[django 공식 사이트](https://docs.djangoproject.com/en/dev/topics/auth/customizing/#a-full-example) auth부분에서 최하단 full-example을 참고해 모델을 짠다.
`AbstractBaseUser`를 상속받아 새로운 유저 모델을 만들고, `USERNAME_FIELD = 'email'`로 이메일을 ID로 사용한다 명시해준다.

## settings.py
```python
AUTH_USER_MODEL = 'accounts.MyUser'
```
`settings.py`에 유저 모델을 방금 만든걸로 사용한다 명시한다.

## 다른앱/models.py
```python
from django.conf import settings


class Meetup(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL)
    title = models.CharField(max_length=200)
```
다른 앱에서는 그 세팅값으로 호출하면 된다.

### accounts/forms.py
```python
from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.core.files.images import get_image_dimensions

from .models import MyUser


class SignupForm(UserCreationForm):
    email = forms.EmailField(required=True, widget=forms.EmailInput(
        attrs={
            'class': 'form-control',
            'placeholder': 'Email',
            'required': 'True',
        }
    ))
    nickname = forms.RegexField(label="Nickname", max_length=30,
                                regex=r'^[\w.@+-]+$',
                                help_text="Required. 30 characters or fewer. Letters, digits and "
                                          "@/./+/-/_ only.",
                                error_messages={
                                    'invalid': "This value may contain only letters, numbers and "
                                               "@/./+/-/_ characters."},
                                widget=forms.TextInput(attrs={
                                    'class': 'form-control',
                                    'placeholder': 'Nickname',
                                    'required': 'true',
                                }))
    password1 = forms.CharField(
        label='Password',
        widget=forms.PasswordInput(
            attrs={
                'class': 'form-control',
                'placeholder': 'Password',
                'required': 'True',
            }
        )
    )
    password2 = forms.CharField(
        label="Password confirmation",
        widget=forms.PasswordInput(
            attrs={
                'class': 'form-control',
                'placeholder': 'Password confirmation',
                'required': 'True',
            }
        ),
        help_text="Enter the same password as above, for verification."
    )

    class Meta: # SignupForm에 대한 기술서
        model = MyUser
        fields = ("email", "nickname", "avatar", "password1", "password2",) # 작성한 필드만큼 화면에 보여짐

    def clean_avatar(self):
        avatar = self.cleaned_data['avatar']

        try:
            w, h = get_image_dimensions(avatar)

            #validate dimensions
            max_width = max_height = 500
            if w > max_width or h > max_height:
                raise forms.ValidationError(
                    u'Please use an image that is '
                    '%s x %s pixels or smaller.' % (max_width, max_height))

            #validate content type
            main, sub = avatar.content_type.split('/')
            if not (main == 'image' and sub in ['jpeg', 'pjpeg', 'gif', 'png']):
                raise forms.ValidationError(u'Please use a JPEG, '
                                            'GIF or PNG image.')

            #validate file size
            if len(avatar) > (20 * 1024):
                raise forms.ValidationError(
                    u'Avatar file size may not exceed 20k.')

        except AttributeError:
            """
            Handles case when we are updating the user profile
            and do not supply a new avatar
            """
            pass

        return avatar


class LoginForm(AuthenticationForm):
    email = forms.CharField(
        max_length=30,
        widget=forms.TextInput(
            attrs={
                'class': 'form-control',
                'placeholder': 'nickname',
                'required': 'True',
            }
        )
    )
    password = forms.CharField(
        widget=forms.PasswordInput(
            attrs={
                'class': 'form-control',
                'placeholder': 'Password',
                'required': 'True',
            }
        )
    )
```
필요하다면 form들을 명시해준다.
여기서 `avatar = forms.ImageField()`처럼 avatar는 따로 명시하지 않아도 된다. 이따가 `clean_avatar`로 추가할것이다. (얘때매 한참 삽질.)

아래 두 개의 링크를 참고해 코딩했다.
http://stackoverflow.com/questions/6396442/add-image-avatar-to-users-in-django
https://coderwall.com/p/bz0sng/simple-django-image-upload-to-model-imagefield

### signup.html
```html
<form id="signup" class="form-horizontal" method="post" action="{% url 'signup' %}" enctype="multipart/form-data">
    {% csrf_token %}

    <!-- Username input-->
    <div class="row control-group">
        <div class="form-group col-xs-12 floating-label-form-group controls">
            {{ signupform.username.label_tag }}
            {{ signupform.username }}
            <span class="field-error">
            {{ signupform.username.errors|striptags }}
            </span>
        </div>
    </div>

    <!-- Email input-->
    <div class="row control-group">
        <div class="form-group col-xs-12 floating-label-form-group controls">
            {{ signupform.email.label_tag }}
            {{ signupform.email }}
            <span class="field-error">
            {{ signupform.email.errors|striptags }}
            </span>
        </div>
    </div>

    {{ signupform.nickname.label_tag }}
    {{ signupform.nickname }}
    {{ signupform.nickname.errors|striptags }}

    {{ signupform.avatar.label_tag }}
    {{ signupform.avatar }}
    {{ signupform.avatar.errors|striptags }}

    <!-- Password1 input-->
    <div class="row control-group">
        <div class="form-group col-xs-12 floating-label-form-group controls">
            {{ signupform.password1.label_tag }}
            {{ signupform.password1 }}
            <span class="field-error">
            {{ signupform.password1.errors|striptags }}
            </span>
        </div>
    </div>

    <!-- Password2 input-->
    <div class="row control-group">
        <div class="form-group col-xs-12 floating-label-form-group controls">
            {{ signupform.password2.label_tag }}
            {{ signupform.password2 }}
            <span class="field-error">
            {{ signupform.password2.errors|striptags }}
            </span>
        </div>
    </div>

    <br>

    <!-- Button -->
    <div class="row">
        <div class="form-group col-xs-12">
            <button id="signup" name="signup" class="btn btn-block btn-default" type="submit">Sign Up</button>
            <hr>
            <center>
            Or <a href="{% url 'login' %}"><u>log in</u></a>
            if you have an account.
            </center>
        </div>
    </div>
</form>
```
`enctype="multipart/form-data"` 적어주고, 아까 작성한 모델대로 폼을 넣어준다.

### accounts/views.py
```python
from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.core.urlresolvers import reverse

from .forms import SignupForm


def signup(request):
    signupform = SignupForm()
    if request.method == "POST":
        signupform = SignupForm(request.POST, request.FILES)
        if signupform.is_valid():
            user = signupform.save(commit=False)
            user.email = signupform.cleaned_data['email']
            user.avatar = signupform.clean_avatar()
            user.save()

            return HttpResponseRedirect(
                reverse("signup_ok")
            )

    return render(request, "signup.html", {
        "signupform": signupform,
    })

```
user save하기 전에 email이랑 avatar는 clean한 데이터로 넣어주고 save한다.
파일 업로드를 위해 `SignupForm(request.POST, request.FILES)`에 request.FILES도 추가해줬다.

## Conclusion
처음에 이유를 모르게 계속 안 되어서 스트레스 받았던 부분이다.
하고 나니까 되게 속시원하네!! 
