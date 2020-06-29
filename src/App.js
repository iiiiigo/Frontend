import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  MainPage,
  EmployeeCreate,
  EmployeeUpdate,
  VideoList,
  ForwardNeck,
  Finish
} from "./pages";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/create" component={EmployeeCreate} />
        <Route path="/update" component={EmployeeUpdate} />
        <Route path="/videoList" component={VideoList} />
        <Route path="/forwardNeck" component={ForwardNeck} />
        <Route path="/finish" component={Finish} />
      </Switch>
    </Router>
  );
}

export default App;
