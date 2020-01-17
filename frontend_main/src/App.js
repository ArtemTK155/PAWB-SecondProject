import React from 'react';
import Dashboard from './Components/Dashboard/Dashboard';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


export default function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/dashboard" exact component={Dashboard}/>
        </Switch>
      </div>
    </Router>
  );
}