import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Sidebar from "react-sidebar";

import Header from './Components/Headers/Header';
import BasketSideBar from './Components/Common/BasketSideBar';
import History from './Components/ProfileInfo/History';
import routes from './routes';

import { setProducts } from './actions/deliveryOptions';

import "../node_modules/react-notifications-component/dist/theme.css";
import "./App.css";

class App extends Component {
    state = {
        isSidebarVisible: false
    }

    toggleSideBar = () => {
        this.setState({ isSidebarVisible: !this.state.isSidebarVisible });
    };

    componentDidMount() {
        window.addEventListener('beforeunload', this.saveProducts, false);
        window.addEventListener('load', this.setProducts, false);
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.saveProducts, false);
        window.removeEventListener('load', this.setProducts, false);
    }

    saveProducts = () => {
        localStorage.setItem('basket_products', JSON.stringify(this.props.products));
    };

    setProducts = () => {
        const products = localStorage.getItem('basket_products');
        console.log(products);
        if (products) {
            this.props.setProducts(JSON.parse(products));
            localStorage.removeItem('basket_products');
        }
    };

    render() {
        return (
            <div className="App">
                <Sidebar
                    sidebar={<BasketSideBar onSidebarClose={this.toggleSideBar} />}
                    pullRight={true}
                    open={this.state.isSidebarVisible}
                    onSetOpen={this.toggleSideBar}
                    sidebarClassName="basket-sidebar"
                    overlayClassName="sidebar-overlay"
                    styles={{ sidebar: { background: "white" } }}>
                    <Header history={this.props.history} toggleSideBar={this.toggleSideBar} />
                    <Switch>
                        {routes.map(route => (
                            <Route
                                key={route.id}
                                path={route.path}
                                component={route.id === 11 ?
                                    (props) => <History {...props} toggleSideBarCallback={this.toggleSideBar} />
                                    : route.component}
                                exact />
                        ))}
                    </Switch>
                </Sidebar>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
      products: state.deliveryOptionsReducer.products,
    };
}

export default connect(mapStateToProps, {
    setProducts
})(App);
// export default connect(mapStateToProps, {})(App);