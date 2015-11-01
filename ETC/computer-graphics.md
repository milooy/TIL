# Computer Graphics

- 컴퓨터 그래픽스란?
    - 컴퓨터를 사용하여 그림을 생성하는 기술
- Image Processing : 원래 있는 이미지를 유용하게 트랜스폼
- Image Analysis(Computer version) : extracting symbolic information from the image
- What is Computer Graphics?
    - Imaging : representing 2D images

        - 모핑 : 두 개의 다른 영상이 서서히 닮아감

        - 와핑 : 내가 모자썼을때 나는 변하지 않으면서 모자만 길어지기
    - Modeling : representing 3D objects

        - 표면만 만들고 속은 비어있음. 표면은 모두 삼각형으로 표현

        - 물체를 만들어 내는 것.

        - 무엇을 그릴건지. 그래픽으로 표현하고자 하는 장면 내부의 물체를 정의하는 작업

        - 물체를 선분 의 집합으로 정의하려면 선분의 양 끝점 위치를 명시하는 작업이 필요한데, 이것이 모델링.

        - 평면 다각형의 집합으로 다각형 정점의 위치를 명시하는 작업이 모델링
        - defines objects inside the scene
    - Rendering : constructing 2D images from 3D models
        - Simulating behavior of lights & image formation

        - 모델링에 의해 정의된 물체를 어떻게 그릴 것인지.
        - shading + lighting

        - 우리가 화면에서 보는 모든 그림은 렌더링의 결과.

        - 조명, 관찰자위치, 재질 등 어케 할것인지.
        - draws defined objects
    - Animation : simulating changes over time
        - motion representation&control
- CAD(Computer Aided Design)
    - for engineering and architectural system
    - Design of building, automobile, aircraft, etc
    - simulation
- 3D Rendering Pipeline : 3D 세계에 대한 기하학적 표현과 이 세계를 바라보는 관점을 정의하는 가장카메라를 이용해 2D이미지를 만들어내는 과정
    - 3D Primitives: 물체
    - Model Transformation : 적절히 위치조작. 각각의 물체가 있는 좌표, 배치과정, local coordinate
    - Lighting: 조명, 재질 선언
    - Viewing Transformation: 시점, 보는사람의 위치,각도, 시야각. 원점맞추기(회전축)
    - Projection Transformation: 투영변환. Parellel(거리에 상관없음)과 Perspective로 나눈다. 가장 수학적으로 복잡. 행렬필요. 3D를 2D로 때려박기
    - Clipping: 자른다.
    - Viewport Transformation: 모니터에 맞게 해상도변형
    - Scan conversion: 안티앨리어싱 해주거나(?)

    - http://allosha.tistory.com/category/3D%20그래픽스%20매니악스/3D그래픽스%20파이프라인
    - http://www.slideshare.net/ddayin/0911-5184655

    - 3차원 벡터 라는 개념은, 간단히 '3차원 공간상의 방향'이라고 생각하면 된다.그런 방향은 x, y, z 3개의 축의 좌표값으로 표시되고, 그 '방향'의 기준을 '좌표계'라고 한다.

    - 로컬변환 : 모델 하나의 고유의 좌표계(모델 좌표계). 모델 뷰어와 같이 단일 개체를 표현하는데는 문제없음. 어떤 3D캐릭터로부터 적당히 결정된 기준이 되는 좌표계. 3D의 방향은 그 3D캐릭터의 기준좌표계에서 "어느쪽을 향하고 있다"고 관리하고 제어하는 방법이 편하다. 그래서 로컬좌표계라는 개념을 사용.

        - 근데 일반적인 3D캐릭터에는 팔과 다리가 붙어있는게 많은데, 이걸 그 관절로부터 회전한다든지 하는걸 생각하는 경우는, 관절을 기준으로 한 로컬좌표계에서 제어하는 편이 쉽다. 그러나 이렇게 생각하면 로컬좌표계는 계층구조가 되버려 최종적으로 처리를 마무리할땐 기준을 모르게 됨.

        - 거기서, 그 3D공간 전체를 지배하는 좌표계가 필요해짐==>월드 좌표계.
        - 3D 그래픽스의 정점파이프라인의 정점단위 처리에서는 이 로컬좌표계로부터 월드좌표계로의 변환이 빈번하게 일어난다.

        - 이런 정점단위의 좌표계 변환 처리를 셰이더프로그램에 따라 실행하는 것이 [3]의 정점셰이더(vertecx shader)다. 셰이더프로그램을 다시 짜면 유니크하고 특수한 좌표변환을 할 수 있다는 것.

    - 월드변환 : 로컬스페이스들의 개체들을 월드좌표계로 변환. 이동, 회전, 크기변형.

    - 뷰변환(카메라 변환) : 카메라를 좌표계의 원점으로 변환 =>모든 개체들 변환.

    - 후면추려내기(back-face culling): 두르기 순서의 시계방향에 지정된 폴리곤을 전면(front-face)폴리곤으로 설정

        - 정점셰이더가 하는 또하나의 일: 정점단위의 음영처리
            - [3]의 정점셰이더가 하는일은 좌표변환 뿐만 아니라 정점단위의 음영처리/광원처리(라이팅)도 정점셰이더의 중요한 역할.

            - 빛의 방향을 나타내는 '광원벡터'와, 시선방향을 나타내는 '시선벡터', 그리고 빛이 닿는 폴리곤을 구성하고 잇는 정점의 방향을 나타내는 '법선벡터' 3개의 벡터를 사용해 이런저런 벡터의 상대관계로부터 어느 정도의 빛이 시선방향에 대해 반사하는지를 반사방정식을 이용해 계산하는 것.

            - 이 반사방정식을 프로그램으로 표현한 것이 정점셰이더 프로그램

    - 조명(light): 광원벡터, 시선벡터, 법선벡터 등 조명계산식을 이용해 정점의 색상 계산

    - 테셀레이션(Tesselation): GPU에서 정점을 자유자재로 증가, 감소

    - 클리핑(Clipping): 시야를 벗어나는 폴리곤 잘라냄. 시야절두체 기준.

    - 투영(Projection): 3차원에서 2차원을 얻는 과정. 원근투영/직교투영

    - 뷰포트 변환(Viewport Screen mapping): 윈도우 화면 좌표로 변환

    - 래스터라이즈(triangle setup): 변환이 끝난 폴리곤을 화면에 보여줄 픽셀로 계산. 결과물: 모니터에 디스플레이 될 2D 이미지.

    - 텍스처 적용: UV좌표계 이용(0~1)

    - 렌더 백엔드: 비디오 메모리에 써넣어도 좋을 것인가? 알파테스트, 스텐실테스트, 깊이 테스트, 알파블렌딩, 안개, 안티앨리어싱

#2

- Display technology
    - CRT: 진공관 모니터. 텔레비전모니터와 동일한 원리

        - 필라멘트: 일종의 전자총. 필라멘트에 전류가 흐르면 전자가 방출. 전자는 전기적으로 마이너스 띄므로 화면 바로 뒤의 금속판에 플러스전압을 가하면 화면쪽으로 끌려간다.

        - 유인된 전자가 쉽게 가속할 수 있도록 음극선관 내부를 진공으로 만듦.

        - 수직편향판&수평편향판 : 전자빔의 방향을 각각 상하좌우로 휘는데 사용.

        - 하나의 화면 전체를 그려내기 위해선 편향 전압을 지속적으로 변화시켜야 한다.
    - LCD: 평판형 디스플레이

        - 노트북 컴퓨터나 휴대용 디스플레이.

        - 액정이 지닌 전기적.광학적 특성 이용.

        - 모니터 표면엔 R, G, B컬러셀이 입혀져 있다.

        - 화면이 항상 켜져있기 때문에 CRT처럼 깜빡거림이 없음.

        - 액정은 배열 상태를 바꿈으로서 후광을 차단하거나 투과하는 밸브역할. 액정은 빛의 양을 조절할 뿐 그 자체가 빛을 발하진 않음.

        - 화소마다 액정의 배열 상태를 바꿈으로써 빛의 세기 조절.

        - 빛이 방향성을 띄어서 정면에선 잘 보이지만 좌우에선 잘 안보임.
- Resolution
    - Intensity Resolution
        - each pixel has only "Depth" bits for colors/intensities
    - Spatial resolution
        - Image has only width*height pixels
    - Temporal resolution
        - Monitor refreshes images at only "Rate"Hz
- Stereoscopic display: 양안영상. 3D.

    - 왼쪽 눈과 오른쪽 눈이 인식하는 영상의 차이에 의해 이루어진다.

    - 서로 다른 2차원 영상이 뇌에서 조합되어 3차원적인 깊이를 느끼게 됨

    - 실제로 화면을 볼 때 각각의 눈이 해당 영상만을 보도록 하면 됨.
- Vector display

    - 화소의 개념이 없다. 화면 전체에 인이 칠해져 있어 래스터장치처럼 화소 면적 단위로 밝혀지는 것이 아니라 전자총이 닿는 부분마다 밝혀지게 된다.

    - 에일리어싱이 일어나지 않는다.

        - 에일리어싱 : 무한 해상도를 지닌 실제의 선을 유한 면적을 가진 화소단위로 근사시키는 과정에서 일어난다.

    - 오실로스코프에서 유래. (전압/전류를 측정하는 계측장치. 어떤 전기적 신호의 파형을 선으로 그려낸다.)

    - 빔 투과 방식 사용.

    - 선을 위주로 하는 그림이라면 이게 적합.

    - 호스트컴퓨터-디스플레이리스트-그래픽프로세서-비디오컨트롤러
- Raster display

    - 래스터: 화소

    - 면을 구성하는 몇몇 화소들만 밝히면 되기 때문에 훨씬 빠른 속도로 그려낼 수 있다.

    - 호스트컴퓨터-그래픽프로세서-프레임버퍼-비디오컨트롤러

        - 프레임버퍼: 그림(프레임)을 저장하는 메모리. 그래픽 프로세스에 내장. 그림이 바뀔 경우 호스트 컴퓨터는 프레임버퍼의 내용을 바꾸기만 하면 된다.용량은 색상의 종류와 연관되어있음. 만약 화소당 3비트를 할애한다면, 1비트 프레임 각각(비트평면, bit planes)을 R, G, B로 놓을수있음.

        - 화소당 24비트를 할애한 프레임버퍼의 경우 R, G, B를 각각 8비트씩 할애할 수 있고, 밝기는 10진수 0부터 255까지 256(2^8)가지로 구분가능. 결과적으로 24비트 프레임 버퍼로 나타낼 수 있는 색상의 수는 256*256*256 정도가 됨.

        - 프레임버퍼의 용량은 해상도와도 연관됨. 1024*768해상도의 그림은 1024*768개의 화소. 화소당 24비트를 할당하면 1024*768*24비트가 됨.
- resolution depends on
    - frame buffer resolution
    - display H/W characteristics
    - sampling method
- Screen Refresh

    - 전자빔은 홀수번, 짝수번 번갈아 주사한다.

    - 이처럼 주사선이 화면을 반쪽씩 교대로 그려내는 것을 인터레이싱(Interlacing)이라 한다.반쪽화면을 60번 주사(60Hz)

        - 반쪽 영상에 불과하지만 두 배 속도로 뿌려지기 때문에 화면이 부드럽게 느껴짐

    - 논 인터레이싱:실제로 전체 화면을 30번주사(30Hz)
        - Flickering이 심하게 느껴짐.
- Visible Spectrum

    - 색상: Dominant freq의 색

    - 명도: 눈에 감지된 빛 에너지의 총량(색상과 무관)

        - 에너지파형 아래의 면적

    - 채도: Ed-Ew (e.g. pastel tone)

    - 파장별 에너지가 같을 때 이들을 모두 합치면 백색
    - RGB: 가산모델(색상을 합하여 원하는 색상 get)

        - 여기서 마이너스일때 강제로 끌어올리는게 CIE모델
        - RGB모니터
    - CMYK: 감산모델
        - color printer

#3

- Model Transformation
    - Coordinate systems
        - local(modeling) coordinate
        - world coordinate -->scene
- Vector
    - Normalized Vector(정규화 벡터)

        - 모든 벡터 크기가 1이 된다.->내적결과는 cos세타, 외적결과는 sin세타가 된다.
    - Affine space

        - 벡터만으론 위치를 표시하기 어렵다.

        - 여기다가 '점'이라는 개념을 벡터 공간에 추가하면 방향뿐만 아니라 위치도 표시할 수 있게 된다. 동족좌표.

        - 시작 위치를 한 점에 고정할 필요.

        - 기반벡터 : 자신의 합성을 통해 다른 모든 벡터를 표시할 수 있는 벡터. 지들끼리 선형독립니다.

        - 점의 위치를 표현하기 위한 기반벡터의 수가 바로 '차원'

        - 기반벡터 시작점을 일치시킨 곳이 원점
- Polar coordinates(극좌표계)
    - In rectangular system
        - Irregular distribution of continuous points

    - 원점과 반지름, 방위각, 고도각 이라는 요소를 사용하여 좌표를 표시하는것.
- Parametric representation
    - Circle example in computer graphics.
    - x= 2cos@, y=2sin@
    - easy to draw the shape of an object smoothly
        - just increase one parameter ex)세타
        - especially for symmetric objects

- 조명

    - 물체 정점의 색을 부여하는 작업

    - 광원과 물체 특성을 감안하여 정점에서의 빛 세기를 계산

    - 물체에 대한 절단 이전에 일어남.

- 음영

    - 다각형의 래스터 변환과 때를 같이 한다.

    - 래스터 변환에 의해 다각형 내부가 어떤 화소로 사상될 것인지가 결정될 때 해당 화소의 음영이 계산된다
- Illumination Models
    - Physically correct model: 면적 광원. Global illumination. 표면 위의 모든 점을 광원으로 보고, 조명을 계산하는 것은 계산량 면에서 사실상 불가능.
    - Simplistic model: local illumination. 직접적으로 우리 눈에 연계되어있는것만 고려하긔(빛, 물체, 나). 다른 물체에서 반사된 빛은 일체 감안하지 않는다.
- Shading

    - 정점 내부를 칠하는 과정
- Reflection models
        - describe the way incident light reflects from a surface
        - a shading model, a lighting model...
- Light intensity function

    - 광도 = 주변광 + 확산광 + 격면광

        - 주변광 : ambient light intensity
            - independent on the light position, polygon position, viewing condition, or anything else.
            - therefore, it is difficult to allow 3-dimensional effect

        - 확산광(diffuse reflection) : 물체면과 광원과의 공간적인 관계에 따라 명암을 부여
            - light intensity depends on angle of incidence

        - 격면광: specular reflection. 반질반질한 표면에서 반사되는 빛. 반짝이는 이미지: 하이라이트

            - 정반사에 의한 것. 시점이 R의 위치에 있어야 볼수있다. 조금 벗어나도 시점에 도달은 한다.
        - Phong reflection model: 시점으로 들어오는 격면반사량은 cos세타에 비례. 일치하면 cos세타=1로 가장 세다. 또한 n제곱은 물체의 매끄러운정도를 반영한다(광택계수). n이 클수록 (V*R)^n은 작아지므로, 시점을 벗어나면 들어오는 빛이 급격히 줄어든다. 하이라이트는 작고 선명해진다.

- 음영-표면 렌더링
    - Flat shading(Constant shading)

        - 하나의 다각형 전체를 동일한 색으로 칠한다.

        - 일정한 V*R(cos세타)

        - 마하밴드효과: 경계선이 더 뚜렷이 보임(명암대비)
    - Gourad shading

        - 다각형 내부를 서로다른 색으로 칠함.

        - 다각형 정점을 기준으로 색을 계산. 법선벡터 계산불가->근사 이용

        - 격면광은 감안하지 않는다.

        - 여전히 마하밴드 현상. 격면광X, 하이라이트 X, 선형보간으로 인한 계산시간 증가

        - 하이라이트 같은 느낌의 부분은 광원에 직접 노출된 확산광에 의한 것.
    - Phong shading

        - 정점의 법선벡터를 보간하여 화소마다 법선벡터 계산 후 조명모델 가함

        - 구로 셰이딩*3의 시간. 공간벡터 x, y z를 보간해야 하므로..

- 투상변환

    - 투상: 3차원 물체를 화면으로 사상하기 위한 작업
        - view plane: 시선에 수직.

    - 평행투상

        - 시점이 물체로부터 무한대의 거리에 있다고 간주->투상선을 평행하게 가져가는 방법

        - 모든 점에 있어서DOP(투상방향)이 같다. 시점과의 거리가 무관하게 같은 길이의 물체는 같은 길이로 투상된다.

            - 정사투상(Orthographic projection)

            - 경사투상(Oblique projection)
                -  투상선은 나란하지만 투상선이 투상면과 직교하지 않음. 투상면은 시선에 수직이지만, DOP는 투상면에 직교하지 않는다. 투상면에 평행한 위치에 있는 물체의 면만 실제와 같다.

                - 가시부피: 내 시야에 담고 있는 투상범위. 그 밖의 물체는 절단된다.

            - 원근투상

                - 시점이 물체로부터 유한한 거리에 있다고 가정. 투상선이 방사선 모양으로 퍼져나감. 물체의 원근감이 보인다.

#4

- Projection(투상) Transformation
    - 3차원 물체를 화면으로 사상하기 위한 작업. 가시변환(Viewing transformation)이라고도 함.

    - 투상선(Projectors) : 투상 중심으로부터 물체 곳곳을 향한 선들.
    - Parallel(평행)
        - DOP(direction of projection)이 same for all points

        - 시점이 물체로부터 무한대의 거리에 있다고 간주하여 투상선을 나란히 가져가는 방법.

        - 시점으로부터 거리와는 무관하게 같은 길이의 물체는 같은 길이로 투상1

        - 정사투상( Orthographic Projection): 평면도, 입면도, 측면도 등. 모델 좌표계의 주축에의해 형성되는 걸 주 평면이라 하면, 정사투상의 투상면은 주 평면 중 하나와 나란히 놓이게 됨.

        - 축측투상(Axonometiric projection): 한꺼번에 여러면을 보여줌. 투상선이 투상면과 직교하지만, 투상면이 반드시 주 평면들과 나란하진 않다. 결과는 일반적으로 물체의 실제모습이 아님. 즉 실제 길이가 보존되지 않으며, 각 축의 방향으로 서로 다른 축소율을 보임.

        - 경사투상(Oblique projection): 투상선이 나란하다는 점에선 평행투상에 속하지만 투상선이 투상면과 직교하지 않는다. 고개는 돌리지 않고 눈동자만 돌려서 왼쪽 및 오른쪽 물체를 보는것과 비슷.

        - 가시부피: 제한된 크기의 뷰윈도우에 모든 물체의 영상이 맺히겐 못함. 투상범위 제한. 가시부피 밖에있는물체는 보이지 않음. 걸쳐있으면 클리핑.
        - void glOrtho(...)
    - Perspective(원근)

        - 시점이 물체로부터 유한한 거리에 있다 간주하여 모든 투상선이 시점에서 출발하여 방사선 모양으로 퍼져가는 방법. 카메라나 사람의 눈이 실제로 물체를 포착하는 방법.

        - 투상중심(COP: center of projection): 관찰자 위치. view point, eye position, camera position
        - Lines that are not parallel to the projection plane converge to a vanishing point(소실점)
        - View frustum: 절두체. 전방절단면, 후방절단면 뷰 윈도우 투상면, 가시부피...
        - void glFrustum(...)
    - Normalizing Transformation

        - 가시부피의 모습을 가로세로높이가 2인 정육면체로 투상. 원점은 정중앙에. 왼손법칙.

        - 평행투상, 원근투상 모두 동일한 모습의 정규화가시부피를 사용함으로서 파이프라인 처리구조가 동일해짐.

        - 가시부피밖의 물체를 절단하는데 있어서 정규화 가시부피인 정육면체를 기준으로 하는 것이 원래의 가시부피를 그대로 놓고 절단하는 것보다 훨씬 단순.

        - 시점 좌표계 원점을 중심으로 가로, 세로 길이를 1로 정규화함으로써 화면 좌표계로 변환하기가 수월

#5

- Model
    - Mathematical description of objects
        - Position&direction : 3D coordinates
        - Color&Texture: color value, expression
        - Physical property: velocity, temperature, intensity
- Point cloud
    - unstructured set of 3D point samples
        - acquired from range finder, computer vision, etc
- Mesh
    - connected set of polygons(usually triangles)

    - 곡면을 표현하는 평면 다각형 하나하나

    - 공간상의 세 점을 연결한 면은 반드시 평면
- Subdivision surfaces
    - coarse mesh&subdivision rule
        - define smooth surface as limit of sequence of refinements
- Splines

    - 곡선이나 곡면을 표현하는데 가장 중요한 도구. 곡면을 대표할 수 있는 몇몇 점들과 수식만으로 정의.

    - 곡선설계에 사용. Usage: curve, curved surface(자동차, 비행기..), motion path for animation

    - 부드러운 곡선의 모양을 다항식으로 표현.

    - 보간(interpolation)곡선: 주어진 제어점을 통과

    - 근사(Approximaiton)곡선: 제어점을 연결하는 선의 모양에 근사. 제어점 통과X. 곡선을 더 부드럽게 하기위해.
    - Spline control: 지역성(locality. 제어점을 움직일 때 여타 구간에 미치는 영향력은 작은게 좋음)을 높이기 위해 고차원보다 3차원곡선 이용
    - Continuity
        - C0연속성: 두 곡선이 단순히 연결, 양쪽 곡선의 좌표값 동일
        - c1: 곡선의 기울기 동일(1차도함수 동일)
        - c2: 양쪽 곡선의 곡률이 동일(1차, 2차 도함수 동일)
- Hermite curve
    - 2 endpoints and 2 tangent vector. 두 점의 위치와 기울기에 의해 정의.

    - 벡터의 방향이 동일한 경우 크기가 크면 벡터의 영향력이 더 오래 지속.

    - 곡선은 벡터의 방향뿐만 아니라 벡터 크기까지 감안해야 함.
- Bezier curve
    - 4 points. 주어진 제어점 중 처음 점과 마지막 점만 통과. 나머지 점들은 통과X ->일종의 근사 스플라인
- parametric surfaces
- sweeping
    - 2차원 평면 위에 설계된 형상을 3차원 경로를 따라 끌고다님으로써 형성되는 표면.
- volume model
    - describes an object identical cells in a fixed, regular grid - voxel, discrete
    - adequate for medical and scientific applications

    - 주어진 3차원 데이터로부터 동일한 스칼라의 양을 지닌 표현을 다각형의 집합으로 나타내는 기법

    - 밀도별로 그리되, 색을 달리하면 동일 밀도를 가진 부분이 단일색을 가진 하나의 등고면을 형성.
- primitive instancing
    - primitive: parameterization in terms of the transformation and properties
    - hard to describe complex objects
- Constructive solid geometry(CSG)

    - 집합 연산에 의해 새로운 물체를 만들어내기. 합집합 교집합...
    - combines simple primitives by means of regularized boolean set operation
- Procedural model
    - fractal, algebric, self-similarity, highly compressed form
- BSP tree& Octree

    - 사선에 의해 분할. 트리의 높이는 낮아지고 더 좋은 균형->검색효율 빨라짐. but 연산속도 느려짐.
    - hierarchical variant of spatial-occupancy enumeration.
    - divide-and-conqure, power of binary subdivision
    - tree structure: left nodes-primitives

#6

- Shearing(전단)

    - 물체를 한쪽 방향으로 밀어낸 모습. 물체 자체를 변형. 평행 유지
- Transformation
    - ridged body t(강체변환)

        - 이동변환, 회전변환. 물체 자체의 모습은 불변
    - similarity t(유사변환)

        - 강체변환+균등크기조절변환, 반사변환.

        - 물체면 사이의 각이 유지됨. 물체내부 정점간의 거리가 일정한 비율로 유지됨.
    - afine t(어파인변환)

        - 유사변환+차등크기조절변환, 전단변환

        - 물체의 타입이 유지(직선->직선, 다각형->다각형)

        - 평행선이 보존
    - perspective t(원근변환)

        - 평행선이 만남. 직선->직선.

        - 변환행렬의 마지막 행이 (0, 0, 0, 1) 아님.
- Clipping
    - remove portion of line outside viewport or screen boundaries,2차원으로 가져와서 튀어나온 애들 자르는게 빠름
        - point clipping
        - line clipping - endpoint test
            - trivially accepted: 둘다 안에
            - intersects : 하나만 안에
            - intersects or rejected: 둘다 밖에
        - Cohen-sutherland algorithm
            - 1. E1==E2==0000: visible
            - 2. E1&E2 !=0000: clip(완벽히안보임)
            - 3. E1!=0000, E2==0000or vice versa
            - 4. E1&E2 ==0000
            - 3&4 : divide line into segments. 걸쳐져있는경우.
        - parametric algorithm
            - P(t) = P0+t(P1-P0), 0=<t=<1
            - reduce the number of calculation intersections by simple comparisons of parameter t
            - choose an arbitrary point Pei on edge Ei and consider three vectors P(t)-Pei
            - t=Ni*[Pei-P0] / Ni*(P1-P0)
        - Liang-Barsky algorithm
            - given the 4 values of t for a line segment, determine which pair of t's are internal intersections.

            - 선분진행방향과 clipping regin 내적. 0보다 크면 P.L 작으면 P.E
        - Clipping polygon
            - Sutherland-hodgeman algorithm
                - may display extraneous lines for concave polygons
                - solution: split the concave polyon into two or more convex polygons and process each convex polygon separately: vector method for splitting concave polygons
            - Weiler-atherton algorithm
        - Clipping text
- Viewport transformaion
    - viewplane의 최대사이즈를 1로맞춰(정규화. nomarlizaion)해놓으면 나중에 1024이런식으로 간단히 곱셈만 하면 됨.
    - window-image-viewport 구분!
    - window: word-coordinate area selected for display. what is to be viewed
    - Viewport: area on the display device to which a window is mapped, where it is to be displayed
- Scan conversion
    - figure out which pixels to fill

#7

- raster
    - =pixel.
    - rasterization: 픽셀을 채우는 과정. scan conversion.
    - meaning: 물체를 표현하기 위해 어떤 화소를 밝힐 것인지를 결정하는 작업.
    - tradeoff between precision and speed
- scan converting lines
    - A line from (X0, Y0) to (X1, Y1) =>Series of pixels

    - 대전제

        - 유저가 선택한 두께가 일관적이어야 함.

        - 직선은 직선처럼 보여야 한다.

        - 방향성을 가지면 안된다.(A->B와 B->A는 같아야 함)

        - 빨라야 함.
- Digital Differental Analyzer(DDA)
    - basic incremental algorithm
    - round to the closest raster position ->시간 걸림
    - drawbacks : floating-point operations
- Midpoint Line Algorithm
    - Bresenham's line algorithm.
        - suppose that we have just finished drawing a pixel P(Xp, Yp)and we are interested in figuring out which pixel to draw next
        - 0<기울기<1 :

        - 기울기>1: y가 1증가될때 선택하는게 구멍이 덜뚤림.

        - 대입해봤을때 0보다 크면 직선밑에 점이있다는 뜻.

        - 이전값을 이용한다는 그 장점 하나로 다음것 구하는게 훨씬 빨라짐.
- Midpoint Circle algorithm
    - F(x, y) = x^2 + y^2 - R^2
        - =0: on the circle
        - >0:outside <0:inside
- Area filling
    - span-filling process: 홀수번째 교차화소부터 짤수번째 교차화소 직전까지 채움
        - odd->even : 버림 even->odd : 올림
        - y min 이면 비트갱신.

        - 수평선일땐 비트갱신 X

        - 윗면들은 다 안칠해지고 밑면들은 다 칠해짐 ->사용자가 고려한 넓이 유지

        - 교차점이2개 ->홀수로 바뀌었다 다시 짝수로 바뀔수있음->수평 혹은 수직을 기준으로 바꿔주는지 정해야함.
- Boundary fill algorithm
    - Starting a point inside the figure and painting the interior in a specified color or intensity
    - identical color in boundary, not consider interior color
- Flood fill algorithm
    - start a point inside the figure, replace a specified interior color only.
- Aliasing
    - the distortion of information due to low-frequency sampling
    - Antialiasing method
        - Increase monitor resolution
        - super sampling: sampling object characteristics at a high resolution and  display the results at a lower resolution
        - area sampling: determine pixel intensity by calculating the areas of overlap of each pixel with the objects to be displayed
        - filter functions(weighting surface)

#8

- Motivation
    - surfaces may be back-facing, occluded(가리다), overlapping, intersecting(교차하다)
- Bounding volumes
    - approximate objects with simple enclosures before making comparisons
    - the simplest approximate enclosure is a boundary box
- Backface removal

    - 후면제거. 시점 반대쪽을 바라보는 법선벡터:후면. 시점에서 멀어지는 방향의 법선벡터를 가진 모든 면이 후면.

    - 후면은 단지 시점의 위치와 해당면이 서있는 방향으로 판단가능.
    - visibility:=Np*V>0 내적.
- Depth-buffer algorithm

    - 은면 제거의 속도를 높이기 위해 사용되는 하드웨어 메모리. 모든 개별 화소에 대해 현재 광선과 교차된 물체면의 깊이 저장.
        - 1. frame buffer:color     2. depth buffer(z-buffer): z-value
        - z-buffer 장점: 물체를 거리별로 sorting안해도 됨.구현하기 쉽다, 이미지사이즈의 픽셀에 복잡도가 비례.

        - 단점: 모니터 사이즈만큼의 버퍼가 추가, 모니터해상도 낮으면 aliasing
- Depth-sort algorithm
    - pinter's algorithm
        - sorting objects according to Zmax. 걍 다 그림

        - 한번 sorting하면 뭐 딴거 신경쓸필요 없음.
- Ray casting
    - cast ray from viewpoint through each pixel. to finnd front-most surface
    - O(pixels). simple, but not generally used.
- Texture mapping method
    - non-parametric texture mapping
        - gives cookie-cutter effect.
    - parametric texture mapping
        - separate texture space and screen space. deform the textured polygon into screen space
    - use mipmapping :잘 해서 박아넣음.
    - technique
        - 1. Brute force: 무식한방법. Just sum. 이결과가 가장 좋음(?)
        - 2. Mip maps : a sequence of textures prefiletered at multiple resolutions

            - 전처리단계에서 미리 절반씩 줄어든 화면 만듦. 속도향상 위해.
            - makes distant objects looke better
        - 3. Summed area table(SAT)
            - keep sum of everything below and to the left
            - use four table lookup, requires more memory

            - 일반적으로 가장 결과 좋음
- Bump mapping:

    - 귤껍질, 추워서 닭살돋은 피부
    - textures can be used to alter the surface normal of an object, but does not chage the acture shape of the surface

    - 노멀벡터 방향만 강제로 바꾸기
- Ray tracing
    - the way light actually behaves. global illumination model. 눈에서 빛쏘기

#OpenGL

- glutInitDisplayMode

    - 모든 드로잉 명령들을 화면에 나타난 윈도우상에서 수행
- glutCreateWindow
    - create window using glut API
- SetupRC()
    - rendering 전에 수행될 OpenGL초기화 작업 함수.
