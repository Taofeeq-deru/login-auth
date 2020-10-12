import React from "react";
import { Nav, Login, Signup, Home, Profile } from "./components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <>
      <div className="bg-dark">
        <Router>
          <Nav />
          <Switch>
            <Route path="/" exact component={() => <Home />} />
            <Route path="/login" exact component={() => <Login />} />
            <Route path="/signup" exact component={() => <Signup />} />
            <Route path="/profile" exact component={() => <Profile />} />
          </Switch>
        </Router>
      </div>
    </>
  );
}

export default App;
