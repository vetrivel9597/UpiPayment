import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const PopupModal = ({ show, onClose, title, message }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title || 'Notification'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message || 'No message provided.'}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PopupModal;
