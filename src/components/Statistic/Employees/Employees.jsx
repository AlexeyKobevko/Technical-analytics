import style from './Employees.module.css';

import React, { Component } from 'react';

import { statisticData, enumerate } from '../statisticData.js';

export class Employees extends Component {
    render() {
        const { employees } = this.props;

        const employeesNum = [' сотрудник', ' сотрудника', ' сотрудников'];

        let changedTextAttachment = enumerate(statisticData[0].employees, employeesNum);

        return (
            <div className={style.employeesContainer}>
                <img className={style.employeesLogo} src="src/images/statistic_images/Employees.svg"/>
                <div className={style.employeesNumber}>{employees}{changedTextAttachment}</div>
            </div>
        );
    }
}