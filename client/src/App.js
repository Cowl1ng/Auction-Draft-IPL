import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

// Importing context
import AuthState from './context/auth/AuthState'
import AlertState from './context/alert/AlertState'
import PlayerState from './context/player/PlayerState'
import PauseState from './context/pause/PauseState'

import Navbar from './components/Navbar'
// Importing page components
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Admin from './components/admin/Admin'
import Drafting from './components/Drafting'
import PrivateRoute from './components/routing/PrivateRoute'

function App() {
  return (
    <div className='App'>
      <AlertState>
        <AuthState>
          <PauseState>
            <PlayerState>
              <Router>
                <Navbar />
                <div>
                  <Switch>
                    <PrivateRoute exact path='/' component={Drafting} />
                    <PrivateRoute exact path='/admin' component={Admin} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/login' component={Login} />
                  </Switch>
                </div>
              </Router>
            </PlayerState>
          </PauseState>
        </AuthState>
      </AlertState>
    </div>
  )
}

export default App
