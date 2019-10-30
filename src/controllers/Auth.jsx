import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { LoginForm } from "components/LoginForm/LoginForm";
import {cleanErrors, login} from "actions/auth.action";
import { Loading } from "components/Loading";
import { Redirect } from "react-router-dom";
import { validator} from "functions/validator";
//TODO убрать глобальную переменную и сделать валидацию на лету
let timer;

class Auth extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            error: false,
            errorText: '',
        };
    }

  componentWillUnmount() {
      clearTimeout(timer);
  }

  clearErrors = () => {
      timer = setTimeout(() => {
          this.setState({
              error: false,
              errorText: '',
          });
      }, 5000);
  };

  handleSignIn = (...obj) => {
      const { login, cleanErrors } = this.props;

      if (validator.apply(this, [...obj])) {
          login(obj[0].email, obj[0].password);
      }
      this.clearErrors();
      cleanErrors();
  };

  render() {
      const { error, errorText } = this.state;
      const { auth } = this.props;
      const isLoggedIn = auth.user.hasOwnProperty('token');
      if (isLoggedIn) {
          return <Redirect to={'/'} />
      } else {
          return (
              <LoginForm isErrors={error || auth.error}
                         isLoading={auth.loading}
                         errors={errorText}
                         serverError={auth.errorText}
                         handleSignIn={this.handleSignIn}/>
          );
      }
  }
}

function mapStateToProps(state) {
    return {
        auth: {...state.auth},
    }
}

function mapDispatchToProps(dispatch) {
    return {
        login: (email, pass) => dispatch(login(email, pass)),
        cleanErrors: () => dispatch(cleanErrors()),
    }
}

export const AuthContainer = connect(mapStateToProps, mapDispatchToProps)(Auth);