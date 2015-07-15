/*
world길이 대비 같은문자 비율이 높은걸 반환
*/
function Dictionary(words) {
  this.words = words;
}

Dictionary.prototype.findMostSimilar = function(term) {
  var countArr = [];
  for(i in this.words) {
    var count = 0;
    var word = this.words[i];
    var left = this.words[i].length;
    for(j in term){
      var wIdx = word.indexOf(term[j]);
      if(wIdx>=0) {
        word = word.slice(0, wIdx) + word.slice(wIdx+1);
        count++;
      } else left++;
    }
    if(left==this.words[i].length) return
    countArr.push(count / left);
  }
  countArr = countArr.map(function(i){return Math.abs(i-1);})
  var min = Math.min.apply(null, countArr);
  return this.words[countArr.indexOf(min)];
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


http://programmingsummaries.tistory.com/108
