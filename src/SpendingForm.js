import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import PersonService from './PersonService';
import './PersonForm.css';

class SpendingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payer: undefined,
      date: undefined,
      peopleToDivide: undefined,
      amount: undefined
    }
    this.handleSave = this.handleSave.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.spendingService = new SpendingService();
    this.personService = new PersonService();
  }

  handleSave(event) {
    console.log('state: ' + this.state.name);
    this.spendingService.create({
      payer: 

    }).then(res => {
      console.log(res);
    });
    event.preventDefault();
  }

  handleNameChange(event) {
    console.log('value: ' + event.target.value);
    this.setState({ name: event.target.value });
  }

  render() {
    return (
      <div className="container">
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">Person</h5>
          </div>
          <div className="card-body">
            <form onSubmit={this.handleSave}>
              <div className="form-group row">
                <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                <div className="col-sm-10">
                  <input value={this.state.name}
                         onChange={this.handleNameChange}
                         type="text"
                         className="form-control"
                         id="name"
                         placeholder="Juanita Viale" />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-10 offset-sm-2">
                  <button type="submit" className="btn btn-primary">Save</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default PersonForm;
