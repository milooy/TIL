# [일일코딩 #32] Two Sum

## Question
[링크](https://leetcode.com/problems/two-sum/)
Given an array of integers, return indices of the two numbers such that they add up to a specific target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

Example:
Given nums = [2, 7, 11, 15], target = 9,

Because nums[0] + nums[1] = 2 + 7 = 9,
return [0, 1].

## My Answer
```javascript
var twoSum = function(nums, target) {
  for (var i = 0; i <nums.length; i++) {
    var lastIdx = nums.lastIndexOf(target - nums[i]);
    if(lastIdx > 0) return new Array(i, lastIdx);
  }
};
```

lastIndexOf로 풀었다. 처음엔 Array 초기화 할 때 `var answerArr = []`로 해서 `answerArr.push(a, b)`로 넣었는데 코드 줄인다고 위처럼 바꿨더니 성능이 조금 더 줄었다. 변수 할당보다 new Array 로 하는게 더 오래걸리나보다.

## Other's answer
3가지 방법을 제시함.
1. 브루트 포스: 포문 2번 돌면서 뺀 값이 있나 찾기
2. Two pass hash table: 잘 이해 안감 왜 굳이?
3. One-pass hash table: 내가 푼 방법. 뺀 값이 map에 있나 확인
