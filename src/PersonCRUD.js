import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import PersonService from './PersonService';
import './PersonCRUD.css';
import FormTable from './components/FormTable';
import EditPersonModal from './EditPersonModal';
import DeleteModal from './DeleteModal';
import Button from 'react-bootstrap/Button';

class PersonCRUD extends Component {
  constructor(props) {
    super(props);
    console.log('Creating PersonCRUD component')
    this.state = {
      adding: false,
      deleting: false,
      updating: false,
      personData: [],
      selectedRows: []
    };
    this.personService = new PersonService();
    this.enterDeletingMode = this.enterDeletingMode.bind(this);
    this.enterAddingMode = this.enterAddingMode.bind(this);
    this.enterUpdatingMode = this.enterUpdatingMode.bind(this);
    this.exitAddingMode = this.exitAddingMode.bind(this);
    this.createPerson = this.createPerson.bind(this);
    this.deletePerson = this.deletePerson.bind(this);
    this.exitDeletingMode = this.exitDeletingMode.bind(this);
    this.updatePerson = this.updatePerson.bind(this);
    this.exitUpdatingMode = this.exitUpdatingMode.bind(this);
    this.toggleRowSelection = this.toggleRowSelection.bind(this);
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

  enterUpdatingMode() {
    this.setState({updating: true});
  }

  enterDeletingMode() {
    this.setState({deleting: true});
  }

  enterAddingMode() {
    this.setState({adding: true});
  }

  exitAddingMode() {
    this.setState({adding: false});
  }

  createPerson(personData, e) {
    e.preventDefault()
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
        _this.setState({adding: false});
      });
  }

  toggleRowSelection(index) {
    var _selectedRows = this.state.selectedRows;
    if(_selectedRows.includes(index)){
      _selectedRows = _selectedRows.filter(i => i !== index);
    } else {
      _selectedRows = _selectedRows.concat([index]);
    }
    this.setState({selectedRows: _selectedRows});
  }

  deletePerson(e) {
    e.preventDefault()
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

  exitDeletingMode() {
    this.setState({deleting: false});
  }

  exitUpdatingMode() {
    this.setState({updating: false});
  }

  updatePerson(personData, e) {
    e.preventDefault()
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
      <EditPersonModal
        show={true}
        onClose={this.exitAddingMode}
        onSave={this.createPerson}
        title="Crear persona"
      />

    const deletePersonModal =
      <DeleteModal
        show={true}
        onClose={this.exitDeletingMode}
        onAccept={this.deletePerson}
        title="Eliminar personas"
      />

    const updatePersonModal =
      <EditPersonModal
        show={true}
        onClose={this.exitUpdatingMode}
        onSave={this.updatePerson}
        person={this.state.personData[this.state.selectedRows[0]]}
        title="Editar persona"
      />

    return (
      <div className="container">

        <FormTable columns={['ID', 'Nombre']}
                   data={this.arrayOfPeopleAsTableData(this.state.personData)}
                   selectedRows={this.state.selectedRows}
                   onRowClicked={this.toggleRowSelection}
        />

        <Button className='mr-3 btn-add'
                onClick={this.enterAddingMode}>Agregar</Button>

        <Button className='mr-3 btn-edit'
                onClick={this.enterUpdatingMode}
                disabled={this.state.selectedRows.length !== 1}
                variant="info">Editar</Button>

        <Button className='btn-delete'
                onClick={this.enterDeletingMode}
                disabled={!this.state.selectedRows.length}
                variant="secondary">Eliminar</Button>

        {this.state.adding && addPersonModal}
        {this.state.deleting && deletePersonModal}
        {this.state.updating && updatePersonModal}
      </div>
    )
  }
}

export default PersonCRUD;
