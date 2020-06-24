import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { About } from './About'
import { Users } from '../pages/user/User'
import { Context } from '../pages/context/'

function Index() {
  return <h2>Home</h2>;
}

function AppRouter() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about/">About</Link>
            </li>
            <li>
              <Link to="/users/">Users</Link>
            </li>
            <li>
              <Link to="/context">Context</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={Index} />
        <Route path="/about/" component={About} />
        <Route path="/users/" component={Users} />
        <Route path="/context" component={Context} />
      </div>
    </Router>
  );
}

export default AppRouter;