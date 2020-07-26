import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Login from './pages/login'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Login}/>
        <Route exact path='/dashboard/:user' component={Dashboard} />
      </Switch>
    </Router>
  );
}

export default App;
