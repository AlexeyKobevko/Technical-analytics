import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { RegForm } from "components/RegForm";
import { validator } from "functions/validator";
import { cleanErrors, cleanMessage, registration } from 'actions/registration.action'
import { Modal } from "components/Modal";

let timer;

class Registration extends Component {
    state = {
        error: false,
        errorText: '',
    };

    componentWillUnmount() {
        clearTimeout(timer);
    }

    clearErrors = () => {
        timer = setTimeout(() => {
            this.setState({
                error: false,
                errorText: '',
            });
        }, 3000);
    };

    handleSubmit = (...args) => {
        const { registration } = this.props;

        if (validator.apply(this, [...args])) {
            registration(...args);
        }

        if (!this.state.error) {
            this.clearErrors();
        }
        if (this.props.reg.error) {
            this.props.cleanErrors();
        }
    };

    handleModalClose = () => {
        this.props.cleanOutMessage();
    };

    render() {
        const { error, errorText } = this.state;
        const { reg } = this.props;
        // const registered = reg.hasOwnProperty('message') && reg.message;

        if (reg.isRegistered) {
            return <Redirect to={'/'} />;
        } else {
            return(
                <Fragment>
                    <RegForm
                        isLoading={reg.loading}
                        isErrors={error || reg.error}
                        errors={errorText}
                        serverError={reg.errorText}
                        handleSubmit={this.handleSubmit} />
                    {reg.message &&
                    <Modal onClose={this.handleModalClose}>
                        <p>{reg.message}</p>
                    </Modal>}
                </Fragment>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        reg: {...state.registration},
    }
}

function mapDispatchToProps(dispatch) {
    return {
        registration: (...obj) => dispatch(registration(...obj)),
        cleanErrors: () => dispatch(cleanErrors()),
        cleanOutMessage: () => dispatch(cleanMessage()),
    }
}

export const RegistrationContainer = connect(mapStateToProps, mapDispatchToProps)(Registration);