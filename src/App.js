import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MainPage, EmployeeCreate, EmployeeUpdate } from './pages'
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/create" component={EmployeeCreate} />
        <Route path="/update" component={EmployeeUpdate} />
      </Switch>
    </Router>
  );
}

export default App;
