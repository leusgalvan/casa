import React, { Component } from "react";
import Modal from 'react-bootstrap/Modal';

class AddPersonModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      person: {
        name: ''
      }
    }
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event) {
    this.setState({ person: { ...this.state.person, name: event.target.value} });
  }

  render() {
    return(
      <Modal show={this.props.show} onHide={this.props.onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crear persona</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={() => this.props.onSave(this.state.person)}>
            <div className="form-group row">
              <label htmlFor="name" className="col-sm-2 col-form-label">Nombre</label>
              <div className="col-sm">
                <input value={this.state.person.name}
                       onChange={this.handleNameChange}
                       type="text"
                       className="form-control"
                       id="name"
                       placeholder="Juanita Viale" />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Guardar</button>
          </form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default AddPersonModal;
