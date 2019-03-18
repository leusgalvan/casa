import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const DeleteModal = ({show, onClose, onAccept, title}) => {
  return(
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>¿Desea eliminar los elementos seleccionados?</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={onAccept}>Eliminar</Button>
        <Button variant="secondary" onClick={onClose}>Cancelar</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteModal;
