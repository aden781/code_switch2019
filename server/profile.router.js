const express = require('express');
const router = express.Router();
const Profile = require('./profile.model');
const getLookupTable = require('./markov')

router.post('/', (req, res) => {
	const { newProile: newProfile } = req.body;
	Profile.create({ profile: newProfile }, (err, doc) => {
		err ? res.json({ success: false, error: err }) : res.sendStatus(201)
	})
})

router.put('/', (req, res) => {
	const { payload } = req.body;
	const updates = [];
	const errors = [];
	payload.forEach(item => {
		Profile.findOneAndUpdate({ id: item.id }, item, { upsert: true }, (err, doc) => (
			err ? errors.push(item) : updates.push(item)
		))
	})
	res.json({ success: errors.length > 0, message: `${updates.length} updates, ${errors.length} errors` });
})

router.get('/', (req, res) => {
	Profile.find({}, (err, docs) => {
		console.log(docs);
		return err ? res.json({ success: false, error: err }) : res.send(docs)
	})
});

module.exports = router;