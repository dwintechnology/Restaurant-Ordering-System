import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { getKesadiljaIngredients } from '../../actions/products';
import { addProduct } from '../../actions/deliveryOptions';
import minusIcon from '../../assets/Images/remove-quantity-icon.svg';
import plusIcon from '../../assets/Images/add-quantity-icon.svg';
import closeIcon from '../../assets/Images/close-modal-btn.svg';
import "../../assets/styles/Products.css"

function mapStateToProps(state) {
    return {
        getDesertResponse: state.productsReducer.getDesertResponse,
        products: state.deliveryOptionsReducer.products,
    };
}

class ChurrosModal extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            show: false,
            churros: null,
            additionalItems: []
        };
    }

    static getDerivedStateFromProps(nextProps, state) {
        if (!state.churros && nextProps.modalData) {
            return {
                ...state,
                churros: {
                    productId: nextProps.modalData._id,
                    quantity: 1
                }
            }
        }
        return state;
    }

    onToggleAdditionalItem = (id) => (e) => {
        if (e.target.checked) {
            this.setState({
                additionalItems: [
                    ...this.state.additionalItems,
                    id
                ]
            })
        } else {
            const index = this.state.additionalItems.findIndex(itemId => itemId === id);
            this.setState({
                additionalItems: this.state.additionalItems.slice(index, 1)
            });
        }
    }

    getKessadiljaAdditional = () => {
        const _getchurros = this.props.getDesertResponse ? this.props.getDesertResponse.additional : "jeki chan"
        return (
            <div className="salada-additonal">
                {
                    _getchurros.map((product, key) => (
                        <div className="salata-addtional-div" key={product._id}>
                            <img src={product.image} className="" alt="" onClick={this.addKessadiljaMenu} />
                            <p className="">Dodaj {product.name}</p>
                            <div className="salata-additional-checkbox-div">
                                <form action="">
                                    <label className="checkbox-container">
                                        <input type="checkbox" onChange={this.onToggleAdditionalItem(product._id)} />
                                        <span className="checkmark"></span>
                                    </label>
                                </form>
                            </div>
                        </div>
                    ))}
            </div>
        )
    }

    addKessadiljaToOrder = () => {
        const { name, price, calorie } = this.props.modalData || {};
        this.props.addProduct({
            ...this.state.churros,
            additionals: this.state.additionalItems,
            name,
            price,
            calorie,
        });
        this.state.additionalItems.forEach(item => {
            this.props.addProduct({
                productId: item,
                quantity: this.state.churros.quantity,
                name,
                price: item.price,
                calorie: item.calorie
            });
        });
        this.props.closeModal();
    };

    increaseQuantity = () => {
        const { churros } = this.state;
        this.setState({ churros: { ...churros, quantity: ++churros.quantity } });
    };

    decreaseQuantity = () => {
        const { churros } = this.state;
        if (churros.quantity > 1) {
            this.setState({ churros: { ...churros, quantity: --churros.quantity } });
        }
    };

    render() {
        const { name, price } = this.props.modalData || {};
        const { churros } = this.state;
        return (
            <Modal
                show={this.props.showModal}
                onHide={this.props.closeModal}
                className="churros-modal product-modal">
                <Modal.Header>
                    <button className='close-modal-button' onClick={this.props.closeModal}>
                        <img src={closeIcon} alt="" />
                    </button>
                    <Modal.Title>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="product-money-section">
                        <p className="modal-product-name">{name}</p>
                        <p className="modal-product-price">{price} rsd</p>
                    </div>
                    {this.getKessadiljaAdditional()}
                    <div className="added-count-div">
                        <label htmlFor="" className="product-modal-price-label">Količina</label>
                        <div>
                            <button className="button-link" onClick={this.decreaseQuantity}>
                                <img src={minusIcon} alt="" className="minus-icon" />
                            </button>
                            <span className="product-count">{churros && churros.quantity}</span>
                            <button className="button-link" onClick={this.increaseQuantity}>
                                <img src={plusIcon} alt="" />
                            </button>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="dodaju-cartu" onClick={this.addKessadiljaToOrder}>DODAJ U KORPU</button>
                </Modal.Footer>
            </Modal >
        );
    }
}

export default connect(mapStateToProps, {
    getKesadiljaIngredients, addProduct
})(ChurrosModal);
