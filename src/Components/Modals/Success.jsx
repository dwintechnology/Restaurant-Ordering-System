import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

class Success extends Component {

    closeSuccessModal() {
        this.props.closeModal();
    }

    render() {
        return (
            <Modal show={this.props.showModal} onHide={this.props.closeModal} className="successShowModal">
                <Modal.Body className="successShowBody">
                    <p>{this.props.modalMessage}</p>
                    <Button onClick={() => this.closeErrorModal(this)}>OK</Button>
                </Modal.Body>
            </Modal>
        );
    }
}

export default Success