import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import ReactDOM from 'react-dom'
import About from '../pages/about/index.js'
import Form from '../pages/official/09-form.js'
import LiftingState from '../pages/official/10-LiftingState.js'
import CompositionInheritance from '../pages/official/11-composition-inheritance.js'

function RouterMap() {
  return (
    <Router>
      <div>
        <nav className={ 'nav' }>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/topics">Topics</Link>
          <Link to={ '/form'}>Form</Link>
          <Link to={ '/lifting-state'}>LiftingState</Link>
          <Link to={ '/composition-inheritance'}>组合</Link>
        </nav>

        <hr />

        <Route exact path="/" component={Home} />
        <Route path="/about" component={ About } />
        <Route path="/topics" component={Topics} />
        <Route path={'/form'} component={Form} />
        <Route path={'/lifting-state'} component={ LiftingState } />
        <Route path={'/composition-inheritance'} component={ CompositionInheritance } />
      </div>
    </Router>

  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function Topics({ match }) {
  return (
    <div>
      <h2>Topics</h2>
      <ul>
        <li>
          <Link to={`${match.url}/rendering`}>Rendering with React</Link>
        </li>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>

      <Route path={`${match.path}/:topicId`} component={Topic} />
      <Route
        exact
        path={match.path}
        render={() => <h3>Please select a topic.</h3>}
      />
    </div>
  );
}

function Topic({ match }) {
  return (
    <div>
      <h3>{match.params.topicId}</h3>
    </div>
  );
}

export default RouterMap;
