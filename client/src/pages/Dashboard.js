import React, { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import randomizeScript from '../RandomizeScript'

function Dashboard() {
	const [id, setId] = useState('')
	const [tempId, setTempId] = useState('')
	const [thisUrl, setUrl] = useState('')
	
	async function populateId() {
		const req = await fetch('http://localhost:1337/api/id', {
			headers: {
				'x-access-token': localStorage.getItem('token'),
			},
		})

		const data = await req.json()
		if (data.status === 'ok') {
			setId(data.id)
			if (data.id) {
				setUrl(await randomizeScript(data.id))
			}
		} else {
			alert(data.error)
		}
	}

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			const user = jwt_decode(token)
			console.log('user: ' + user)
			if (!user) {
				localStorage.removeItem('token')
				//navigate('/login', {replace: true})
			} else {
				populateId()
			}
		}
	}, [])

	async function updateId(event) {
		event.preventDefault()

		let url = await randomizeScript(tempId)
		if (url === undefined) {
			alert('Please enter valid playlist URL(s)')
			return
		} else {
			setUrl(url)
		}

		const req = await fetch('http://localhost:1337/api/id', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-access-token': localStorage.getItem('token'),
			},
			body: JSON.stringify({
				id: tempId,
			}),
		})

		const data = await req.json()
		if (data.status === 'ok') {
			setId(tempId)
			setTempId('')
		} else {
			alert(data.error)
		}
	}
	
	return (
		<div class="container">
			<label htmlFor="basic-url" className="form-label">Enter your youtube playlist ID (or a comma-separated list of playlist IDs) here:</label>
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon3"> www.youtube.com/playlist?list=</span>
                <input 
					type="text" 
					className="form-control" 
					id="basic-url" 
					value={tempId} 
					onChange={(e) => setTempId(e.target.value)} 
					aria-describedby="basic-addon3" />
                <button id="enter-button" type="button" onClick={updateId}>Enter</button>
            </div>
			<div>
			{
				thisUrl !== '' ? 
				<iframe
				title='My Playlist'
                id="player3" 
                type="text/html" 
                width="640" 
                height="390"
                src= {`http://www.youtube.com/embed/scWj1BMRHUA?enablejsapi=1&playlist=${thisUrl}`}
                frameBorder="0"
				/> 
				:
				<text></text>
			}
			</div>
		</div>
	)
}

export default Dashboard