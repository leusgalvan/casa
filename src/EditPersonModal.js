import React, { Component } from "react";
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';

class EditPersonModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      person: props.person
    }
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event) {
    this.setState({ person: { ...this.state.person, name: event.target.value} });
  }

  render() {
    return(
      <Modal show={this.props.show} onHide={this.props.onClose} className='modal-edit'>
        <Modal.Header closeButton>
          <Modal.Title className='modal-title'>{this.props.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body className='modal-body'>
          <form onSubmit={(e) => this.props.onSave(this.state.person, e)}>
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
            <button type="submit" className="btn btn-primary btn-save">Guardar</button>
          </form>
        </Modal.Body>
      </Modal>
    );
  }
}

EditPersonModal.defaultProps = {
  person: {name: ''}
}

EditPersonModal.propTypes = {
  person: PropTypes.object
}

export default EditPersonModal;
