require('dotenv').config();
const mongoose = require('mongoose');
const axios = require('axios');
const Joke = require('./profile.model');

// If a mongoDB is specified in env config, use it.
// Otherwise, use local mongodb.
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dadjokes';

mongoose.connect(mongoURI, { useNewUrlParser: true, useCreateIndex: true });

// Once connected, check to make sure there is data in the database.
// If not, get data from the joke API, and save it to the database.
mongoose.connection.on('connected', () => {
	console.log(`Connected to database ${mongoURI}.`)
})
.then(() => checkForData())
.catch(e => console.log(`Error with mongoose connection.`, e))

mongoose.connection.on('error', (err) => {
	console.log(`Mongo connection error.`, err)
})

// Only get data if it is not there yet.
const checkForData = () => {
	Joke.countDocuments({}, (err, count) => {
		console.log(`${count} jokes saved in database.`);
		if (count < 500) {
			saveData();
		}
	})
}

// Use recursion to loop over paginated results from API.
const saveData = (page = 1, jokeData = []) => {
	const config = {
		headers: {
			'Accept': 'application/json',
			'User-Agent': 'https://github.com/KarlaJeanNelson'
		},
		params: {
			page,
			limit: 30
		}
	}
	axios.get('https://icanhazdadjoke.com/search', config)
	.then(({data}) => {
		const retrievedJokes = jokeData.concat(data.results)
		if (data.current_page === data.total_pages) {
			retrievedJokes.forEach(item => {
				const { joke } = item;
				Joke.findOneAndUpdate({ id: item.id }, { joke }, { upsert: true })
				.catch(e => console.log(e))
			})
		} else {
			page++;
			saveData(page, retrievedJokes);
		}
	})
	.catch(e => console.log(`getData error page ${page}`, e))
}