import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import closeIcon from '../../assets/Images/delete-item-icon.svg';

import '../../assets/styles/AdvancedCashModal.css';

class CVCModal extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            show: true,
            cvcNumber: "",
            isCVCConfirmation: true
        };
    }

    handleClose = () => {
        // this.props.closeModal();
        this.setState({ show: false });
    };

    handleShow = () => {
        this.setState({ show: true });
    };

    render() {
        return (
            <Modal className="advanced-cash-dialog" show={this.state.show} onHide={this.handleClose}>
                <Modal.Body>
                    <div className="modal-custom-header" onClick={this.handleClose}>
                        <img src={closeIcon} alt="close_img" />
                    </div>
                    <div className="modal-custom-body">
                        <b className="advanced-card-modal-lebel">Potvrdi vašu plaćanje</b>
                        <input
                            className="advanced-card-input advnaced-card-cvc-input"
                            keyboardtype={'numeric'}
                            type="number"
                            placeholder="cvv/cvc kód"
                            onChange={e => {
                                if(e.target.value <= 999) {
                                    this.setState({ cvcNumber: e.target.value });
                                }
                            }}
                            value={this.state.cvcNumber} />
                        <button className="nastavi-placanje" onClick={this.props.onClose(this.state.cvcNumber)}>NASTAVI PLACANJE</button>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }

    numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
}

export default withRouter(CVCModal);
