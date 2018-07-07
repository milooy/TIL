[x] 빌드 스크립트를 이용해 개발 서버에서 프로젝트를 빌드한다.

    - ROOT.war

[x] 개발 서버에 웹 애플리케이션 서버(Web Application Server, 이하 WAS) 설치 및 설정한다.

    - <profile>
        - export M2_HOME=/home/yangchigi/apache-maven-3.2.1
        - export M2=$M2_HOME/bin
        - export PATH=$PATH:$M2

        - export CATALINA_HOME=/home/yangchigi/apache-tomcat-7.0.52
        - export PATH=$PATH:$CATALINA_HOME/bin

        - export JAVA_HOME=/usr/lib/jvm/java-1.7.0-openjdk-amd64
        - export PATH=$PATH:$JAVA_HOME/bin

[x] 배포 스크립트를 통해 웹 애플리케이션 서버에 프로젝트 배포한다.

    - from fabric.api import env, execute
    - from fabric.operations import local

    - env.catalina_home="/home/yangchigi/apache-tomcat-7.0.52"

    - def hostname():
    -         local('uname -a')

    - def start():
    -         local('%s/bin/startup.sh' % env.catalina_home)

    - def stop():
    -         local('%s/bin/shutdown.sh' % env.catalina_home)

    - def copy():
    -         local('cp /home/yangchigi/.jenkins/jobs/seize/workspace/target/seize.war %s/webapps/ROOT.war' % env.catalina_home)

    - def deploy():
    -         execute(stop)
        execute(copy)
        execute(start)

[ ] 로컬 개발 환경에서 개발 서버로 서비스를 배포하고 피드백을 받는 과정을 설명해라.

- 프로젝트를 export해서 war파일로 만들고 그걸 ROOT.war란 이름으로 톰캣서버에 webapps에 올린다.

- Servlet 기본 개념을 이해하고 있으며, 이를 활용해 웹 애플리케이션을 개발할 수 있다.

[ ] Servlet Container(Tomcat과 같은 WAS를 의미함)의 개념은? Servlet Container/Servlet과의 관계는?

        - 서블릿을 지배하는 자바 어플리케이션

        - 서블릿에대한 요청을 받으면 서블릿 관리하느느 컨테이너에게 이 요청 넘기고

            - 컨테이너가 HTTP Request와 HTTP Response객체 만들어

            - 이를 인자로 서블릿 doPost()나 doGet()메서드 중 하나를 호출

        - 컨테이너가 주는 혜택

            - 통신(커뮤니케이션) 지원

                - 컨테이너는 서블릿과 웹 서버가 서로 통신할 수 있는 손쉬운 방법 제공
                    - ==서버와 대화하기 위해 개발자가 직접 ServerSocket을 만들고, 특정 포트에 리스닝하고, 연결요청이 들어오면 스트림을 생성하는 등 복잡한 일련의 일을 할 필요 없다는거.

                    - 컨테이너는 어떻게 웹 서버와 통신해야 하는지 잘 알고 있으며, 이런 통신 기능을 API로 제공.

                - 따라서 웹서버(ex 아파치)와 서블릿이 서로 통신하기 위한 통로인 통신 API에 대해 개발자가 고민할 필요가 없다.

                    - 개발자가 신경 쓸 부분은 바로 서블릿에 구현해야 할 비즈니스 로직.
                        - ex. 온라인 상점에서 주문을 어떻게 처리할 것인지.

            - 생명주기(라이프사이클)관리

                - 서블릿의 탄생과 죽음을 관리

                - 컨테이너가 하는 일: 서블릿 클래스를 로딩하여 인스턴스화하고, 초기화 메서드를 호출하고, 요청이 들어오면 적절한 서블릿 메서드를 호출하는 작업을 함.

                - 서블릿이 생명 다하면 적절히 가비지 컬렉션 진행.

            - 멀티스레딩 지원

                - 컨테이너는 요청이 들어올 때마다 새로운 자바 스레드를 하나 만듦.

                - 클라이언트의 요청에 따라 적절한 HTTP서비스 메서드를 실행하면 그걸로 스레딩 작업은 끝.(스레드 쥬금)

            - 선언적 보안 관리

                - 컨테이너 사용하면, 보안에 관련된 내용을 서블릿 또는 자바 클래스 코드 안에 하드코딩할 필요 업슴.

                - 컨테이너가 있는 환경이라면 보안관리는 XML배포 서술자에 기록하면 됨
                    - (보안에 대해 뭔가 수정할 일이 생겨도, 자바 소스코드를 수정해 다시 컴파일하지 않아도 보안관리 가능)
            - JSP지원
                - JSP코드를 실제 자바코드로 변환

[ ] Servlet의 lifecycle은 어떻게 되는가?131

    - public class ServletLifeCycle extends GenericServlet
    - public void init()

        - 메서드에 의한 초기화. web.xml파일이 실행되며 최초 접속하는 클라이언트에 의해 실행
    - service(ServletRequest request, ServletResponse response)

        - 클라의 요청에 의해 실행되는 메서드. main()과 비슷.

        - 요청이 들어올 때 마다 새로운 스레드에서 실행
    - destroy()

        - 웹서버가 종료될때 실행되어 메모리 해제

    - 최초의 클라를 제외한 클라들은 모두 service메서드만 실행. 웹서버가 종료되며 자동으로 destroy()가 실행됨.

[ ] Servlet Filter의 용도는?738

    - 자바 컴포넌트. 서블릿으로 요청이 넘어가기 전에 요청을 가로채 처리가능, 서블릿 작업이 완료된 다음에 응답에 어떤 작업(클라에게 넘어가기 전)
    - DD에 필터 선언해둔 정보에 기초해 컨테이너는 언제 필터를 실행할지 알고있다.

    - 체인식으로 “이것 다음에 저것을 실행하세요”같이 연결해서 사용가능.

[ ] Servlet의 4가지 Scope(application, session, request, page scope)에 대해 설명해라.

[ ] ServletContextListener의 용도는?

    - 컨텍스트 초기화 파라미터를 읽어들여 파라미터를 인자로 하여 객체를 생성.

    - 리스너는 객체를 servletContext속성에 묶어둔

    - 그러면 서블릿에선 객체를 끄집어낼 수 있다. 이렇게 하면 서블릿이 객체를 공유할 수 있다.

[ ] 자바 기반 웹 프로젝트의 기본 디렉토리 구조는?

        - http://goo.gl/t11Z0y

        - 톰캣 홈 디렉토리 밑에 webapps 디렉토리에 위치

[ ] 페이지 이동 방법에 forward와 redirect 두 가지 방식이 있다. 이 두 가지 방식의 차이점은?

        - 리다이렉트

            - 요청에 대한 응답을 누가할지 선택가능. 요청을 완전히 다른 URL로 방향 바꿀 수 있다(리다이렉트) 168

            - 정보 못넘기고 주소도 바뀜

            - 과정

                - 유알엘입력

                - 서버/컨테이널? 요청날아감

                - 서블릿이 요청을 다른유알엘로 보내야한는것 간파

                - 리스폰스 객체의 sendRe

            - 다른 컴포넌트(보통 jsp)에 처리를 위임가능(디스패치)

        - 포워드 189 239

            - 다른 자원(jsp/servlet)으로 요청 보내 처리하여도 클라이언트에는 이 사실 알리지 않음(웹 컨테이너에서 처리됨)

            - 리다이렉트와 달리 새로운 요청을 위한 클라와의 통신이 없어 더 나은 성능

            - 포워딩시엔 포워딩후에도 요청 속성에 있는 객체들을 사용가능. URL변화 없음.

[x] Servlet Filter를 활용해 요구사항을 구현한다. 738
[ ]
[ ] 멀티 쓰레드에서 문제가 발생하지 않도록 한다.

- JSP 기본 개념을 이해하고 있으며, 이를 활용해 웹 애플리케이션을 개발할 수 있다.

[ ] JSP의 용도는?68

    - HTML에 자바를 넣으려고.
    - HTML 페이지를 자바 스트링 변수 안에 넣지 않을거야.
    - HTML페이지 디자이너들은 대부분 자바를 모름

[x] 요구사항을 스크립틀릿(scriptlet)을 사용하지 않고 JSTL과 Expression Language(EL)만으로 JSP를 완성한다.

- MVC 개념을 이해하고 있으며, 자바 기반으로 MVC 프레임워크를 구현할 수 있다.

[ ] MVC에서 Model, View, Controller 각각의 역할은 무엇인가?88

    - 모델

        - 비즈니스 로직. 모델정보 읽거나 수정(getter/setter)도 여기 포함.

        - 데이터베이스와 통신한느 유일한 곳

    - 컨트롤러
        - Request객체에서 사용자가 입력한 정보를 뽑아내 모델에 대하여 어떤 작업을 해야하는지 알아냄.

        - 모델정보 수정, 뷰에게 넘겨줄 새로운 모델 만든다던지.

    - 뷰

        - 컨트롤러부터 모델 정보 읽어온다.

        - 사용자가 입력한 정보를 컨트롤러에 넘겨줌.

[x] MVC 프레임워크를 활용해 요구사항을 구현할 수 있다.

- JDBC를 활용해 데이터베이스 접근이 가능하며, JDBC API를 추상화해 공통 라이브러리를 구현할 수 있다.

[x] JDBC API의 특정 로직의 중복을 제거한다.
[x] 특정 요구사항을 JDBC API를 활용해 구현하라.
[ ] Connection Pooling이 필요한 이유는?

- 처음에 DB에 접속하는 과정이 가장 부하가 많이 걸린다. getConnection 할때 부하가 가장 크다. 그래서 나온게 이거.
- DB에 접근할때마다 연결을 했다 끊었다가 아니고, 자바 프로그램에서 미리 몇 개의 연결 해놓은 후 필요할때마다 Pool에서 연결을 빌려와서 사용한 후 다시돌려준다.
- pool너무 크게 해놓으면 메모리 소모 크고, 적게 해놓으면 대기시간 길어짐.

모바일, 웹 클라이언트(웹 UI)와의 연동을 위한 API를 설계 및 구현할 수 있다.
[ ] ajax 기반으로 웹 페이지를 구현할 때와 일반적인 웹 페이지를 구현할 때의 차이점은?

    - 웹브라우저가 아닌 XMLHttpRequest객체가 웹 서버와 통신

    - 웹 서버의 응답 결과가 HTML이 아닌 XML또는 단순 text

    - 페이지 이동 없이 결과가 화면에 반영

[ ] XML과 JSON의 차이점은 무엇인가? 각각의 장단점은?

    - 구조화된 문서를 전송 가능하게 만든 텍스트 포맷 형식.

    - 특정한 의미를 가지는 데이터를 담는 포멧을 정의.
    - XML

        - 텍스트로만 정보가 이루어져 기기에 구애X 플랫폼으로부터 자유로움

        - 작성하기가 편함(tag구조)

        - 문서의 양이 필요 이상으로 많다.

        - 배열형식이나 반복구조의 경우 불필요한 데이터가 계속해서 나타남.

        - 이로인해 파싱이 힘들어지고 속도가 느려짐.
    - Json

        - 텍스트 형식의 데이터 포맷.

        - 내용이 함축적으로 최소한의 정보만 가지고 있다.

        - 용량이 작고 속도 빠름.

        - 파싱이 간편

        - 내용이 함축적이다 보니 의미파악이 힘들수있으

        - 적은규격의 데이터 전송에 적합한 방식이기 때문에 XML보단 빠르지만 대용량급의 데이터 송수신엔 부적합.

[x] JSON/XML API를 만들고 ajax 기능을 활용해 요구사항을 구현한다.

- Person p = new Person();
- p.age = 20;
- p.name = "john";
- p.phone = "010-1234-1234”;

-

GsonBuilder gb = new GsonBuilder();

- gb.serializeNulls();
com.google.gson.Gson gson = gb.create();
String jsonStr = gson.toJson(p);

- 자바 오픈 소스 라이브러리를 검색, 활용, 적용할 수 있다.

[x] 특정 라이브러리를 maven을 활용해 적용한다.
