import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import PersonService from './PersonService';
import './PersonCRUD.css';
import FormTable from './components/FormTable';
import AddPersonModal from './AddPersonModal';
import Button from 'react-bootstrap/Button';

class PersonCRUD extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adding: false,
      personData: []
    };
    this.personService = new PersonService();
    this.handleAdd = this.handleAdd.bind(this);
    this.handleAddPersonModalClose = this.handleAddPersonModalClose.bind(this);
    this.handleAddPersonModalSave = this.handleAddPersonModalSave.bind(this);
  }

  handleAdd() {
    this.setState({adding: true});
  }

  handleAddPersonModalClose() {
    this.setState({adding: false});
  }

  handleAddPersonModalSave(newPersonData) {
    const _this = this
    _this.personService.create(newPersonData)
      .then(function(response){
        console.log('Person created successfully')
        _this.setState({
          personData: [..._this.state.personData, Object.values(newPersonData)],
          adding: false
        });
      }).catch(function(error){
        console.log('Error creating person: ' + error);
      });
  }

  render() {
    const addPersonModal =
      <AddPersonModal
        show={true}
        onClose={this.handleAddPersonModalClose}
        onSave={this.handleAddPersonModalSave}
      />

    return (
      <div className="container">
        <FormTable columns={['Nombre']}
                   data={this.state.personData}
        />
        <Button onClick={this.handleAdd}>Agregar</Button>
        {this.state.adding && addPersonModal}
      </div>
    )
  }
}

export default PersonCRUD;
