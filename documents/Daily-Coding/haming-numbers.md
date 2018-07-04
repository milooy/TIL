/*
http://www.codewars.com/kata/526d84b98f428f14a60008da/train/javascript
235

0 0 0  1
1 0 0  2
0 1 0  3
2 0 0  4
0 0 1  5
1 1 0  6
3 0 0  8
0 2 0  9 
1 0 1  10
2 1 0  12
0 1 1  15



재귀함수.
루프를 도는데,
2곱해보고 비교, 3곱해보고 비교, 5곱해보고 비교해 작은것이 hamming(n-1)보다 작으면 return


*/
function hamming (n) {
  function recur(num) {

    if(num==n) {
      return 0;
    }
  }
  recur(1);
}

Test.expect(hamming(1)) //== 1, "hamming(1) should be 1");
Test.expect(hamming(2)) //== 2, "hamming(2) should be 2");
Test.expect(hamming(3)) //== 3, "hamming(3) should be 3");
Test.expect(hamming(4)) //== 4, "hamming(4) should be 4");
Test.expect(hamming(5)) //== 5, "hamming(5) should be 5");
Test.expect(hamming(6)) //== 6, "hamming(6) should be 6");
Test.expect(hamming(7)) //== 8, "hamming(7) should be 8");
Test.expect(hamming(8)) //== 9, "hamming(8) should be 9");
Test.expect(hamming(9)) //== 10, "hamming(9) should be 10");
Test.expect(hamming(10)) //== 12, "hamming(10) should be 12");
Test.expect(hamming(11)) //== 15, "hamming(11) should be 15");
Test.expect(hamming(12)) //== 16, "hamming(12) should be 16");
Test.expect(hamming(13)) //== 18, "hamming(13) should be 18");
Test.expect(hamming(14)) //== 20, "hamming(14) should be 20");
Test.expect(hamming(15)) //== 24, "hamming(15) should be 24");
Test.expect(hamming(16)) //== 25, "hamming(16) should be 25");
Test.expect(hamming(17)) //== 27, "hamming(17) should be 27");
Test.expect(hamming(18)) //== 30, "hamming(18) should be 30");
Test.expect(hamming(19))// == 32, "hamming(19) should be 32");
