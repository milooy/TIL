# TypeScript

## TS in react

```html
import * as React from "react";

// Props의 타입 인터페이스를 만듦
export interface HelloProps { compiler: string; framework: string }

export const Hello = (props: HelloProps) => {
    <div>{props.compiler} {props.framework}</div>
}
```

## 기본 타입

```js
let isLoading: boolean = false;
let likes: number = 6;
let color: string = "blue";
```

**Tuple**
```js
// 그냥 배열인데 첫번째 인자는 string, 둘째인자는 number여야함 (나머지 인자들은 string이나 number면 됨)
let flexibleArray: [string, number];
flexibleArray = ["hello", 10]; // O
flexibleArray = [10, "hello"]; // X

flexibleArray[3] = "world"; // O
flexibleArray[6] = true; // X (string이나 number가 아니기 때문)
```

**Enum**
```js
enum Color {Red, Green, Blue}
let myColor: Color = Color.Green;
let yourColor: string = Color[2]; // 'Blue'
```

**Any**
```js
let notSure: any = 4;
notSure = "Hello";
notSure = true;

let notSureArray: any[] = [1, true, "hello"];
notSureArray[1] = 100;
```

**Void**
```js
function returnNothing(): void {
    alert("hi");
}

// 참고: void타입의 변수 선언은 undefined나 null만 할당할수있기 때문에 유용하지 않음
// undefined나 null도 마찬가지.
let unusable: void = undefined;
let unusable2: undefined = undefined;
let unusable3: null = null;
```

**Never**
```js
// 절대로 반환하지 않음
function throwError(message: string): never {
    throw new Error(message);
}

function infiniteLoop(): never {
    while (true) {}
}
```

**Type assersions**
컴파일러한테 "나대지마. 난 내가 뭐하는지 안다구"라고 말하는거임.
```js
let myColor: any = "Red";

// 요걸 타입추론을
let colorLength = myColor.length;
// 요렇게 꺾쇠괄호 써서 하는거임. myColor string으로 쓸거라구! 라고 함
let colorLength: number = (<string>myColor).length;
// 아니면 이렇게 as 써서 해도 됨 - JSX에선 보통 일케 함
let colorLength: number = (myColor as string).length;
```

## 변수 선언

**재선언과 Shadowing**
- shadowing: 중첩된 스코프에서 기존의 변수 이름을 사용하는것 - 웬만하면 피해야 함(명확한 코드 작성 위해)




## Refer
- [TypeScript-Handbook 한글 문서
](https://typescript-kr.github.io/pages/tutorials/TypeScript%20in%205%20minutes.html)