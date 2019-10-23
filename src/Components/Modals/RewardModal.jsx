import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import firebase from 'firebase';

import { getRewards } from '../../actions/myRewards';
import { setRewardData } from '../../actions/deliveryOptions';

import giftIcon from '../../assets/Images/rsd-gift-icon.png';
import closeIcon from '../../assets/Images/close-modal-btn.svg';
import inputMinusIcon from '../../assets/Images/minus.svg';

import '../../assets/styles/RewardModal.css';

class RewardModal extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            show: true,
            advancedCash: '0,00',
            cashback: '0,00',
            orderPrice: `${this.props.orderPrice},00`,
            minusAdvanced: '0,00',
            minusCashback: '0,00'
        };
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            getRewards()
                .then(response => {
                    this.setState({
                        advancedCash: `${response.data.advanced_cash},00`,
                        cashback: `${response.data.cashback},00`,
                    })
                })
                .catch((error) => {
                    console.log(error);
                })
        });
    }

    onPrimeniClick = () => {
        this.setState({
            show: false,
        });
        const data = {};
        if (Number(this.state.minusAdvanced.split(',')[0])) {
            data.advanced_cash = this.state.minusAdvanced.split(',')[0];
        }
        if (Number(this.state.minusCashback.split(',')[0])) {
            data.cashback = this.state.minusCashback.split(',')[0];
        }
        (data.advanced_cash || data.cashback) && this.props.setRewardData('loyalty_program', data);
    };

    handleClose = () => {
        this.setState({ show: false });
        this.props.onHide();
    };

    handleShow = () => {
        this.setState({ show: true });
    };

    onMinusCashback = (e) => {
        let value = e.target.value;
        const cashBack = Number(this.state.cashback.split(',')[0].replace('.', ''));
        const orderPrice = Number(this.state.orderPrice.split(',')[0].replace('.', ''));
        const minusAdvanced = Number(this.state.minusAdvanced.split(',')[0].replace('.', ''));
        value = Number(value.replace('.', '').split(',')[0]);
        if (value <= cashBack && value + minusAdvanced <= orderPrice) {
            this.setState({ minusCashback: value });
        }
    };

    onMinusAdvancedCash = (e) => {
        let value = e.target.value;
        const advancedCash = Number(this.state.advancedCash.split(',')[0].replace('.', ''));
        const orderPrice = Number(this.state.orderPrice.split(',')[0].replace('.', ''));
        const minusCashback = Number(this.state.minusCashback.split(',')[0].replace('.', ''));
        value = Number(value.replace('.', '').split(',')[0]);
        if (value <= advancedCash && value + minusCashback <= orderPrice) {
            this.setState({ minusAdvanced: value });
        }
    };

    numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    inTotalAmount = () => {
        const orderPrice = Number(this.state.orderPrice.split(',')[0].replace('.', ''));
        const minusCashback = typeof this.state.minusCashback === 'string'
            ? Number(this.state.minusCashback.split(',')[0].replace('.', ''))
            : this.state.minusCashback;
        const minusAdvanced = typeof this.state.minusAdvanced === 'string'
            ? Number(this.state.minusAdvanced.split(',')[0].replace('.', ''))
            : this.state.minusAdvanced;
        return orderPrice - minusCashback - minusAdvanced;
    };

    render() {
        return (
            <Modal className="reward-modal" show={this.state.show} onHide={this.handleClose}>
                <Modal.Body>
                    <div className="modal-custom-header" onClick={this.handleClose}>
                        <img src={closeIcon} alt="close_img" />
                    </div>
                    <div className="modal-custom-body">
                        <img src={giftIcon} className="gift-icon" alt="gift_img" />
                        <p className="reward-modal-title">
                            Iskoristite loyality program
                        </p>
                        <span className="reward-modal-amounts-title">VAŠE STANJE</span>
                        <div className="reward-modal-amounts">
                            <div className="advancedcash-color">
                                <span>Advanced cash</span>
                                <span className="reward-modal-amount">{this.state.advancedCash} rsd</span>
                            </div>
                            <div className="cashback-color">
                                <span>Cash back</span>
                                <span className="reward-modal-amount">{this.state.cashback} rsd</span>
                            </div>
                        </div>
                        <div className="reward-modal-amounts reward-modal-prices-section">
                            <span>Iznos računa</span>
                            <span className="reward-modal-amount">{this.state.orderPrice} rsd</span>
                        </div>
                        <div className="reward-modal-prices-section reward-modal-prices-nopadding">
                            <span>Umanjite iznos Advanced cash</span>
                            <div className="reward-modal-input-section advancedcash-color">
                                <img src={inputMinusIcon} alt="minus_icon" />
                                <input
                                    className="reward-modal-input advancedcash-color"
                                    pattern="[0-9.]+"
                                    keyboardtype={'numeric'}
                                    type="text"
                                    onBlur={() => this.setState({ minusAdvanced: this.state.minusAdvanced + ',00' })}
                                    onChange={this.onMinusAdvancedCash}
                                    value={this.numberWithCommas(this.state.minusAdvanced)} />
                                <span className="money-unit">rsd</span>
                            </div>
                        </div>
                        <div className="reward-modal-prices-section reward-modal-prices-nopadding">
                            <span>Umanjite iznos Cash back</span>
                            <div className="reward-modal-input-section">
                                <img src={inputMinusIcon} alt="minus_icon" />
                                <input
                                    className="reward-modal-input"
                                    pattern="[0-9.]+"
                                    keyboardtype={'numeric'}
                                    type="text"
                                    onBlur={() => this.setState({ minusCashback: this.state.minusCashback + ',00' })}
                                    onChange={this.onMinusCashback}
                                    value={this.numberWithCommas(this.state.minusCashback)} />
                                    <span className="money-unit">rsd</span>
                            </div>
                        </div>
                        <div className="reward-modal-amounts reward-modal-prices-section">
                            <span className="reward-modal-amount">Novi iznos</span>
                            <span className="reward-modal-amount">{this.inTotalAmount()} rsd</span>
                        </div>
                        <button className="nastavi-placanje reward-modal-button" onClick={this.onPrimeniClick}>PRIMENI</button>
                        <p className="modal-note-text">* na iznos umanjen sredstvima iz Cashback opcije ne dobija se novi Cashback</p>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

export default connect(() => { return {}}, {
    setRewardData
})(RewardModal);
