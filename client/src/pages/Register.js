import { useState } from 'react'
//import { useNavigate } from 'react-router-dom'

function Register() {
	//const navigate = useNavigate()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	async function registerUser(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:1337/api/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password
			})
		})

		const data = await response.json()

		if (data.status === 'ok') {
			alert('Registration successful')
			window.location.href = '/login'
		} else {
			alert('User already registered')
		}
	}

	return (
		<div class="container">
			<h1>Register</h1>
			<form style={{width: 700, marginLeft: "auto", marginRight: "auto"}} onSubmit={registerUser}>
  				<div class="form-group">
    				<label for="exampleInputEmail1">Email address</label>
    				<input 
						type="email" 
						class="form-control" 
						id="exampleInputEmail1" 
						aria-describedby="emailHelp" 
						placeholder="Enter email" 
						onChange={(e) => setEmail(e.target.value)}
					/>
  				</div>
  				<div class="form-group">
    				<label for="exampleInputPassword1">Password</label>
    				<input 
						type="password" 
						class="form-control" 
						id="exampleInputPassword1" 
						placeholder="Enter password"
						onChange={(e) => setPassword(e.target.value)}
					/>
  				</div>
  				<button type="submit" class="btn btn-primary">Submit</button>
			</form>
		</div>
	)
}

export default Register