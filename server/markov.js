// Generate lookupTable and according to order and saved jokes.
const getLookupTable = (docArr, orderStr) => {
	const jokeSeeds = [];
	const lookupTable = [];
	const order = Number(orderStr);
	docArr.forEach(({joke}) => {
		// console.log(`joke:`, joke);
		let text = joke.replace(/[^\w\s]|_/g, $1 => ' ' + $1).replace(/[ ]+/g, ' ').split(' ');
		// console.log(text);
		for (let i = 0; i <= text.length - order; i++) {
			let gram = text.slice(i, i + order);
			if (i === 0) {
				jokeSeeds.push(gram)
				// console.log(`jokeSeeds:`, jokeSeeds);
			}
			let nextWd = i === text.length - order ? 'THE_END' : text[i + order]
			lookupTable.push({gram: gram.join(' '), nextWd})
		}
	})
	// console.log(`lookupTable length`, lookupTable.length);
	return { lookupTable, jokeSeeds }
}

module.exports = getLookupTable;