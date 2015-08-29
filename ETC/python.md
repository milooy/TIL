## Sphinx autodoc
- docstring
    + API DOCS
- sphinx
    + documentation generator
    + python version is ipt
    + import your code docstrings 
    + translation into other languages

## Python Encoding
- Encoding
    + 전달하고자 하는 내용을 부호화
- Character Encoding 
    + 저장/통신 하기 위해선 2진수
- Unicode
    + 전세계 문자/기호를 codepoint에 매칭
    + 한글, 타이문자 등등
    + 많이 쓰이는 이모티콘 등도 정의(똥같은거)
    + Unicode != UTF-8
- UTF-8
    + 모든 Unicode codepoint를 다룰 수 있다.
    + Unicode를 Encoding했을 때 NULL 포함 X
    + ASCII Text는 UTF-8 될 수 있음. 
    + 일부 바이트 유실되어도 다음시작 byte알 수 있다(복구가능)
    + Web Encoding중 84%가 사용!
- Unicode Sandwich
- python2
    - default: ASCII
- python3 
    - default: UTF8
- Python은 파일의 인코딩을 알지 못함
- 일본어 디코딩
    + 주고 받은 인코딩을 정확히 파악!!
- 인코딩 해결법
    + encode, decode이렇게 저렇게 하다 잘 되면 써요 ==> 망하는 지름길
- 인코딩 파악 위한 순서
    + 문서 또는 서로의 약속 확인
    + 전송받은 데이터 열어서 확인
    + 테스트(반드시!!)
- 인코딩 파악에 도움되는 것
    + chardet 2.3.0
    + n퍼센트 확률로 이 인코딩이다 하고 알려줌
- 테스트
    + 전체 프로그램 돌리면 오래 걸릴 수 있으니 부분을 떼어서 검사
- 파일 IO를 위한 팁
    + 파일을 열 때 codecs쓰면 간단해짐
    + python3에선 내장함수에서 가능
- 결론 TIP
    + 1. Unicode Sandwich
        * python에선 항상 Unicode
    + 2. 인코딩 파악하기
        * 문서보고, 확인하고 테스트.
        * 주어야하는 인코딩도 명확히

## NLTK & Gensim
> 단어/문서를 컴퓨터가 이해할 수 있게 표현하는 방법

- 어떻게 하면 구조가 없는 데이터인 `텍스트`의 의미를 컴퓨터가 잘 이해할 수 있을까?
- 단어를 표현하는 가장 쉬운 방법: `이진 표현법`
    + 어떤 단어를 벡터화 시킬 수 있다.
    + 근데 이진 표현법 사용 => 단어간 유사도 정의 불가
        * 호텔&모텔 / 호텔&고양이 얼마나 비슷한지 전혀 모름
+ BOW(bag of words)
    * 단어가 문서에 존재한다/안한다(term existance)
    * 단어가 문서에 n번 존재한다(term frequency)
    * 근데 공간의 차원이 너무 커서 문서간 유사도 지표의 효과 떨어짐
- 워드넷 같은 텍소노미
    + 모든 용어를 포함하려 하지만, 전문 도메인 용어들은 많이 빠짐
- 단어의 주변을 보면 그 단어를 안다
    + == 단어의 의미는 해당 단어의 문맥(`context`)이 담고 있다.
    + co-occurence: 두 단어가 정해진 구간 내에서 동시에 등장
        * 1. Term-document matrix : 한 문서에 같이 등장하면 비슷한 단어
        * 2. Term-term matrix : 단어가 문맥 내에 같이 등장하면 비슷한 단어
- word2vec
    + 단어에 대한
- doc2vec
    + 문서/문단 벡터를 마치 단어인 양 학습시키자!
    + 차원 축소
- 한국어 영화 리뷰 토이데이터
    + 
