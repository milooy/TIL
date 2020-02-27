function lru(sequence=[], cache_size=0) {
  let delay_time = 0; // sum of delay time by each sequence item
  // cache is a data from LRUCache as list (first is least recently used item)
  let cache = [];

  while(sequence.length !== 0) {
  	const item = sequence.shift();
  	if (cache.includes(item)) { // 캐시 있는상태
  		delay_time += 1;
  		cache = cache.filter(a => a != item) // 기존캐시 지우고
  		cache.push(item); // 마지막에 캐시넣음
  	} else {
  		delay_time += 5; // 캐시 없는 상태
  		if (cache.length >= cache_size) { // 공간 없음
  			cache.shift();
  		}
  		cache.push(item)
  	}
  }
  // TODO
  return [delay_time, cache];
}

console.log(lru(["donut", "juice", "apple", "donut"], 3))
// [16, ["juice", "apple", "donut"]]

console.log(lru(["donut", "juice", "apple", "banana"], 3))
// [20, ["juice", "apple", "banana"]]



console.log(lru(["donut", "juice", "apple"], 0))
// [15, []]

console.log(lru(["donut", "donut", "apple", "donut", "apple", "apple", "donut"], 1))
// [27, ["donut"]]

console.log(lru(["donut", "juice", "apple", "apple", "donut", "juice", "coffee"], 5))
// [23, ["apple", "donut", "juice", "coffee"]]





// 고려해야할점
// - single el array
// - 짱큰 max value
// - 양수만
// - 음수만
// - 만자리 array
// - 4만자리 
// - 10만자리