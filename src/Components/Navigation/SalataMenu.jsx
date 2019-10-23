import React, { Component } from 'react';
import OnImagesLoaded from 'react-on-images-loaded';
import { connect } from 'react-redux';
import SalataModal from '../Modals/SalataModal';

import { getSaladaIngredients } from '../../actions/products';
import { removeProduct, clearCurrentProduct } from '../../actions/deliveryOptions';

import '../../assets/styles/Salata.css';
import backgroundImg from '../../assets/Images/salad-background.svg'
import checkMarkIcon from '../../assets/Images/check-mark.png';

function mapStateToProps(state) {
    return {
        getSaladaResponse: state.productsReducer.getSaladaResponse,
        products: state.deliveryOptionsReducer.products,
        currentProduct: state.deliveryOptionsReducer.currentProduct,
    };
}
class SalataMenu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            selectedItem: null, 
            isImagesLoaded: false,
        }
    }

    static getDerivedStateFromProps(nextProps, state) {
        if (nextProps.currentProduct) {
            return {
                showModal: true,
                selectedItem: nextProps.currentProduct,
            }
        } else return { ...state };
    }

    componentDidMount() {
        this.props.getSaladaIngredients();
    }

    showSalataModal = (id) => (e) => {
        const _saladaIgredients = this.props.getSaladaResponse ? this.props.getSaladaResponse.main : [];
        if (this.props.products.find(item => item.productId === id)) {
            this.props.removeProduct(id);
        } else {
            const salada= _saladaIgredients.find(item => item._id === id);
            this.setState({ showModal: true, selectedItem: { ...salada, productId: salada._id}});
        }
    }

    closeModal = () => {
        this.setState({
            showModal: false
        });
        if (this.props.currentProduct) {
            this.props.clearCurrentProduct();
        }
    };

    getSalada = () => {
        const _saladaIgredients = this.props.getSaladaResponse ? this.props.getSaladaResponse.main : "jeki chan"
        if (_saladaIgredients) {
            return (
                <div className="restaurantIngredientsPasalj">
                    <OnImagesLoaded
                        onLoaded={() => {this.setState({isImagesLoaded: true})}}
                        onTimeout={() => {this.setState({isImagesLoaded: true})}}
                        timeout={70000}>
                        <div className={this.state.isImagesLoaded ? "hidden-false row" : "hidden-true"}>
                            {
                                _saladaIgredients.map((product, key) => {
                                    const isProductSelected = this.props.products.some(item => item.productId === product._id);
                                    return (<div className="col-sm-12 col-md-6 product-item" key={product._id}>
                                        <img src={product.image} className="product-img" alt="" onClick={this.showSalataModal(product._id)} />
                                        <p className="text-center product-name">{product.name}</p>
                                        <p className="text-center product-price">{product.price} rsd</p>
                                        {isProductSelected && <img src={checkMarkIcon} alt="" className="check-mark-icon" />}
                                    </div>
                                    )
                                })}
                            <SalataModal
                                props={this.props}
                                modalData={this.state.selectedItem}
                                showModal={this.state.showModal}
                                closeModal={this.closeModal} />
                        </div>
                    </OnImagesLoaded>
                </div>
            )
        }
    }

    render() {
        if (!this.props.getSaladaResponse) return null;
        return (
            <div className="product-head">
                <img className="product-background-img" src={backgroundImg} alt=""/>
                <div className={this.state.isImagesLoaded ? "hidden-false head-menu-banner salad-banner" : "hidden-true"}>
                    <p className="page-title">Dodajate Madre salatu</p>
                    <p className="page-desc">Lorem Ipsum</p>
                </div>
                <div className="container-fluid">
                    <div>
                        {this.getSalada()}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, {
    getSaladaIngredients, removeProduct, clearCurrentProduct
})(SalataMenu);
