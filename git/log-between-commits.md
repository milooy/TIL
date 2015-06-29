## 두 커밋 사이의 변경 로그 출력하기

참고: [Git - Revision Selection](http://git-scm.com/book/it/v2/Git-Tools-Revision-Selection)

### 모든 변경사항 출력


    $ git log [SHA-1|tag|branch]..[SHA-1|tag|branch]


유의할 점은, 앞에 입력하는 커밋이 뒤에 입력하는 커밋보다 더 이전 항목이여야 한다.

#### 명령 예제

    # SHA-1 commit id 사용
    $ git log b2240b1..bbf111c
  
    # tag 사용
    $ git log kr/play/2.2.8..kr/play/2.2.9
  
    # branch 사용
    $ git log task/COMICS-1468..master

#### 출력 결과 예제

    $ git log task/COMICS-1468..master
	commit bbf111cd17414244af0893d839d2ae63de3dc256
	Author: Taeho Kim <jyte82@gmail.com>
	Date:   Tue Feb 17 19:16:26 2015 +0900

	    Typo: Change D-{day} into 'Free in {day}days

	    Commit type: Development
	    JIRA issue no.: <None>
	    Github issue id: <None>
	    Crashlytics: <None>

	    Details:
	    <None>

	    Signed-off-by: Taeho Kim <jyte82@gmail.com>

	commit 8a58df61bb079523006566265d172c3826273e65
	Author: Taeho Kim <jyte82@gmail.com>
	Date:   Tue Feb 17 12:57:36 2015 +0900

	    Glide: Modify memory cache policy

	    Commit type: Development
	    JIRA issue no.: COMICS-1440
	    Github issue id: <None>
	    Crashlytics: <None>

	    Details:
	    <None>

	    Signed-off-by: Taeho Kim <jyte82@gmail.com>


### 변경사항의 제목만 출력하기

위의 '모든 변경사항 출력'을 사용할 경우, 전체 커밋 메시지를 출력한다. 전체 커밋 메시지를 출력하는 대신 커밋 제목만 표시하도록 하려면, `--pretty=oneline` 옵션을 추가한다.


    $ git log [SHA-1|tag|branch]..[SHA-1|tag|branch] --pretty=oneline


#### 예제

	$ git log task/COMICS-1468..master --pretty=oneline
	bbf111cd17414244af0893d839d2ae63de3dc256 Typo: Change D-{day} into 'Free in {day
	8a58df61bb079523006566265d172c3826273e65 Glide: Modify memory cache policy


### 짧은 버전의 SHA-1 commit id 출력하기

변경 사항의 제목만 출력할 때, Full commit id 대신 단축된 commit id 를 출력하려면, `--abbrev-commit` 옵션을 추가한다.


	$ git log [SHA-1|tag|branch]..[SHA-1|tag|branch] --pretty=oneline --abbrev-commit


#### 예제


	$ git log task/COMICS-1468..master --pretty=oneline --abbrev-commit
	bbf111c Typo: Change D-{day} into 'Free in {day}days
    8a58df6 Glide: Modify memory cache policy

