import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import OnImagesLoaded from 'react-on-images-loaded';
import { getMenu } from '../actions/products';
import '../assets/styles/Home.css';
import arrow from '../assets/Images/open-arrow-btn@3x.png';
import { routePaths } from '../routes';
import ErrorHoc from '../ErrorHoc';

function mapStateToProps(state) {
    return {
        getMenuItemsResponse: state.productsReducer.getMenuItemsResponse,
    };
}

class MainSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isImagesLoaded: false,
        }
    }
    async componentDidMount() {
        await this.props.getMenu();
    }

    routMenuSection = (type) => {
        switch (type) {
            case 'system':
                return this.props.history.push(routePaths.System);
            case 'kesadilja':
                return this.props.history.push(routePaths.KESADILJA)
            case 'salad':
                return this.props.history.push(routePaths.SALATA)
            default:
                return this.props.history.push(routePaths.HOME);
        }

    }

    getMenuItems = () => {
        const _getMenuItems = this.props.getMenuItemsResponse ? this.props.getMenuItemsResponse : "Not Response"
        if (_getMenuItems) {
            return (
                <div className="menu-items-container">
                    <OnImagesLoaded
                        onLoaded={() => { this.setState({ isImagesLoaded: true }) }}
                        onTimeout={() => { this.setState({ isImagesLoaded: true }) }}
                        timeout={70000}
                    >
                    <div className={this.state.isImagesLoaded ? "hidden-false menu-items-section" : "hidden-true"}>
                        {
                            _getMenuItems.map(product => (
                                    <div className="card menu-item" key={product._id}>
                                        <div className="card-image">
                                            <button onClick={() => this.routMenuSection(product.type)} className="order-button login_button">PORUČI ODMAH</button>
                                            <img src={product.image} className="card-img-top" alt="" />
                                        </div>
                                        <div className="card-body">
                                            <h2 className="card-title">{product.name}</h2>
                                            <p className="card-text">od {product.min_price}rsd</p>
                                        </div>
                                    </div>
                            ))}
                    </div>
                </OnImagesLoaded>
                </div>
            )
        }
    }

    render() {
        if (!this.props.getMenuItemsResponse) return null;
        return (
            <div className="home-container">
                <div className="jumbotron-fluid  d-flex  align-items-center">
                    <div className="container-fluid">
                        <div className="row ">
                            <div className="col text-center">
                                <p className="home-banner-title">Poruči svoj obrok</p>
                                <p className="home-banner-desc">PREKO 300 HRANLJIVIH KOMBINACIJA KOJE SAMI BIRATE</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="arrow">
                    <img src={arrow} alt="arrow_img" />
                </div>
                <div className="container-fluid carts-container">
                    <div className="row">
                        {this.getMenuItems()}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, {
    getMenu
})(ErrorHoc(MainSection)))

