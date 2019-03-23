import React from "react";
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const EditPersonModal = ({show, onClose, title, onSave, person}) => {
  let inputName
  const buildPerson = () => {
    const newPerson = person.id ? {id: person.id} : {}
    newPerson.name = inputName.value.trim()
    return newPerson
  }
  return(
    <Modal show={show} onHide={onClose} className='edit-modal'>
      <Modal.Header closeButton>
        <Modal.Title className='edit-modal-title'>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body className='edit-modal-body'>
        <Form onSubmit={(e) => onSave(buildPerson(), e)}>
          <Form.Group controlId="name" as={Form.Row}>
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" placeholder="Juanita Viale" defaultValue={person.name} ref={node => (inputName = node)}/>
          </Form.Group>
          <Button variant="primary"
                  type="submit"
                  className="edit-modal-btn-save mr-3">Guardar</Button>
          <Button variant="secondary"
                  type="button"
                  className="edit-modal-btn-cancel"
                  onClick={onClose}>Cancelar</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

EditPersonModal.defaultProps = {
  person: {name: ''}
}

EditPersonModal.propTypes = {
  person: PropTypes.object,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired
}

export default EditPersonModal;
