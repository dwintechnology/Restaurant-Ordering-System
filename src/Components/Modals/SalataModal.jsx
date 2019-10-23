import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';

import { getSaladaIngredients } from '../../actions/products';
import { addProduct, removeProduct } from '../../actions/deliveryOptions';
import OnImagesLoaded from 'react-on-images-loaded';

import minusIcon from '../../assets/Images/remove-quantity-icon.svg';
import plusIcon from '../../assets/Images/add-quantity-icon.svg';
import closeIcon from '../../assets/Images/close-modal-btn.svg';
import '../../assets/styles/Products.css';

function mapStateToProps(state) {
    return {
        getSaladaResponse: state.productsReducer.getSaladaResponse,
        products: state.deliveryOptionsReducer.products,
    };
}

class SalataModal extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            show: false,
            salata: null,
            isImagesLoaded: false,
            additionalItems: []
        };
    }

    componentDidMount() {
        this.props.getSaladaIngredients();
    }

    static getDerivedStateFromProps(nextProps, state) {
        if (nextProps.currentProduct && !state.salata) {
            return {
                ...state,
                salata: {
                    ...nextProps.modalData,
                    productId: nextProps.modalData._id,
                    quantity: nextProps.modalData.quantity,
                },
                additionalItems: nextProps.modalData.additionals || []
            }
        }
        if ((!state.salata || state.salata.productId !== nextProps.modalData._id)
            && nextProps.modalData) {
            return {
                ...state,
                salata: {
                    productId: nextProps.modalData._id,
                    quantity: 1,
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
    };

    addSalataToOrder = () => {
        const { name, price, calorie } = this.props.modalData || {};
        const _saladaIgredients = this.props.getSaladaResponse ? this.props.getSaladaResponse.additional : "jeki chan"

        if (this.props.products.some(product => product.productId === this.state.salata.productId)) {
            this.props.removeProduct(this.state.salata.productId);
        }
        this.props.addProduct({
            ...this.state.salata,
            additionals: this.state.additionalItems,
            name,
            price,
            calorie,
        });
        this.state.additionalItems.forEach(item => {
            const ingredient = _saladaIgredients.find(ingredient => ingredient._id === item);
            if (this.props.products.some(product => product.productId === item
                && product.parentId === this.state.salata.productId)) {
                this.props.removeProduct(item, this.state.salata.productId);
            }
            this.props.addProduct({
                productId: item,
                quantity: this.state.salata.quantity,
                name: ingredient.name,
                price: ingredient.price,
                calorie: ingredient.calorie,
                parentId: this.state.salata.productId
            });  
        });
        this.setState({
            show: false,
            salata: null,
            isImagesLoaded: false,
            additionalItems: []
        });
        this.props.closeModal();
    };

    increaseQuantity = () => {
        const { salata } = this.state;
        this.setState({ salata: { ...salata, quantity: ++salata.quantity }});
    };

    decreaseQuantity = () => {
        const { salata } = this.state;
        if (salata.quantity > 1) {
            this.setState({ salata: { ...salata, quantity: --salata.quantity }});
        }
    };

    closeModal = () => {
        this.setState({
            show: false,
            salata: null,
            isImagesLoaded: false,
            additionalItems: []
        });
        this.props.closeModal();
    }

    getSaladaAdditional = () => {
        const _saladaIgredients = this.props.getSaladaResponse ? this.props.getSaladaResponse.additional : "jeki chan"
        return (
            <div className="salada-additonal">
                {
                    _saladaIgredients.map((product, key) => (
                        <OnImagesLoaded
                        key={product._id}
                        onLoaded={() => { this.setState({ isImagesLoaded: true }) }}
                        onTimeout={() => { this.setState({ isImagesLoaded: true }) }}
                        timeout={70000}
                        >
                        <div className={this.state.isImagesLoaded ? "hidden-false salata-addtional-div" : "hidden-true"} key={product._id}>
                            <img src={product.image} className="" alt="" onClick={this.addSalataMenu} />
                            <p className="">Dodaj {product.name}</p>
                            <div className="salata-additional-checkbox-div">
                                <form action="">
                                    <label className="checkbox-container"> 
                                        <input type="checkbox"
                                            onChange={this.onToggleAdditionalItem(product._id)}
                                            defaultChecked={this.state.additionalItems.some(item => item === product._id)} />
                                        <span className="checkmark"></span>
                                    </label>
                                </form>
                            </div>
                        </div>
                        </OnImagesLoaded>
                    ))}
            </div>
        )
    }

    render() {
        const { name, price } = this.props.modalData || {};
        const { salata } = this.state;
        return (
            <Modal
                show={this.props.showModal}
                onHide={this.closeModal}
                className="salata-modal product-modal">
                <Modal.Header>
                    <button className='close-modal-button' onClick={this.closeModal}>
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
                    {this.getSaladaAdditional()}
                    <div className="added-count-div">
                        <label htmlFor="" className="product-modal-price-label">Količina</label>
                        <div>
                            <button className="button-link" onClick={this.decreaseQuantity}>
                                <img src={minusIcon} alt="" className="minus-icon" />
                            </button>
                            <span className="product-count">{salata && salata.quantity}</span>
                            <button className="button-link" onClick={this.increaseQuantity}>
                                <img src={plusIcon} alt="" />
                            </button>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="dodaju-cartu" onClick={this.addSalataToOrder}>DODAJ U KORPU</button>
                </Modal.Footer>
            </Modal >
        );
    }
}

export default connect(mapStateToProps, {
    getSaladaIngredients, addProduct, removeProduct
})(SalataModal);
