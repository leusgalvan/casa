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
      updating: false,
      personData: [],
      selectedRows: []
    };
    this.personService = new PersonService();
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handlePersonModalClose = this.handlePersonModalClose.bind(this);
    this.handlePersonModalSave = this.handlePersonModalSave.bind(this);
    this.handleDeletePersonModalAccept = this.handleDeletePersonModalAccept.bind(this);
    this.handleDeletePersonModalClose = this.handleDeletePersonModalClose.bind(this);
    this.handleUpdatePersonModalSave = this.handleUpdatePersonModalSave.bind(this);
    this.handleUpdatePersonModalClose = this.handleUpdatePersonModalClose.bind(this);
    this.handleRowClicked = this.handleRowClicked.bind(this);
  }

  componentDidMount() {
    const _this = this
    _this.personService.list()
      .then(function(arrayOfPeople) {
        console.log('Fetched array of people successfully');
        _this.setState({personData: arrayOfPeople});
      }).catch(function(error) {
        console.log('Error fetching person data: ' + error);
      });
  }

  handleUpdate() {
    this.setState({updating: true});
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
        console.log('Person created successfully');
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
    const ids = _this.state.selectedRows.map(i => _this.state.personData[i].id);
    const promises = ids.map(id => {
      return _this.personService.delete(id)
        .then(function(response) {
          console.log('Person deleted successfully');
          return id;
        }).catch(function(error){
          console.log('Error al eliminar persona con id ' + id + ': ' + error);
        });
    });
    Promise.all(promises)
      .then(idsDeleted => {
        _this.setState(prevState => {
          const newDataRows = prevState.personData.filter(person => !idsDeleted.includes(person.id));
          return {deleting: false, personData: newDataRows, selectedRows: []};
        });
      });
  }

  handleDeletePersonModalClose() {
    this.setState({deleting: false});
  }

  handleUpdatePersonModalClose() {
    this.setState({updating: false});
  }

  handleUpdatePersonModalSave(personData) {
    const _this = this
    _this.personService.update(personData)
      .then(function(){
        console.log('Person updated successfully')
        _this.setState(prevState => {
          const newPersonData = prevState.personData.map(p => {
            if(p.id !== personData.id) return p;
            else return personData;
          });
          return {personData: newPersonData, updating: false};
        });
      }).catch(function(error){
        console.log('Error updating person: ' + error);
      });
  }

  arrayOfPeopleAsTableData(arrayOfPeople) {
    return arrayOfPeople.map(obj => Object.values(obj));
  }

  render() {
    const addPersonModal =
      <AddPersonModal
        show={true}
        onClose={this.handlePersonModalClose}
        onSave={this.handlePersonModalSave}
        title="Crear persona"
      />

    const deletePersonModal =
      <DeleteModal
        show={true}
        onClose={this.handleDeletePersonModalClose}
        onAccept={this.handleDeletePersonModalAccept}
        title="Eliminar personas"
      />

    const updatePersonModal =
      <AddPersonModal
        show={true}
        onClose={this.handleUpdatePersonModalClose}
        onSave={this.handleUpdatePersonModalSave}
        person={this.state.personData[this.state.selectedRows[0]]}
        title="Editar persona"
      />

    return (
      <div className="container">
        <FormTable columns={['ID', 'Nombre']}
                   data={this.arrayOfPeopleAsTableData(this.state.personData)}
                   selectedRows={this.state.selectedRows}
                   onRowClicked={this.handleRowClicked}
        />
        <Button className='mr-3' onClick={this.handleAdd}>Agregar</Button>
        <Button className='mr-3' onClick={this.handleUpdate} disabled={this.state.selectedRows.length !== 1} variant="info">Editar</Button>
        <Button onClick={this.handleDelete} disabled={!this.state.selectedRows.length} variant="secondary">Eliminar</Button>
        {this.state.adding && addPersonModal}
        {this.state.deleting && deletePersonModal}
        {this.state.updating && updatePersonModal}
      </div>
    )
  }
}

export default PersonCRUD;
