import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import PersonService from './PersonService';

class PersonForm extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '' }
    this.handleSave = this.handleSave.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.personService = new PersonService();
  }

  handleSave(event) {
    console.log('state: ' + this.state.name);
    this.personService.create({ name: this.state.name })
      .then(res => {
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
      <div>
        <h1>Person</h1>
        <form onSubmit={this.handleSave}>
          <div className="form-group row">
            <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
            <div className="col-sm">
              <input value={this.state.name}
                     onChange={this.handleNameChange}
                     type="text"
                     className="form-control"
                     id="name"
                     placeholder="Juanita Viale" />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Save</button>
        </form>
      </div>
    );
  }
}

export default PersonForm;
