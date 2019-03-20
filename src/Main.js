import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './Main.css';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import PersonCRUD from './PersonCRUD';
import Spending from './Spending';
import Summary from './Summary';
import Home from './Home';

class Main extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm bg-primary navbar-dark">
          <a className="navbar-brand" href="/">Casa</a>
        </nav>
        <HashRouter>
          <div className="row">
            <nav className="col-sm-2 navbar-light bg-light sidebar">
              <ul className="nav nav-pills flex-column">
                <li className="nav-item">
                  <NavLink className="nav-link" exact to="/">Home</NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/person">Person</NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/spending">Spending</NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/summary">Summary</NavLink>
                </li>
              </ul>
            </nav>
            <div className="content col-md">
              <Route exact path="/" component={Home}/>
              <Route path="/person" component={PersonCRUD}/>
              <Route path="/spending" component={Spending}/>
              <Route path="/summary" component={Summary}/>
            </div>
          </div>
        </HashRouter>
      </div>
    );
  }
}

export default Main;
