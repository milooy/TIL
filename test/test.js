// 통과 (75.62ms, 34MB)
function solution1(info, query) {
  var answer = [];

  query.forEach(q => {
    let queries = q.split(' ');
    const score = Number(queries.pop());
    queries = queries.filter(q => q !== 'and' && q !== '-');

    let filteredInfo = info;

    queries.forEach(smallQuery => {
      filteredInfo = filteredInfo.filter(inf => inf.includes(smallQuery));
    })
    answer.push(filteredInfo.filter(i => Number(i.split(' ').pop()) >= score).length);
  })

  return answer;
}


// 통과 (60.27ms, 35.6MB)
function solution4(info, query) {
  return query.map(q => {
    const cleanedQuery = q.split(' ').filter(a => a !== '-' && a !== 'and');
    const score = cleanedQuery.pop();
    i.split(' ')[-1]
    return info.filter(i => cleanedQuery.every(el => i.includes(el)) && Number(i.replace(/\D/g, '')) >= score).length;
  })
}

//통과 (57.75ms, 35.3MB)
function solution(info, query) {
  return query.map(q => {
    return info.filter(i => q.split(' ').every(el => {
      if (el == '-' || el == 'and') {
        return true
      } else if (!isNaN(el)) {
        return Number(i.replace(/\D/g, '')) >= el
      }
     return i.includes(el) 
    })).length;
  })
}

// 통과 (197.66ms, 34.4MB)
function solution5(info, query) {
  return query.map(q => {
    const cleanedQuery = q.split(' ').filter(a => a !== '-' && a !== 'and');
    const score = cleanedQuery.pop();
    const regexs = cleanedQuery.map(cq => `(?=.*?\\b${cq}\\b)`).join('');
    return info.filter(i => RegExp(regexs).test(i) && Number(i.replace(/\D/g, '')) >= score).length
  })
}

// 답: [ 1, 1, 1, 1, 2, 4 ]
console.log(solution(["java backend junior pizza 150", "python frontend senior chicken 210", "python frontend senior chicken 150", "cpp backend senior pizza 260", "java backend junior chicken 80", "python backend senior chicken 50"], ["java and backend and junior and pizza 100", "python and frontend and senior and chicken 200", "cpp and - and senior and pizza 250", "- and backend and senior and - 150", "- and - and - and chicken 100", "- and - and - and - 150"]))



function regexGenerator(query) {
  let regexArr = query.split(' ').map(f => {
    if (f === '-') {
      return '\\w+'
    }
    if (f === 'and') {
      return ' '
    }
    if (typeof f === Number) {
      return ''
    }
    return f;

  })
  const score = regexArr.pop();
  return [regexArr.join(''), score];
}

//6: 통과 (105.45ms, 34.4MB)

function solution3(info, query) {
  return query.map(q => {
    const [regex, score] = regexGenerator(q);
    return info.filter(i => {
      return Number(i.replace(/\D/g, '')) >= score && RegExp(regex).test(i)
    }).length
  })
}

//["java backend junior pizza 150"에 [backend, junior] 가 있는가?

