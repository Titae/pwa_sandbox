import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { AuthProvider } from '../contexts/AuthContext'
import SignUp from './SignUp'
import SignIn from './SignIn'


function App() {
	return (
		<Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh'}}>
			<div className="w-100" style={{ maxWidth: "400px" }}>
				<Router>
					<AuthProvider>
						<Switch>
							<Route path='/signup' component={SignUp}/>
							<Route path='/signin' component={SignIn}/>
						</Switch>
					</AuthProvider>
				</Router>
			</div>
		</Container>
	);
}
	
export default App;
