# 스마트스터디 파이썬 프로젝트 시작하기

## 일단 버전,의존성 관리
python-set-environments 참고

## 스마트스터디 내부 파이썬 라이브러리를 쓰고 싶다면
```
pip install -i https://pypi.smartstudy.co.kr/devops/prod/ cleverstorage
```
뒤에 패키지명을 붙여줌.

### 파이님꺼
```shell
#!/usr/bin/env bash
eval "$(pyenv init -)"
export PYENV_ROOT="$HOME/.pyenv"
export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv virtualenv-init -)"
pyenv activate pinkfong-store
pip install -i https://pypi.smartstudy.co.kr/devops/prod/ -r dev-requirements.txt --upgrade
bower update
```

[스스 가이드](https://github.smartstudy.co.kr/d9/rfcs/blob/82c67d011eb2f0477fb5f79bc270a2d234ab0306/text/0001-smartstudy-pypi.md)

## 파이썬 루트 잡아주기
가상환경을 나누어 쓰고 있으니, 따로 잡아줘야 한다.

preferences > Project:... > Project Interpreter > 설정 버튼 > add local > ~ -.pyenv-versions-pinkfongstore-bin-python을 눌러준다.

우리가 설치한 라이브러리들을 보려면,
Exteral Libraries > site-packages 를 보면 나온다.

## Less 변경될 때마다 CSS생성
preferences > Tools > File Watchers > +를 눌러서 들어가서, less로 들어가 Program에 /usr/local/bin/lessc 인 레스 파일경로를 찾아준다.

## 지금까지 만들어진 걸로 DB생성
```
 ./manage.py migrate
```

## bower
```shell
bower update
```
하면 프로젝트에서 bower.json을 찾아서 설치 진행해준다

## 더미데이터 넣기
```shell
./manage.py createsuperuser
```

## iphthon 노트북 띄우기
```shell
./manage.py shell_plus --notebook
```

## 패키지 업데이트
npm install같은거.
```shell
pip install -r /path/to/requirements.txt
pip install -r requirements.txt

#혹은

pip install -i https://pypi.smartstudy.co.kr/devops/prod/ -r dev-requirements.txt --upgrade 
```

## setup.py
```shell
python setup.py install
```

## 코드 정리
```
flake8
pep8
```
