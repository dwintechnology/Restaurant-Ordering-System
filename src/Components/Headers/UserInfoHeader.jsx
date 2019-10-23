import React, { Component } from 'react';
import '../../assets/styles/Header.css';
import { routePaths } from '../../routes'
import { withRouter } from 'react-router-dom';

class UserInfoHeader extends Component {

    render() {
        const _location = this.props.props.location.pathname;
        return (
            <div className="profile-page-tabs section-with-tabs">
                <div className="header-tabs header-left-part">
                    <button onClick={() => this.props.history.push(routePaths.PROFILEINFO)} className={routePaths.PROFILEINFO === _location ? "active button-link" : "button-link"}>MOJ PROFIL</button>
                    <button onClick={() => this.props.history.push(routePaths.ADDRESS)} className={routePaths.ADDRESS === _location ? "active button-link" : "button-link"} >MOJE ADRESE</button>
                    <button onClick={() => this.props.history.push(routePaths.PLACANJE)} className={routePaths.PLACANJE === _location ? "active button-link" : "button-link"}>PLAĆANJE</button>
                    <button onClick={() => this.props.history.push(routePaths.HISTORY)} className={routePaths.HISTORY === _location ? "active button-link" : "button-link"}>ISTORIJA PORUDŽBINA</button>
                    <button onClick={() => this.props.history.push(routePaths.MY_REWARDS)} className={routePaths.MY_REWARDS === _location ? "active button-link" : "button-link"}>MOJI POENI</button>
                </div>
            </div>
        );
    }
}

export default withRouter(UserInfoHeader);