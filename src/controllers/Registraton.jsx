import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";

import { RegForm } from "components/RegForm";
import { Loading } from "components/Loading";
import { BtnLoading } from "components/BtnLoading";
import { validator } from "functions/validator";
import { cleanErrors, registration } from 'actions/registration.action'
import { Redirect } from "react-router-dom";

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

    render() {
        const { error, errorText } = this.state;
        const { reg } = this.props;
        const registered = reg.hasOwnProperty('message') && reg.message;

        if (registered) {
            return <Redirect to={'/'} />;
        } else {
            return(
                <RegForm
                    isLoading={reg.loading}
                    isErrors={error || reg.error}
                    errors={errorText}
                    serverError={reg.errorText}
                    handleSubmit={this.handleSubmit} />
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
    }
}

export const RegistrationContainer = connect(mapStateToProps, mapDispatchToProps)(Registration);