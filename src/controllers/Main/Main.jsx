import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {cleanErrors, login} from "actions/auth.action";
import {connect} from "react-redux";
import { Redirect } from "react-router-dom";

import style from './Main.module.css';
import {Aside} from "components/Aside";
import {RightAside} from "components/RightAside";
import {Statistic} from "components/Statistic";

class Main extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        return(
            <div className={style.mainContainer}>
                <h1>Общая статистика</h1>
                <div className={style.gridContainer}>
                    <Aside />
                    <Statistic />
                    <RightAside/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: {...state.auth.user},
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (email, pass) => dispatch(login(email, pass)),
        cleanErrors: () => dispatch(cleanErrors()),
    }
};

export const MainContainer = connect(mapStateToProps, mapDispatchToProps)(Main);