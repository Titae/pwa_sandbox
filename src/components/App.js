import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPaperPlane, faImage } from '@fortawesome/free-solid-svg-icons'

import { AuthProvider } from '../contexts/AuthContext'
import Route from '../router/CustomRoute'
import SignUp from './SignUp'
import Login from './Login'
import ResetPassword from './ResetPassword'
import Profile from './Profile'
import Rooms from './Rooms'
import ChatRoom from './ChatRoom'

library.add([faPaperPlane, faImage])

function App() {
	return (
		<AuthProvider>
			<Container className="d-flex align-items-center justify-content-center p-0" style={{ minHeight: '100vh', minWidth: '100vw', maxHeight: '100vh', maxWidth: '100vw'}}>
        <Router>
          <Switch>
            <Route pub path='/signup' component={SignUp}/>
            <Route pub path='/login' component={Login}/>
            <Route pub path='/reset-password' component={ResetPassword}/>
            <Route exact path="/profile" component={Profile}/>
            <Route exact path="/room/:roomId" component={ChatRoom}/>
            <Route path="/" component={Rooms}/>
          </Switch>
        </Router>
			</Container>
		</AuthProvider>
	);
}
	
export default App;
