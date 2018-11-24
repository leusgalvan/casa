import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './Main.css';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Person from './Person';
import Spending from './Spending';
import Summary from './Summary';
import Home from './Home';

class Main extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
          <a className="navbar-brand" href="#">Casa</a>
        </nav>
        <HashRouter>
          <div className="row">
            <nav className="col-md-2 navbar-light bg-light sidebar">
              <ul className="nav flex-column">
                <li class="nav-link"><NavLink exact to="/">Home</NavLink></li>
                <li class="nav-link"><NavLink to="/person">Person</NavLink></li>
                <li class="nav-link"><NavLink to="/spending">Spending</NavLink></li>
                <li class="nav-link"><NavLink to="/summary">Summary</NavLink></li>
              </ul>
            </nav>
            <div className="content col-md">
              <Route exact path="/" component={Home}/>
              <Route path="/person" component={Person}/>
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
