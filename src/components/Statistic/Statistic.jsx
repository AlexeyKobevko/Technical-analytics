import React, { Component, Fragment } from 'react';

import style from './Statistic.module.css';

import { Employees } from './Employees';
import { Projects } from './Projects';
import { Resources } from './Resources';
import { TechItems } from './TechItems';
import { statisticData } from './statisticData.js';
export class Statistic extends Component {
    render() {
        return(
            <div className={style.statistic}>
                {statisticData.map((data) => 
                    <Fragment>
                        <Employees employees={data.employees} />
                        <Projects projects={data.projects} />
                        <TechItems techItems={data.techItems} />
                        <Resources resources={data.resources} />
                    </Fragment>
                )}
            </div>
        );
    }
};