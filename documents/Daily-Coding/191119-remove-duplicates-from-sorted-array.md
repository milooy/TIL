# [일일코딩 #33] Remove Duplicates from Sorted Array

일일코딩 #32가 2017년 6월이었고, 오늘의 일일코딩 #33은 2019년 11월이다. 2년이 넘었다.
2년만에 푼 알고리즘 문제는 아주 노답이었다고 할 수 있다.
Leetcode easy난이도 문제인데 한시간 걸렸거든.
와 정말 부끄럽다.

영어 설명을 제대로 읽지 않은 탓도 있다.
Array의 duplicated된 엘리먼트를 지우라기에 당연히 지워진 array를 반환하는줄 알았지.
그런데 반환값은 Array의 length뿐이었고 Params로 온 Array의 reference를 받아 원본 Array를 중복 없이 만드는거였다. 메모리 새로 안쓰고.

담엔 잘 읽어.

## Question
[Leetcode 링크](https://leetcode.com/problems/remove-duplicates-from-sorted-array/)
Given a sorted array nums, remove the duplicates in-place such that each element appear only once and return the new length.

Do not allocate extra space for another array, you must do this by modifying the input array in-place with O(1) extra memory.

즉 아래와 같다.
```js
removeDuplicates([1,1,2]); // returns 2 (원본 Array는 [1, 2]로 modify됨)

removeDuplicates([0,0,1,1,1,2,2,3,3,4]); // returns 4 (원본 Array는 [0, 1, 2, 3]로 modify됨)
```

## My answer

While문을 돌면서 해당 element가 Array의 맨 마지막에 있는지 확인했다.
맨 마지막이면 살려주고 아니면 splice로 제거.
정렬된 배열이라 다 뭉쳐있을테니 각 뭉치의 제일 오른쪽 애들만 남긴다는 아이디어였다.

```js
var removeDuplicates = function(nums) {
    var count = nums.length - 1;
    while(count >= 0) {
        if(count == nums.lastIndexOf(nums[count])) {
            count--;
        } else {
            nums.splice(count, 1);
        }
    }

    return nums.length;
};
```
잘 되긴 한다.

성능은 후지다. 이 퍼센트가 뭔가 했더니 하위 5%, 18%더라.
```
Runtime: 224 ms, faster than 5.75% of JavaScript online submissions for Remove Duplicates from Sorted Array.
Memory Usage: 37.8 MB, less than 18.75% of JavaScript online submissions for Remove Duplicates from Sorted Array.
```

처음에 param으로 받은 Array를 reference로 고쳐야한단걸 몰랐을때는
Array.prototype.reduce로 접근했다. prev, next를 돌며 앞뒤가 다르면 새로운 Array에 push해줬음. 그건 그것나름대로 제일 앞 or 제일 뒤가 edge case라는 헛점은 있더라 - 무튼 안됨.

다른 사람들은 어케 했는지 보자

## Others' answer

### Best practice
```js
var removeDuplicates = function(nums) {
    if (nums.length == 0) return 0;
    var i = 0;
    for (var j = 1; j < nums.length; j++) {
        if (nums[j] != nums[i]) {
            i++;
            nums[i] = nums[j];
        }
    }
    return i + 1;
}
```
첨엔 이해가 안갔다
이건 `[0,0,1,1,1,2,2,3,3,4]`를 `[ 0, 1, 2, 3, 4, 2, 2, 3, 3, 4 ]`로 만들텐데 그럼 뒤에 더러운 숫자들이 남지 않는가?

근데 다시 Question을 읽어보니 뒤에 더러운 숫자가 있던 없던 반환한 lengthNum 길이만큼만 일치하면 되는거더라구.
문제가 여러모로 깔끔하지 못하네...

### Answer by @Qfab

```js
var removeDuplicates = function(nums) {
    nums.splice(0, nums.length, ...(new Set(nums)));
};
```
변태코드