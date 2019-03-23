import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const DeleteModal = ({show, onClose, onAccept, title}) => {
  return(
    <Modal show={show} onHide={onClose} className='delete-modal'>
      <Modal.Header closeButton>
        <Modal.Title className='delete-modal-title'>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body className='delete-modal-body'>
        <p>¿Desea eliminar los elementos seleccionados?</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={(e) => onAccept(e)} className='delete-modal-btn-delete'>Eliminar</Button>
        <Button variant="secondary" onClick={onClose} className='delete-modal-btn-cancel'>Cancelar</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteModal;
