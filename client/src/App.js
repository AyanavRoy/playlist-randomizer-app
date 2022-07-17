import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import './App.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function App() {
	return(
		<div>
			<Navbar class="bg transparent" expand="lg">
				<Container>
					<Navbar.Brand href="/">
					YouTube Playlist Randomizer
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							<Nav.Link href="/">Register</Nav.Link>
							<Nav.Link href="/login">Login</Nav.Link>
							<Nav.Link href="/dashboard">Randomize!</Nav.Link>
						</Nav>
						<Nav>
							{localStorage.getItem('email') !== undefined ?
							<Nav.Link >Logged in as {localStorage.getItem('email')}</Nav.Link> :
							<Nav.Link></Nav.Link>
							}
          				</Nav>
						</Navbar.Collapse>
				</Container>
    		</Navbar>

			<BrowserRouter>
				<Routes>
					<Route path="/login" exact element={ <Login /> } />
        			<Route path="/" exact element={ <Register /> } />
					<Route path="/dashboard" exact element={ <Dashboard /> } />
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App