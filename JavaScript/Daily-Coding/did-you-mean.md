/*
준단어가 배열단어 되려면 해야 하는 짓
- 앞에서부터 차례로 세어가며
- 원단어에 있으면 그 자리로 옮긴다.
- 없으면 추가한다.
*/

function Dictionary(words) {
  this.words = words;
}
/*
Dictionary.prototype.findMostSimilar = function(term) {
// console.log(this.words, term);
  var countArr = [];
  var changeArr = [];
  for(i in this.words) {
    var count = 0;
    var word = this.words[i];  //word : cherry
    var left = this.words[i].length;
    for(j in term){ // berry를 한글자씩
      var wIdx = word.indexOf(term[j]);
      if(wIdx>=0) {
        word = word.slice(0, wIdx) + word.slice(wIdx+1);
        count++;
      } else left++;
    }
    countArr.push(word);
    changeArr.push(this.words[i].length-count*2+term.length);
  }
  console.log(countArr, changeArr);
  // countArr = countArr.map(function(i){return Math.abs(i-1);})
  var min = Math.min.apply(null, changeArr);
  return this.words[changeArr.indexOf(min)];
}
*/

Dictionary.prototype.findMostSimilar = function(term) {
// console.log(this.words, term);
  var countArr = [];
  var changeArr = [];
  for(i in this.words) {
    var count = 0;
    var word = this.words[i];  //word : cherry
    var left = this.words[i].length;
    for(j in term){ // berry를 한글자씩
      var t = term[j];
      var w = word[j];
      if(t===w) {
        continue;
      } else if(word.indexOf(t)>j) {
        word = 
      }

      var wIdx = word.indexOf(term[j]);
      if(wIdx>=0) {
        word = word.slice(0, wIdx) + word.slice(wIdx+1);
        count++;
      } else left++;
    }
    countArr.push(word);
    changeArr.push(this.words[i].length-count*2+term.length);
  }
  console.log(countArr, changeArr);
  // countArr = countArr.map(function(i){return Math.abs(i-1);})
  var min = Math.min.apply(null, changeArr);
  return this.words[changeArr.indexOf(min)];
}

// fruits = new Dictionary(['cherry', 'pineapple', 'melon', 'strawberry', 'raspberry']);
// console.log(fruits.findMostSimilar('strawbery')); // must return "strawberry"
// console.log(fruits.findMostSimilar('berry')); // must return "cherry"

// things = new Dictionary(['stars', 'mars', 'wars', 'codec', 'codewars']);
// console.log(things.findMostSimilar('coddwars')); // must return "codewars"

// languages = new Dictionary(['javascript', 'java', 'ruby', 'php', 'python', 'coffeescript']);
// console.log(languages.findMostSimilar('heaven')); // must return "java"
// console.log(languages.findMostSimilar('javascript')); // must return "javascript" (same words are obviously the most similar ones)
foo = new Dictionary([ 'emvquxrvvlvwvsi',
'zqdrhpviqslik',
'karpscdigdvucfr' ]);
console.log(foo.findMostSimilar('rkacypviuburk')); // zqdrhpviqslik
