const express = require('express')
const app = express()
const cors = require('cors')
const axios = require('axios').default;
const mongoose = require('mongoose')
const User = require('./model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const KEY = 'AIzaSyAZBTgMteIc0l5FULwMWD6nwerjyrnXjYY'

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/login-mern-app')

app.post('/api/register', async (req, res) => {
	try {
		const newPassword = await bcrypt.hash(req.body.password, 10)
		await User.create({
			email: req.body.email,
			password: newPassword,
		})
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error', error: 'Duplicate email' })
	}
})

app.post('/api/login', async (req, res) => {
	const user = await User.findOne({
		email: req.body.email,
	})

	if (!user) {
		return res.json({ status: 'error', error: 'Invalid username' })
	}

	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	)

	if (isPasswordValid) {
		const token = jwt.sign(
			{
				email: user.email,
			},
			'secret123'
		)

		return res.json({ status: 'ok', user: token , email: req.body.email })
	} else {
		return res.json({ status: 'error', user: false })
	}
})

app.get('/api/id', async (req, res) => {
	const token = req.headers['x-access-token']

	try {
		const decoded = jwt.verify(token, 'secret123')
		const email = decoded.email
		const user = await User.findOne({ email: email })

		return res.json({ status: 'ok', id: user.id })
	} catch (error) {
		res.json({ status: 'error', error: 'invalid token' })
	}
})

app.post('/api/id', async (req, res) => {
	const token = req.headers['x-access-token']

	try {
		const decoded = jwt.verify(token, 'secret123')
		const email = decoded.email
		await User.updateOne(
			{ email: email },
			{ $set: { id: req.body.id } }
		)

		return res.json({ status: 'ok' })
	} catch (error) {
		res.json({ status: 'error', error: 'invalid token' })
	}
})

app.get('/api/youtube/:link', async (req, res) => {
	try {
		const result = await getVideoIDs(req.params.link);
		res.json(result);
	} catch (err) {
		res.sendStatus(404);
	}
});
  
async function getVideoIDs(inputPlaylist) {
	let httpReq = `https://www.googleapis.com/youtube/v3/playlistItems`;
	httpReq += '?part=snippet';
	httpReq += '&maxResults=50';
	httpReq += ('&playlistId=' + inputPlaylist);
	httpReq += ('&key=' + KEY);
	
	let result = await axios.get(httpReq);
	let data = await result.data;
	
	const idList = [];
	for (const element of data.items) {
	idList.push(element.snippet.resourceId.videoId);
	}
	
	while (typeof data.nextPageToken !== 'undefined') {
		httpReq += ('&pageToken=' + data.nextPageToken);

		result = await axios.get(httpReq);
		data = await result.data;
		for (const element of data.items) {
			idList.push(element.snippet.resourceId.videoId);
		}
	}
	
	return idList;
}

app.listen(1337, () => {
	console.log('Server started on 1337')
})