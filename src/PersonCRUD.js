import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import PersonService from './PersonService';
import './PersonCRUD.css';
import FormTable from './components/FormTable';
import AddPersonModal from './AddPersonModal';
import DeleteModal from './DeleteModal';
import Button from 'react-bootstrap/Button';

class PersonCRUD extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adding: false,
      deleting: false,
      personData: [],
      selectedRows: []
    };
    this.personService = new PersonService();
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handlePersonModalClose = this.handlePersonModalClose.bind(this);
    this.handlePersonModalSave = this.handlePersonModalSave.bind(this);
    this.handleDeletePersonModalAccept = this.handleDeletePersonModalAccept.bind(this);
    this.handleDeletePersonModalClose = this.handleDeletePersonModalClose.bind(this);
    this.handleRowClicked = this.handleRowClicked.bind(this);
  }

  componentDidMount() {
    const _this = this
    _this.personService.list()
      .then(function(response) {
        _this.setState({personData: response});
      }).catch(function(error) {
        console.log('Error fetching person data: ' + error);
      });
  }

  handleDelete() {
    this.setState({deleting: true});
  }

  handleAdd() {
    this.setState({adding: true});
  }

  handlePersonModalClose() {
    this.setState({adding: false});
  }

  handlePersonModalSave(personData) {
    const _this = this
    _this.personService.create(personData)
      .then(function(newPersonData){
        console.log('Person created successfully')
        _this.setState(prevState => {
          return {personData: [...prevState.personData, newPersonData],
                  adding: false};
        });
      }).catch(function(error){
        console.log('Error creating person: ' + error);
      });
  }

  handleRowClicked(index) {
    var _selectedRows = this.state.selectedRows;
    if(_selectedRows.includes(index)){
      _selectedRows = _selectedRows.filter(i => i !== index);
    } else {
      _selectedRows = _selectedRows.concat([index]);
    }
    this.setState({selectedRows: _selectedRows});
  }

  handleDeletePersonModalAccept() {
    const _this = this;
    const ids = _this.state.selectedRows.map(i => _this.state.personData[i][0]);
    const promises = ids.map(id => {
      return _this.personService.delete(id)
        .then(function(response) {
          return id;
        }).catch(function(error){
          console.log('Error al eliminar persona con id ' + id + ': ' + error);
        });
    });
    Promise.all(promises)
      .then(idsDeleted => {
        _this.setState(prevState => {
          const newDataRows = prevState.personData.filter(person => !idsDeleted.includes(person[0]));
          return {deleting: false, personData: newDataRows, selectedRows: []};
        });
      });
  }

  handleDeletePersonModalClose() {
    this.setState({deleting: false});
  }

  render() {
    const addPersonModal =
      <AddPersonModal
        show={true}
        onClose={this.handlePersonModalClose}
        onSave={this.handlePersonModalSave}
      />

    const deletePersonModal =
      <DeleteModal
        show={true}
        onClose={this.handleDeletePersonModalClose}
        onAccept={this.handleDeletePersonModalAccept}
        title="Eliminar personas"
      />

    return (
      <div className="container">
        <FormTable columns={['ID', 'Nombre']}
                   data={this.state.personData}
                   selectedRows={this.state.selectedRows}
                   onRowClicked={this.handleRowClicked}
        />
        <Button className='mr-3' onClick={this.handleAdd}>Agregar</Button>
        <Button onClick={this.handleDelete} disabled={!this.state.selectedRows.length} variant="secondary">Eliminar</Button>
        {this.state.adding && addPersonModal}
        {this.state.deleting && deletePersonModal}
      </div>
    )
  }
}

export default PersonCRUD;
