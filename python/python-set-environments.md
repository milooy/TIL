# 파이썬 개발환경 세팅하기
## 개괄
수많은 프로젝트와, 그 프로젝트 별 버전관리 그리고 패키지들의 의존성 관리를 위해
`pyenv`와 `virtualenv`, 그리고 `autoenv`를 설치한다.
- pyenv: 로컬에 다양한 파이썬 버전 설치
- virtualenv: 로컬에 다양한 파이썬 환경 구축. 패키지 의존성 해결
- autoenv: 프로젝트 폴더 들어갈때마다 자동으로 개발환경 세팅됨.
[참고 링크](https://dobest.io/how-to-set-python-dev-env/)

## pyenv
```shell
brew update
brew install pyenv

# bash_profile에 추가. 나는 zsh라 ~/.zshrc에 추가하였다.
echo 'eval "$(pyenv init -)"' >> ~/.bash_profile  

# pyenv 사용하기. 현재 설치한 버전들이 다 나온다.
pyenv version

#설치할 수 있는 파이썬 리스트를 보여주고, 거기서 골라서 설치
pyenv install -list
pyenv install 2.7.10
python -version #버전확인
pyenv global 2.7.10 #설치한 파이썬 버전 사용
```

### Build failed: "ERROR: The Python zlib extension was not compiled. Missing the zlib?" 이 뜬다면
xcode command line tools를 설치한다. [링크](https://developer.apple.com/downloads/)
그래도 안되면 [여기](https://github.com/yyuu/pyenv/wiki/Common-build-problems#build-failed-error-the-python-zlib-extension-was-not-compiled-missing-the-zlib) 참고


## virtualenv
```shell
brew install pyenv-virtualenv

# pyenv init 안했으면 위에것도 bash_profile이나 zshrc에 추가해준다. 
eval "$(pyenv init -)"
eval "$(pyenv virtualenv-init -)"

# 2.7.10을 사용한 pinkfong-tv라는 프로젝트 만들기
pyenv virtualenv 2.7.10 pinkfong-tv

# 만든 이름으로 activate하기
pyenv activate pinkfong-tv

# install된 패키지들을 보여주거나 파일로 저장
pip freeze 
pip freeze > requirement.txt 

# 새로운 환경에서 패키지들을 재설치
pip install -r requirement.txt

# django 설치하기
pip install django

# pip upgrade
pip install --upgrade pip

# deactivate하기
pyenv deactivate
```

## autoenv
```shell
brew install autoenv

# zshrc에 매 세션마다 autoenv자동실행 코드 삽입
echo 'source /usr/local/opt/autoenv/activate.sh' >> ~/.zshrc

# 프로젝트 폴더로 들어가서, .env파일 만들기
vi .env

# .env에는 activate하고 싶은 virtualenv명을 적는다.
pyenv activate pinkfong-tv

# 이건 깃에 올릴 필요가 없으니, global gitignore을 만든다
touch ~/.gitignore
git config --global core.excludesfile ~/.gitignore
vi ~/.gitignore

# .gitignore에 제외하고 싶은 .env를 써준다.
.env
```

## Refer
[pyenv + virtualenv + autoenv 를 통한 Python 개발 환경 구축하기 by @dobestan](https://dobest.io/how-to-set-python-dev-env/)
