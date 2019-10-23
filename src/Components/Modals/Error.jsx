import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

class Error extends Component {

    closeErrorModal() {
        this.props.closeModal();
    }

    render() {
        return (
            <Modal show={this.props.showModal} onHide={this.props.closeModal} className="errorShowModal">
                <Modal.Body className="errorShowBody">
                    <p>{this.props.modalMessage}</p>
                    <Button onClick={() => this.closeErrorModal(this)}>OK</Button>
                </Modal.Body>
            </Modal>
        );
    }
}

export default Error 