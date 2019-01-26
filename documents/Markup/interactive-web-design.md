# HCJ 필수 구문

### CSS
```css
/* background */
background-size: 넓이 값 높이 값;
background-size: cover; //풀스크린환경에서 배경이미지 사이즈 이거 많이 씀. 좌우 잘리고 빈여백 없이.
background-size: contain; //안잘리고 꽉

/*box-sizing*/
//넓이 값과 높이 값에서 padding과 border값을 일일이 빼주지 않아도 브라우저가 계산해줌.
box-sizing: border-box;

/*transform - 2D변형*/
transform: translateX(100px);
transform: translateY(-100px);
transform: translate(100px, 40px);
transform: skewX(30deg); //x축으로 기울이기
transform: scaleX(1.5); //x축으로 1.5배만큼 키우기. 마이너스 지원X
transform: rotate(15deg); //15도 돌리기

transform-origin: right bottom; //해당요소 모양변형시, 변형의 기준점 변경
transform-origin: 20px 30px; 
transform-origin: 0% 100%;

/*transform - 3D변형*/
transform:rotateY(50deg); //transform시켜주고,
perspective:150px; //회전한 형태의 왜곡률. 값이 클수록 심해짐.
tranform: translateZ(500px); //사용자가 브라우저를 바라보는 시점을 기준으로 앞/뒤로 움직임.

/*transition - CSS의 꽃*/
- 보통 가상선택자 :hover로 적용.
- transition구문의 위치는 변경후인 :hover부분이 아니고 변경 전인 원래의 태그선택자.
transition: 속성명 전환시간 가속도설정 지연시간;
transition: all 1s ease 0s;
```
