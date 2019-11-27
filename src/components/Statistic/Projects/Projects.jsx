import style from './Projects.module.css';

import React, { Component } from 'react';

import { statisticData, enumerate } from '../statisticData.js';

export class Projects extends Component {
    render() {
        const { projects } = this.props;

        const projectsNum = [' проект в работе', ' проекта в работе', ' проектов в работе'];

        let changedTextAttachment = enumerate(statisticData[0].projects, projectsNum);

        return (
            <div className={style.projectsContainer}>
                <img className={style.projectsLogo} src="src/images/statistic_images/Projects.svg"/>
                <div className={style.projectsNumber}>{projects}{changedTextAttachment}</div>
            </div>
        );
    }
}

