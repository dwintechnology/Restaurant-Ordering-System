import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import logo from '../../assets/Images/restaurant-header-logo.png';
import '../../assets/styles/Header.css';
import userIcon from '../../assets/Images/user-icon-white.svg';
import loginUserIcon from '../../assets/Images/user-icon.svg';
import bagicon from '../../assets/Images/bag-icon.svg';
import routes from '../../routes';
import { routePaths } from '../../routes';
import { getProfile } from '../../actions/profile';
import rewardIcon from '../../assets/Images/rsd-gift-icon-gold.svg'
import {
  firebaseLogin,
  firebaseSignUp,
  fireBaseLogOut,
  getProfileToken
} from '../../actions/authorization';
import { getRewards } from '../../actions/myRewards';
import ErrorHoc from '../../ErrorHoc';
import Cookies from 'universal-cookie';
import { withRouter } from 'react-router-dom';
import UserInfoHeader from './UserInfoHeader';

function mapStateToProps(state) {
  return {
    profileToken: state.setProfileTokenReducer,
    logoutStatus: state.authorizationReducer,
    products: state.deliveryOptionsReducer.products,
    getRevardsResponse: state.myRevardsReducer.getRevardsResponse
  };
}

class Header extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: "",
      revardsCount: ""
    }
  }

  componentDidMount() {
    this.getProfile();
  }

  getProfile = () => {
    setTimeout(() => {
      getProfile()
      .then(response => {
        this.setState({ name: response.data.username })
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
         // this.getProfile();
        }
      })
    }, 5000);

  }

  logOutButtonClick = () => {
    // this.props.showLoadingScreen()
    this.props.fireBaseLogOut();
    const cookies = new Cookies();
    if (!cookies.get('_profileToken')) {
      this.props.history.push(routePaths.HOME);
      // this.props.hideLoadingScreen()
    }
  }

  render() {
    const cookies = new Cookies();
    const _profileToken = cookies.get('_profileToken');
    const _location = window.location.pathname.indexOf("/profile-info");
    return (
      <div>
        <div className="Header">
            <div className="header-brand" onClick={() => this.props.history.push(routePaths.HOME)}>
              <img
                src={logo}
                className="logo"
                title="System Logo"
                alt="System"
              />
            </div>
            <div className="header-left-part">
              {routes.map(route => (route.hideOnNavbar && (
                <LinkContainer
                  eventkey={route.id}
                  key={route.id}
                  to={route.path}>
                  <button className="button-link" onClick={() => this.props.history.push(route.path)}>
                    {route.title}
                  </button>
                </LinkContainer>
              )))}
            </div>
            <div className="header-right-part">
              {!_profileToken ?
                <div className="header-right-item">
                  {routes.map(route => (route.loginButtonShow && (
                    <LinkContainer
                      to={route.path}
                      key={route.id}>
                        <button type="button" className="login_button">
                          <img
                            src={loginUserIcon}
                            className="user-icon"
                            title="User Icon"
                            alt=""
                          />
                          <span>{route.title}</span>
                        </button>
                    </LinkContainer>
                  )))}
                </div> :
                <div className="header-right-item">
                  <button className="button-link reward-btn" onClick={() => this.props.history.push(routePaths.MY_REWARDS)}>
                    {/* 300 {} */}
                    <img
                      src={rewardIcon}
                      className="reward-icon"
                      title="Bag icon"
                      alt="Icon bag"
                    />
                  </button>
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      <img
                        src={userIcon}
                        className="rsdIcon"
                        title="Rsd icon"
                        alt="Icon Rsd"
                      />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item className="dropdown-name" disabled>{this.state.name}</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item className="dropdown-itm"><div onClick={() => this.props.history.push(routePaths.PROFILEINFO)}>MOJ PROFILE</div></Dropdown.Item>
                      <Dropdown.Item className="dropdown-itm"><div onClick={() => this.props.history.push(routePaths.CREDIT_CARD)}>PLAĆANJE</div></Dropdown.Item>
                      <Dropdown.Item className="dropdown-itm"><div onClick={() => this.props.history.push(routePaths.ORDERS_HISTORY)}>ISTORIJA PORUDŽBINA</div></Dropdown.Item>
                      <Dropdown.Item className="dropdown-itm"><div onClick={() => this.props.history.push(routePaths.MY_REWARDS)}>MOJI POENI</div></Dropdown.Item>
                      <Dropdown.Item className="dropdown-itm"><div onClick={this.logOutButtonClick}>ODJAVI SE</div></Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>}
              <button className="button-link header-right-item" onClick={this.props.toggleSideBar}>
                <img
                  src={bagicon}
                  className="bag-icon"
                  title="Bag icon"
                  alt="Icon bag"
                />
                {!!this.props.products.length && <div className="basket-badge">{this.props.products.length}</div>}
              </button>
            </div>
        </div>
        {0 === _location ?
          <UserInfoHeader props={this.props} /> : ""}
      </div>
    );
  }
}
export default withRouter(connect(mapStateToProps, {
  firebaseLogin, firebaseSignUp, fireBaseLogOut, getProfileToken, getProfile, getRewards
})(ErrorHoc(Header)));