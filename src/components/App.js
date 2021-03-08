import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { AuthProvider } from '../contexts/AuthContext'
import PrivateRoute from '../router/PrivateRoute'
import SignUp from './SignUp'
import Login from './Login'
import Profile from './Profile'


function App() {
	return (
		<Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh'}}>
			<div className="w-100" style={{ maxWidth: "400px" }}>
				<Router>
					<AuthProvider>
						<Switch>
              <PrivateRoute exact path="/" component={Profile}/>
							<Route path='/signup' component={SignUp}/>
							<Route path='/login' component={Login}/>
						</Switch>
					</AuthProvider>
				</Router>
			</div>
		</Container>
	);
}
	
export default App;
