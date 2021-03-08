import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Switch } from 'react-router-dom'

import { AuthProvider } from '../contexts/AuthContext'
import Route from '../router/CustomRoute'
import SignUp from './SignUp'
import Login from './Login'
import ResetPassword from './ResetPassword'
import Profile from './Profile'


function App() {
	return (
		<AuthProvider>
			<Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh'}}>
				<div className="w-100" style={{ maxWidth: "400px" }}>
					<Router>
						<Switch>
							<Route pub path='/signup' component={SignUp}/>
							<Route pub path='/login' component={Login}/>
							<Route pub path='/reset-password' component={ResetPassword}/>
							<Route exact path="/" component={Profile}/>
						</Switch>
					</Router>
				</div>
			</Container>
		</AuthProvider>
	);
}
	
export default App;
