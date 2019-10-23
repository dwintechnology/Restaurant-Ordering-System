import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { routePaths } from '../../routes';
import { getCards, addAdvancedCash } from '../../actions/myRewards'
import closeIcon from '../../assets/Images/delete-item-icon.svg';

import '../../assets/styles/AdvancedCashModal.css';

class AdvancedCashModal extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            show: true,
            cash: "0,00",
            cards: [],
            body: {},
            cvcNumber: "",
            isCVCConfirmetion: false
        };
    }

    buyRestoranClick = () => {
        this.props.history.push('/restorans');
        this.setState({
            show: false,
        });
    };

    dastavaNaDon = () => {
        this.props.history.push('/');
        this.setState({
            show: false,
        });
    };

    handleClose = () => {
        this.props.closeModal();
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

                        <div className="advanced-card-modal-image">
                            <p className="advanced-card-modal-text">ADVANCED CASH</p>

                        </div>
                        {!this.state.isCVCConfirmetion ?
                            <b className="advanced-card-modal-lebel">Unesite iznos koji želite da uplatite</b>
                            :
                            <b className="advanced-card-modal-lebel">Potvrdi vašu plaćanje</b>
                        }
                        {!this.state.isCVCConfirmetion ?
                            <div style={{ height: 50, display: 'flex', alignItems: 'center' }}>
                                <input
                                    className="advanced-card-input"
                                    keyboardtype={'numeric'}
                                    autoFocus
                                    onFocus={() => {
                                        const a = this.state.cash.split(",")[0];
                                        this.setState({ cash:  a === "0" ? "" : a});
                                    }}
                                    onBlur={() => {
                                        const cash = this.state.cash ? this.state.cash + ",00" : "0,00";               
                                        this.setState({ cash })}}
                                    onChange={e => {
                                        let value = e.target.value;
                                        value = value.replace(".", "");
                                        this.setState({ cash: value });
                                    }}
                                    value={this.numberWithCommas(this.state.cash)}
                                >
                                </input>
                                <b style={{ position: 'absolute', right: 50, color: '#276b5a', fontWeight: 'bold' }}>rsd</b>

                            </div>
                            :
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
                                value={this.state.cvcNumber}
                            >
                            </input>
                        }
                        {!this.state.isCVCConfirmetion && <p className="advanced-card-modal-info">* Minimalan iznos pojedinačne uplate je 1000 rsd</p>}
                        <button disabled ={ this.disableButton()} className="nastavi-placanje" onClick={() => { this.saveCash() }}>NASTAVI PLACANJE</button>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }

    disableButton() {
        if(this.state.isCVCConfirmetion) {
            return Number(this.state.cvcNumber) >= 1000 || Number(this.state.cvcNumber) <= 99;
        } else {
            return this.state.cash.split(",")[0] < 1000;
        }
    }

    numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    saveCash = () => {
        if (this.state.isCVCConfirmetion) {
            this.addAdvancedCash();
            return;
        }
        getCards()
            .then(response => {
                let cards = response.data;
                // this.setState({ cards: response.data, loading: false })
                if (cards.length) {
                    let body = this.state.body;
                    body.price = parseInt(this.state.cash.split(",")[0]);
                    body.card = cards[0]._id;
                    this.setState({ body: body, isCVCConfirmetion: true });
                    this.props.updateLoading(false)
                } else {

                    this.props.history.push(
                        {
                            pathname: routePaths.PLACANJE,
                            cash: this.state.cash
                        })
                    //routePaths.PLACANJE, { cash: this.state.cash });
                }
            })
            .catch((error) => {
                this.props.updateLoading(false)
            })
    }

    addAdvancedCash = () => {
        this.handleClose();
        this.props.updateLoading(true)
        let body = this.state.body;
        body.confirmed_cvc = this.state.cvcNumber;
        this.setState({ body: body })
        addAdvancedCash(body)
            .then(response => {
                this.props.updateAdvancedCash(parseInt(response.data.new_balance));
                this.props.updateLoading(false);
            })
            .catch((error) => {
                this.props.updateLoading(false);
            })
    }
}

export default withRouter(AdvancedCashModal);
