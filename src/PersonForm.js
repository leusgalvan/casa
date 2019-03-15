import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import PersonService from './PersonService';
import './PersonForm.css';
import FormTable from './components/FormTable';
import Button from 'react-bootstrap/Button';

class PersonForm extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '' }
    this.handleSave = this.handleSave.bind(this);
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

  render() {
    return (
      <div className="container">
        <FormTable columnNames={['Nombre', 'Edad']}
                   data={[['Leus', 15], ['Masi', 16]]}
        />
        <Button>Agregar</Button>
      </div>
    )
  }
}

export default PersonForm;
//<Table header={['Nombre', 'Edad']} ></Table>
// <div className="card">
//   <div className="card-header">
//     <h5 className="mb-0">Person</h5>
//   </div>
//   <div className="card-body">
//     <form onSubmit={this.handleSave}>
//       <div className="form-group row">
//         <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
//         <div className="col-sm-10">
//           <input value={this.state.name}
//                  onChange={this.handleNameChange}
//                  type="text"
//                  className="form-control"
//                  id="name"
//                  placeholder="Juanita Viale" />
//         </div>
//       </div>
//       <div className="row">
//         <div className="col-sm-10 offset-sm-2">
//           <button type="submit" className="btn btn-primary">Save</button>
//         </div>
//       </div>
//     </form>
//   </div>
// </div>
// </div>
//);
