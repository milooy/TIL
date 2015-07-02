# Swift 쉽게 더 쉽게

## Single view application
- AppDelegate.swift
    + 애플리케이션의 동작을 모니터링하는 애플리케이션 델리게이트 역할. 
    + `function applicationDidEnterBackground(...)` <<사용자가 우리 앱에 더이상 관심을 두지 않을 때 할 일을 처리
        * e.g 우리 앱 사용하다 전화받으면 우리 앱 백그라운드상태 될때 이 함수 실행
- ViewController.swift
    + 뷰 컨트롤러 역할.
    + 사용자가 보는 특정 화면이나 뷰를 제어.

## 변수와 상수
- 변수: `var numOfStudents = 10`
    + swift가 자동으로 변수 타입을 추론할 때 그 변수는 `암시적 타입(implicitly typed)`을 갖는다. 값 보고 그걸 기준으로 타입 지정함.
    + `명시적 타입`: `var numOfItems:Int = 77`
- 상수: `let Pi = 3.1415`
