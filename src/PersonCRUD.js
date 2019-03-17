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
      personData: [],
      selectedRows: []
    };
    this.personService = new PersonService();
    this.handleAdd = this.handleAdd.bind(this);
    this.handlePersonModalClose = this.handlePersonModalClose.bind(this);
    this.handlePersonModalSave = this.handlePersonModalSave.bind(this);
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

  handleAdd() {
    this.setState({adding: true});
  }

  handlePersonModalClose() {
    this.setState({adding: false});
  }

  handlePersonModalSave(newPersonData) {
    const _this = this
    _this.personService.create(newPersonData)
      .then(function(response){
        console.log('Person created successfully')
        _this.setState({
          personData: [..._this.state.personData, response],
          adding: false
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

  render() {
    const addPersonModal =
      <AddPersonModal
        show={true}
        onClose={this.handlePersonModalClose}
        onSave={this.handlePersonModalSave}
      />

    return (
      <div className="container">
        <FormTable columns={['ID', 'Nombre']}
                   data={this.state.personData}
                   selectedRows={this.state.selectedRows}
                   onRowClicked={this.handleRowClicked}
        />
        <Button onClick={this.handleAdd}>Agregar</Button>
        {this.state.adding && addPersonModal}
      </div>
    )
  }
}

export default PersonCRUD;
