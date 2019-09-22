const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const profileRouter = require('./profile.router.js');
require('./db');

const PORT = process.env.PORT || 5000;

/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json()); // needed for axios requests
app.use(express.static('build'));


/** ---------- EXPRESS ROUTES ---------- **/
app.use('/api/profiles', profileRouter);

/** ---------- START SERVER ---------- **/
app.listen(PORT,  () => {
		console.log(`Listening on port ${PORT}.`);
});