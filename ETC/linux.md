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

