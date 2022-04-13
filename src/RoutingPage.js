import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./components/Auth";

import Dashboard from "./components/Dashboard";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import Loading from "./Loading/Loading";
import Nav from "./Navber/Nav";
import Managemember from "./Managemember/Managemember";
import ManagememberAddUser from "./Managemember/ManagememberAddUser";
import Managememberrating from "./Managememberrating/Managememberrating";
import ManagememberEasy from "./Managememberrating/ManagememberEasy";
import ManagememberModerate from "./Managememberrating/ManagememberModerate";
import MemberReport from "./Report/MemberReport";
import ChartWeekly from "./Report/ChartWeekly";
import ChartMonth from "./Report/ChartMonth";
import Feedback from "./Report/Feedback";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={LogIn}></Route>
          <Route exact path="/dashboard" component={Dashboard}></Route>//check status login
          <Route exact path="/nav" component={Nav}></Route>
          <Route exact path="/signup" component={SignUp}></Route>
          <Route exact path="/loading" component={Loading}></Route>
          <Route exact path="/managemember" component={Managemember}></Route>
          <Route exact path="/managememberadduser" component={ManagememberAddUser}></Route>
          <Route exact path="/managememberrating" component={Managememberrating}></Route>
          <Route exact path="/managememberEasy" component={ManagememberEasy}></Route>
          <Route exact path="/managememberModerate" component={ManagememberModerate}></Route>
          <Route exact path="/memberreport" component={MemberReport}></Route>
          <Route exact path="/chartweekly" component={ChartWeekly}></Route>
          <Route exact path="/chartmonth" component={ChartMonth}></Route>
          <Route exact path="/feedback" component={Feedback}></Route>
         
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
