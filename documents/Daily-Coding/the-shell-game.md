# Daily Codewars #19
## Question
http://www.codewars.com/kata/the-shell-game/train/javascript
"The Shell Game" involves three shells/cups/etc upturned on a playing surface, with a ball placed underneath one of them. The shells are then rapidly swapped round, and the game involves trying to track the swaps and, once they are complete, identifying the shell containing the ball.

This is usually a con, but you can assume this particular game is fair...

Your task is as follows. Given the shell that the ball starts under, and list of swaps, return the location of the ball at the end. All shells are indexed by the position they are in at the time.

For example, given the starting position `0` and the swap sequence `[(0, 1), (1, 2), (1, 0)]`:

The first swap moves the ball from `0` to `1`
The second swap moves the ball from `1` to `2`
The final swap doesn't affect the position of the ball.

So
```
swaps = [[0,1], [1,2], [1, 0]]
find_the_ball(0, swaps) == 2
```
There aren't necessarily only three cups in this game, but there will be at least two. You can assume all swaps are valid, and involve two distinct indices.
> 공 섞기 게임이다.

## My Solution
```javascript
find_the_ball=function(start,swaps){
    for(i in swaps){
        var p = swaps[i].indexOf(start);
        if(p>=0) start = !!p? swaps[i][0] : swaps[i][1];
    }
    return start;
}
```
> 0이면 바로 1로, 1이면 바로 0으로 바꾸는 방법이 없을까?
> !!0 == false 이런걸 써서...

## @Balkoth's solution
```javascript
function find_the_ball(start,swaps) {
  return swaps.reduce(function(ball, swap) {
    if (swap[0] === ball) ball = swap[1];
    else if (swap[1] === ball) ball = swap[0];
    return ball;
  }, start);
}
```
> 첫 값은 start를 들고있는다. 현재 공의 위치이다.
> 그리곤 첫 배열 swap을 본다. swap[0]이 현재공위치면 ball(이전값. 현재값)에 swap[1]을 넣어주고, vise versa.
> ball을 리턴해주면 그 ball은 다시 prev가 되어 루프를 돈다.
> 리듀스 엄청 자유자재로 쓰네. 나도 이제!

## @ooflorent's Solution
```javascript
function find_the_ball(start, swaps) {
  return swaps.reduce(function(pos, swap) {
    return swap[0] == pos ? swap[1] : swap[1] == pos ? swap[0] : pos
  }, start)
}
```
> 윗 분한고 같은 방식인데 3항연산자를 중첩해서 한번에 해결했다.
> swap[0]이 현재공위치면 swap[1]을, 아니라면 
> swap[1]이 현재공위친지 보고 맞으면 swap[1]을, 아니라면 pos를 리턴. 
