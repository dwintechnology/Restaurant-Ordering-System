import React, { Component } from 'react';
import { connect } from 'react-redux';
import ScrollableAnchor, {
    goToAnchor,
    configureAnchors,
    removeHash
} from 'react-scrollable-anchor';
import { withRouter } from 'react-router-dom';
import OnImagesLoaded from 'react-on-images-loaded';
import Basket from '../Common/Basket';
import ReactNotification from "react-notifications-component";
import ErrorHoc from '../../ErrorHoc';

import { routePaths } from '../../routes';
import { addProductNotification, updateProductNotification } from '../../NotificationMessages';
import { getSystemIngredients } from '../../actions/restaurant';

import { clearCurrentProduct, removeProduct } from '../../actions/deliveryOptions';
import { addToCart, clearCart } from '../../actions/cart';

import '../../assets/styles/Header.css';
import '../../assets/styles/Autorization/SystemMenu.css'
import checkMarkIcon from '../../assets/Images/check-mark.png';

const sections = [
    { id: 'baza', label: 'BAZA' },
    { id: 'protein', label: 'PROTEIN' },
    { id: 'salata', label: 'SALATA' },
    { id: 'salsa', label: 'SALSA' },
];

function mapStateToProps(state) {
    return {
        getSystemIngradientsResponse: state.restaurantReducer.getSystemIngradientsResponse,
        currentProduct: state.deliveryOptionsReducer.currentProduct,
        cartItems: state.cartReducer.items,
    };
}


class systemproduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bazaPasulj: [],
            showCart: true,
            isImagesLoaded: false,
            _location: '',
            checkMarkIconShow: false,
        }
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        configureAnchors({ offset: -90, scrollDuration: 800 });
        removeHash();
        this.props.getSystemIngredients();
    }

    showNotification = () => {
        const notification = !this.props.currentProduct ? addProductNotification : updateProductNotification;
        this.notificationDOMRef.current.addNotification(notification);
    };

    onSectionClick(sectionId) {
        this.setState({_location: sectionId});
        goToAnchor(sectionId);
    }

    addSystemToBasket = () => {
        this.showNotification();
        // this.setState({ showCart: false });
        this.props.clearCart();
        // setTimeout(() => {
        //     this.props.history.push(routePaths.HOME);
        // }, 3000);
    };

    renderSectionNav = () => (
        sections.map(el =>
            (<button
                key={el.id}
                className={this.state._location === el.id ? "button-link active" : "button-link"}
                href={`#${el.id}`}
                onClick={() => this.onSectionClick(el.id)}>
                {el.label}
            </button>)));

    addBasketIngredients(cartItems, product) {
        this.setState({
            checkMarkIconShow: true
        })
        this.props.addToCart(cartItems, product);
    }

    getSystemPackages = () => {
        const restaurantIngredientsPackages = this.props.getSystemIngradientsResponse ? this.props.getSystemIngradientsResponse.packages : "chak"
        // console.log("getSystemPackages", this.props)
        if (restaurantIngredientsPackages) {
            return (
                <div className="row restaurant-section restaurantIngredientsPasalj">
                    {
                        restaurantIngredientsPackages.map(product => {
                            const isProductSelected = this.props.cartItems.some(item => item._id === product._id);
                            return (<div className="product" key={product._id}>
                                <img src={product.image} className={`product-img ${isProductSelected ? 'opacity-2' : ''}`} alt=""
                                    onClick={
                                        () => this.addBasketIngredients(this.props.cartItems, product)} />
                                {isProductSelected && <img src={checkMarkIcon} alt="" className="check-mark-icon" />}
                                <p className="restaurant-ingredient-name text-center">{product.name}</p>
                            </div>)
                        })}
                </div>
            )
        }
    }

    getBazaPassulj = () => {
        const restaurantIngredientsPasaljRice = this.props.getSystemIngradientsResponse ? this.props.getSystemIngradientsResponse.rices : "chak"
        const restaurantIngredientsPasaljBeans = this.props.getSystemIngradientsResponse ? this.props.getSystemIngradientsResponse.beans : "chak"
        if (restaurantIngredientsPasaljRice) {
            return (
                <div className="row restaurant-section restaurantIngredientsPasalj">
                    <div className="passlj-rice">
                        {
                            restaurantIngredientsPasaljRice.map(product => {
                                const isProductSelected = this.props.cartItems.some(item => item._id === product._id);
                                return (<div className="product" key={product._id}>
                                    <img src={product.image} className={`product-img ${isProductSelected ? 'opacity-2' : ''}`} alt=""
                                        onClick={
                                            () => this.props.addToCart(this.props.cartItems, product)} />
                                    {isProductSelected && <img src={checkMarkIcon} alt="" className="check-mark-icon" />}
                                    <p className="restaurant-ingredient-name text-center">{product.name}</p>
                                </div>)
                        })}
                    </div>
                    <div className="passlj-beans">
                        {
                            restaurantIngredientsPasaljBeans.map(product => {
                                const isProductSelected = this.props.cartItems.some(item => item._id === product._id);
                                return (<div className="product" key={product._id}>
                                    <img src={product.image} alt="" className={`product-img ${isProductSelected ? 'opacity-2' : ''}`} onClick={() => this.props.addToCart(this.props.cartItems, product)} />
                                    {isProductSelected && <img src={checkMarkIcon} alt="" className="check-mark-icon" />}
                                    <p className="restaurant-ingredient-name text-center">{product.name}</p>
                                </div>)
                        })}
                    </div>
                </div>
            )
        }
    }

    getSystemProtein = () => {
        const restaurantProtein = this.props.getSystemIngradientsResponse ? this.props.getSystemIngradientsResponse.proteins : "chak"
        if (restaurantProtein) {
            if (!this.state.bazaPasulj) {
                this.setState({
                    bazaPasulj: restaurantProtein
                })
            }
            return (
                <div className="row restaurant-section restaurantIngredientsPasalj">
                    {
                        restaurantProtein.map(product => {
                            const isProductSelected = this.props.cartItems.some(item => item._id === product._id);
                            return (<div className="product" key={product._id}>
                                <img src={product.image} className={`product-img ${isProductSelected ? 'opacity-2' : ''}`} alt=""
                                    onClick={() => this.props.addToCart(this.props.cartItems, product)} />
                                {isProductSelected && <img src={checkMarkIcon} alt="" className="check-mark-icon" />}
                                <p className="restaurant-ingredient-name text-center">{product.name}</p>
                            </div>
                        )})
                    }
                </div>
            )
        }
    }

    getSystemSalata = () => {
        const restaurantSalata = this.props.getSystemIngradientsResponse ? this.props.getSystemIngradientsResponse.salads : "chak"
        //console.log("restaurantSalata", restaurantSalata)
        if (restaurantSalata) {
            //console.log("OK")
            if (!this.state.bazaPasulj) {
                this.setState({
                    bazaPasulj: restaurantSalata
                })
            }
            return (
                <div className="row restaurant-section restaurantIngredientsPasalj salada-menu-header">
                    {
                        restaurantSalata.map(product => {
                            const isProductSelected = this.props.cartItems.some(item => item._id === product._id);
                            return (<div className="product" key={product._id}>
                                <img src={product.image} className={`product-img ${isProductSelected ? 'opacity-2' : ''}`} alt=""
                                    onClick={() => this.props.addToCart(this.props.cartItems, product)} />
                                {isProductSelected && <img src={checkMarkIcon} alt="" className="check-mark-icon" />}
                                <p className="restaurant-ingredient-name text-center">{product.name}</p>
                            </div>
                        )})
                    }
                </div>
            )
        }
    }

    getSystemSalsa = () => {
        const restaurantSalalsa = this.props.getSystemIngradientsResponse ? this.props.getSystemIngradientsResponse.salsas : "chak"
        //console.log("restaurantSalata", restaurantSalalsa)
        if (restaurantSalalsa) {
            //console.log("OK")
            if (!this.state.bazaPasulj) {
                this.setState({
                    bazaPasulj: restaurantSalalsa
                })
            }
            return (
                <div className="row restaurant-section restaurantIngredientsPasalj">
                    {
                        restaurantSalalsa.map(product => {
                            const isProductSelected = this.props.cartItems.some(item => item._id === product._id);
                            return (<div className="product" key={product._id}>
                                <img src={product.image} className={`product-img ${isProductSelected ? 'opacity-2' : ''}`} alt="" onClick={() => this.props.addToCart(this.props.cartItems, product)} />
                                {isProductSelected && <img src={checkMarkIcon} alt="" className="check-mark-icon" />}
                                <p className="restaurant-ingredient-name text-center">{product.name}</p>
                            </div>)
                        })}
                </div>
            )
        }
    }

    renderProductSection = () => {
        return (
            <div className="restaurant-section-head">
                <div className="restaurant-product-section">
                    <OnImagesLoaded
                        onLoaded={() => { this.setState({ isImagesLoaded: true }) }}
                        onTimeout={() => { this.setState({ isImagesLoaded: true }) }}
                        timeout={70000}
                    >
                        <div className={this.state.isImagesLoaded ? "hidden-false" : "hidden-true"}>
                            <h2>Domaća tortilja ili činija</h2>
                            <p>Lorem ipsum.</p>
                            <div className="">
                                {this.getSystemPackages()}
                            </div>
                            <ScrollableAnchor id="baza">
                                <div className="restaurant-ingredient-section" id="baza">
                                    <h2>Dodajte bazu-pirinnači i pasulj (2/2)</h2>
                                    <p>Lorem ipsum.</p>
                                    {this.getBazaPassulj()}
                                </div>
                            </ScrollableAnchor>
                            <ScrollableAnchor id="protein">
                                <div className="restaurant-ingredient-section" id="protein">
                                    <h2>Sada dodajete protein - meso ili povrće (1/1)</h2>
                                    <p>Lorem ipsum.</p>
                                    {this.getSystemProtein()}
                                </div>
                            </ScrollableAnchor>
                            <ScrollableAnchor id="salata">
                                <div className="restaurant-ingredient-section" id="salata">
                                    <h2>Možete ubaciti salata koliko volite</h2>
                                    <p>Lorem ipsum.</p>
                                    {this.getSystemSalata()}
                                </div>
                            </ScrollableAnchor>
                            <ScrollableAnchor id="salsa">
                                <div className="restaurant-ingredient-section" id="salsa">
                                    <h2>A za kraj - ukusna salsa</h2>
                                    <p>Lorem ipsum.</p>
                                    {this.getSystemSalsa()}
                                </div>
                            </ScrollableAnchor>
                        </div>
                    </OnImagesLoaded>
                    {this.state.showCart && <div className="basketSection">
                        <Basket cartItems={this.props.cartItems} onSystemCreateCallback={this.addSystemToBasket} />
                    </div>}
                </div>
            </div>
        );
    };

    render() {
        if (!this.props.getSystemIngradientsResponse) return null;
        console.log(this.props.cartItems);
        return (<>
            <ReactNotification isMobile="true" ref={this.notificationDOMRef} />
            <div className="section-with-tabs restaurant-header">
                {/* <ReactNotification isMobile="true" ref={this.notificationDOMRef} /> */}
                <div className="header-tabs header-left-part">
                    {/* <div className="header-tab" defaultActiveKey={`#${'baza'}`}> */}
                        {this.renderSectionNav()}
                    {/* </div> */}
                </div>
                {this.renderProductSection()}
            </div>
        </>);
    }
}

export default withRouter(connect(mapStateToProps, {
    getSystemIngredients, addToCart, clearCart, removeProduct
})(ErrorHoc(systemproduct)));
