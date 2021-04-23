import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPaperPlane, faImage, faPlus } from '@fortawesome/free-solid-svg-icons'

import { AuthProvider } from '../contexts/AuthContext'
import Route from '../router/CustomRoute'
import SignUp from './SignUp'
import Login from './Login'
import ResetPassword from './ResetPassword'
import Profile from './Profile'
import Rooms from './Rooms'
import ChatRoom from './ChatRoom'
import Header from './Header'

library.add([faPaperPlane, faImage, faPlus])

function App() {
	return (
		<AuthProvider>
        <Router>
          <Header/>
          <Switch>
            <Route pub path='/signup' component={SignUp}/>
            <Route pub path='/login' component={Login}/>
            <Route pub path='/reset-password' component={ResetPassword}/>
            <Route exact path="/profile" component={Profile}/>
            <Route exact path="/room/:roomId" component={ChatRoom}/>
            <Route path="/" component={Rooms}/>
          </Switch>
        </Router>
		</AuthProvider>
	);
}
	
export default App;
