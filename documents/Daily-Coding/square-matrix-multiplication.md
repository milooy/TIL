# Daily Codewars #22
## Question
[codewars link](http://www.codewars.com/kata/5263a84ffcadb968b6000513/train/javascript)
Write a function that accepts two square (nxn) matrices (two dimensional arrays), and returns the product of the two. Only square matrices will be passed in.

How to multiply two square matrices: 

We are given two matrices, A and B, of size 2x2 (Kata tests are not limited to 2x2). Matrix C, the solution, will be equal to the product of A and B. To fill in cell [ 0 ][ 0 ] of matrix C, you need to compute: A[0][0] * B[0][0] + A[0][1] * B[1][0]. 

More general: To fill in cell [ i ][ j ] of matrix C, you need to first multiply the elements in the i'th row of matrix A by the elements in the j'th column of matrix B, then take the sum of all those products. This will give you the value for cell [ i ][ j ] in matrix C. 

Example(Matrix A * Matrix B = Matrix C):
|1 2|
|3 2| 
*
|3 2| 
|1 1|
=
|5 4 |
|11 8| 

Calculating the above C values: 
```
C[0][0] = A[0][0] * B[0][0] + A[0][1] * B[1][0] = 1 * 3 + 2 * 1 = 5

C[0][1] = A[0][0] * B[0][1] + A[0][1] * B[1][1] = 1 * 2+ 2 * 1 = 4

C[1][0] = A[1][0] * B[0][0] + A[1][1] * B[1][0] = 3 * 3 + 2 * 1 = 11

C[1][1] = A[1][0] * B[0][1] + A[1][1] * B[1][1] = 3 * 2 + 2 * 1 = 8
```
[Link to Wikipedia](http://en.wikipedia.org/wiki/Matrix_multiplication#Examples_2) explaining matrix multiplication (look at the square matrix example): 
> n차원 배열의 곱을 구하는 문제이다.

## My Solution
```javascript
function matrixMultiplication(a, b){
    var mul = [];
    var len = a.length;
    for(i=0; i<len; i++){
        var row = [];
        for(j=0; j<len; j++){
            var x = 0;
            for(k=0; k<len; k++) x += a[i][k]*b[k][j];
            row.push(x);
        }
        mul.push(row);
    }
    return mul;
}
```
for문을 세번 돌렸다.
가장 기초적이게 푼 느낌.

## @FunGuy's Solution
```javascript
function matrixMultiplication(a,b){
  return a.map(function(row){
      return row.map(function(_,i){
          return row.reduce(function(sum,cell,j){
              return sum+cell*b[j][i];
          },0);
      });
  });
}
```
[[1, 2], [3, 2]], [[3, 2], [1, 1]]를 예로 들어보자.
a배열에 하나씩 map을 돌리면, [1,2]와 [3,2]에 각각 적용되는 것이다.
그리고 그 [1,2]에 또 map을 해주며, 인자는 _와 index를 넘긴다.(앞에걸 쓰지 않을때 _라고도 쓰는구나.)
그리고 거기서 0부터 시작하는 reduce를 적용해주는데,
```
2번째맵: [1,2] => 0+1*b[0][0] + 2*b[0][1]
             => 0+1*b[0][1] + 2*b[1][1]
        [3,2]=> 이하 동일
```
이렇게 해주는 것이다. 계속 return문으로 넣어주며 구조를 그대로 이어가며.
좋은 방법이다!!

