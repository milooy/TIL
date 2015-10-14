<2-2 bash 기초>

- 학습목표 : 기존에 짜여진 bash스크립트를 대강 이해할 수 있다.
- bash
    - shell은 여러 가지 종류가 있는데 그 중에 지금 사용하고 있는게 bash
    - Bourne shell을 대치하기 위해 GNU에서 만든 셸입니다.

    - 다른 셸에서 많은 기능을 가져옴

    - 강력 & 편리
- bash의 특징

    - 명령어 실행

    - 파이프, 리다이렉션

    - 자동 완성

    - 변수
    - control - flow (while, if, for)

    - 스크립트 지원
- bash script
    - bash shell에서 지원해주는 스크립트.

    - 일반적인 스크립트 언어와 기능이 거의 같다.

    - 리눅스 시스템을 관리하는데 전반적으로 사용됨 - 그래서 배워야 합니다.

    - 요즘은 펄이나 파이썬에 비해 편리하지는 X - 그래도 배워야 합니다.

    - 셸 명령어를 스크립트 내부에서 빈번히 사용할 경우 사용하면 굳

- 변수

    - 선언 없이 정의만으로 사용 가능

    - 변수의 타입은 무조건 문자열

    - 사용하기 위해선 $를 붙임
    - FILES=$(ls -F)
    - echo $FILES

- 사용자로부터 입력받기
    - echo "What's your name?"
    - read NAME
    - echo "Hello, $NAME"
    - echo "${NAME}님 안녕하세요?"    #변수 뒤에 바로 문자열을 붙여 쓰고 싶을 때 {}로 변수를 감쌉니다.

- 숫자 계산

    - $((<수식>))을 이용해 수식 계산 가능.

    - 주의! $(())안에서는 변수에 $를 붙이지 않는다.

- 출력 리다이렉션
    - echo "hello" > hello.txt     #hello.txt에 echo "hello"를 넣은다.
    - cat hello.txt                     #hello라고 나옴

- 입력 리다이렉션
    - echo "Snoopy">name.txt
    - cat name.txt     #Snoopy
    - ./ex5.sh<name.txt       #Type your name \n Snoopy님 안녕하세요?
- for loop
    - for i in hello 2 3
    - do
    -     echo $i
    - done
    - #hello
    - #2
    - #3
- seq
    - A=$(seq 1 10)

    - $echo $A
    - #1 2 3 4 5 6 7 8 9 10

- 비교문으로 가능한 것들

    - 비교문 형식 : [조건]

    - 숫자비교 [A op B]
        - -eq : ==
        - -ne : !=
        - -lt : <
        - -gt : >
        - -le : <=
        - -ge : >=

    - 문자열 비교
        - =, !=, <, >
        - -n s1 : string s1 is not empty
        - -z s1 : string s1 is empty

    - 파일 검사
        - -d directoryname : Check for directory existence
        - -e filename : Check for file existence
        - -f filename : check for recular file existence not a directory

- 컴파일 과정

    - 전처리 -> 컴파일 -> 링크

    - $ gcc -v -save-temps -g -o hello hello.c
        - -v : 컴파일과정 전체를 화면에 보여줘
        - -save-temps : 중간생성물도 지우지말고 저장해줘
        - cc1, as, collect2가 사용됨
    - cc1이용해 hello.i ->hello.s
    - as이용해 hello.s -> hello.o
- cc1 : 전처리기

    - 전처리 후 생성물 : 파일이름.i

    - 관련옵션 : -I<헤더디렉토리> -D<정의할심볼>
- ELF

    - 리눅스의 바이너리 파일 포맷 규결
    - a.out -> coff ->elf로 변화함.

    - 컴파일 결과물이 a.out인것도 여기서 유래.
    - Elf Header + 테이블 + section으로 이루어짐
    - Section/세그먼트
        - .으로 시작
        - .text : 인스트럭션(기계어)
        - .data : 초기값이 0이 아닌 전역변수
        - .bss : 초기값이 0인 전역변수
        - .rodata : 상수, 문자열 등

    - $ readelf - h test.o      //헤더 정보 보기

    - $ readelf -s test.o       //심볼 정보보기

    - $ readelf -S test.o      //섹션 정보보기

    - 링크 : 여러 ELF 파일에서 각 세션 합쳐서 새로운 섹션 가진 프로그램 만들어내는 작업
        - gcc의 collect2로 링크하는데 collect2는 내부적으로 Id를 호출->결국 링커는 Id

<둘째날>
[ ] 리눅스 명령어

- $ : 프롬프트 또는 명령어의 시작. 사용자는 $를 입력할 필요가 없다.
- # : 명령어의 끝 또는 주석의 시작, 사용자는 #과 뒤의 내용을 입력할 필요가 없음
- [text] : 옵션. 생략가능.
- <text> : 필수 입력 내용

- $ man [번호] <명령어> : 명령어의 도움말을 본다.

    - 번호는 생략가능하고 종류는 다음과 같다.
    - 1 : 일반 명령, 2: 시스템 콜, 3: C라이브러리 함수, 4: 장치파일과 드라이버 8:어드민 관련 명령어

    - $ man printf

    - $ man 3 printf
- pwd : 현재 디렉토리 표시
    - present working directory의 약자

    - 리눅스는 '/'가 최상위 디렉토리. 일반적으로 '루트'디렉토리라고 부름.

    - $echo $PWD #위와 같습니당.
- ls : 현재 디렉토리 안의 목록 표시.
    - ls-R : 해보셈. 보통 R은 recursive의 약자.
    - ll -t : 시간 순서로 보여준다.
    - ls -a : all, 숨긴파일까지 다 보여줌
    - ls -l : long, 긴 형태로 리스팅. ll이라고도 쓸 수 있음
    - ls .. : 한 단계 위 리스팅
- stat <파일명> : 파일 정보 보기

- 기타 명령
    - whoami : 나는 누군가?
    - hostname: 여긴 어딘가?
    - uname -a : 커널 등 시스템 정보
    - w : 서버에 현재 접속자 목록 보기
- echo <내용> : 내용을 화면에 표시
    - echo "hello"
    - echo -e "hello/nhello

    - 생각 외로 매우 유용합니다.
- cat <파일> : 파일의 내용 표시
    - concatenate의 약자. 연결시키다라는 뜻.

    - 뭐랑 뭐를 연결시키냐?
- mkdir <디렉토리 이름> : 현재 디렉토리 아레에 디렉토리를 만든다.
    - mkdir -p <디렉토리1/디렉토리2> : 한꺼번에 여러 단계의 디렉토리 만들기
- cd : 디렉토리 이동
    - cd <디렉토리 이름> : 해당 디렉토리로 이동
    - cd .. : 한 단계 상위 디렉토리로 이동, 공백 하나 있음.
    - cd ../ ../ : 두 단계 상위 디렉토리로 이동
    - cd / : 루트 디렉토리로 이동.
- rm : 파일 삭제
    - rm <파일 이름…> : 해당 파일을 삭제. 복수의 파일삭제도 가능.
    - rm -r <디렉토리 이름> : 디렉토리도 삭제 가능.
    - rm -rf<디렉토리 이름> : 묻지마 삭제.. 위험합니다.
- mv : 파일 이동하기
    - mv <name1> <name2> : name1의 이름을 name2로 바꿉니다. 디렉토리, 파일 모두 가능
    - mv <name> <dir1> : name파일을 dir1위치로 옮깁니다.
- cp : 파일 복사하기
    - cp <name1> <name2> : name1을 name2로 복사한다. 파일, 디렉토리 모두 가능.
    - cp <name1> <path> : name1을 지정된 경로 안으로 복사.

- $ history : 명령어 기록 보기

    - $ !<번호> : 해당 번호의 명령어 실행

    - $ (ctrl)+r : 입력 후 단어를 입력하면 일치하는 가장 마지막 명령이 나옴
- chmod

    - 파일이나 디렉토리의 허가권(퍼미션) 바꾸거나 결정

    - $ chmod +x hellish

    - + : 퍼미션 추가    - : 삭제    = : 퍼미션을 일치시킴
    - r: 읽기      w : 쓰기     x : 실행(디렉토리는 탐색)

- 파일 압축/해제

    - 리눅스 환경에선 주로 tar을 사용하여 압축. tar.gz(2단계구성, 속도빠름) 또는 tar.bz2(크기 작음)로 주로 많이 끝남

    - 압축풀기 : $ tar xvf <압축파일이름>         #eXtract View File

    - 압축하기 : $ tar czvf <생성할 압축 파일이름.tar.gz> <압축할경로>

