function countTwo1(num) {
	var total = 0;
	for (var i = 1; i<=num; i++) {
		total += i.toString().split("").filter(j => j === "2").length;
	}
	return total;
}

function countTwo2(num) {
	return (Array.from(Array(num+1).keys()).join("").match(/2/g)).length
}

console.log("A", countTwo1(2999));
console.log("B", countTwo2(2999));
