import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';

import { setOrderType } from '../../actions/deliveryOptions';

import deliveryImage from '../../assets/Images/bck-img-1@2x.png';
import closeIcon from '../../assets/Images/delete-item-icon.svg';
import '../../assets/styles/Modals.css';

class InfoSectionModal extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            show: true,
        };
    }

    buyRestoranClick = () => {
        if (!this.props.onModalClose) {
            this.props.history.push('/restorans');
        }
        this.props.setOrderType('pick_up');
        this.setState({
            show: false,
        });
    };

    dastavaNaDon = () => {
        if (!this.props.onModalClose) {
            this.props.history.push('/');
        }
        this.props.setOrderType('delivery');
        this.setState({
            show: false,
        });
    };

    handleClose = () => {
        this.setState({ show: false });
        if (this.props.onModalClose) {
            this.props.onModalClose();
        }
    };

    handleShow = () => {
        this.setState({ show: true });
    };

    render() {
        return (
            <Modal backdrop="static" className="delivery-type-modal" show={this.state.show} onHide={this.handleClose}>
                <Modal.Body>
                    <div className="modal-custom-header" onClick={this.handleClose}>
                        <img src={closeIcon} alt="close_img" />
                    </div>
                    <img style={{ width: '100%' }} src={deliveryImage} alt="" />
                    <div className="modal-custom-body">
                        <p className="modal-custom-body-title">Načini isporuke</p>
                        <div className="delivery-buttons">
                            <button type="button" className="pokuppica-restoran" onClick={this.buyRestoranClick}>
                                POKUPIĆU U RESTORANU
                            </button>
                            <button type="button" className="dastava-adress" onClick={this.dastavaNaDon}>
                                DOSTAVA NA ADDRESU
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

export default withRouter(connect(null, {
    setOrderType
})(InfoSectionModal));