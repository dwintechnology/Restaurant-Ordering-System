import React, { Component } from 'react';
import ErrorModal from './Components/Modals/Error'
import LoadingScreen from 'react-loading-screen'

import LoadingScrenImage from './assets/Images/Loading_gif.gif'

const ErrorHoc = (WrappedComponent) => class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            errorModalMessage: "",
            showErrorModal: false,
        }
    }


    showCustomError = (errorMessage) => {
        this.setState({
            isLoading: false,
            errorModalMessage: errorMessage,
            showErrorModal: true,
        });
    }

    hideLoadingScreen = () => {
        console.log("--------hideLoadingScreen------")
        this.setState({ isLoading: false });
    }

    showLoadingScreen = () => {
        console.log("--------showLoadingScreen------")
        this.setState({ isLoading: true });
    }

    closeErrorModal = () =>
        this.setState({ showErrorModal: false });


    openErrorModal = () => {
        this.setState({ showErrorModal: true });
    }

    setErrorMessage = (message) => {
        if (0 !== message) {
            this.setState({ errorModalMessage: message })
        }
    }

    render() {
        return (
            <div>
                {this.state.isLoading ?
                    <LoadingScreen
                        loading={true}
                        bgColor='#26816d'
                        spinnerColor='#26816d'
                        textColor='#676767'
                        logoSrc={LoadingScrenImage}
                        text='Please wait'
                    >
                    </LoadingScreen> : ""}
                <ErrorModal showModal={this.state.showErrorModal} closeModal={this.closeErrorModal} modalMessage={this.state.errorModalMessage} />
                <WrappedComponent {...this.props}
                    showCustomError={this.showCustomError}
                    hideLoadingScreen={this.hideLoadingScreen}
                    showLoadingScreen={this.showLoadingScreen}
                />
            </div>
        );
    }
}

export default ErrorHoc