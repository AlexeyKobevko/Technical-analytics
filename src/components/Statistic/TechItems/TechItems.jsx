import style from './TechItems.module.css';

import React, { Component } from 'react';

import { statisticData, enumerate } from '../statisticData.js';

export class TechItems extends Component {
    render() {
        const { techItems } = this.props;

        const techItemsNum = [' единица техники', ' единицы техники', ' единиц техники'];

        let changedTextAttachment = enumerate(statisticData[0].techItems, techItemsNum);

        return (
            <div className={style.techItemsContainer}>
                <div className={style.techItemsLogoOuter}><img src="src/images/statistic_images/TechItems_Outer.svg"/>
                    <div className={style.techItemsLogoInner}><img src="src/images/statistic_images/TechItems_Inner.svg"/></div>
                </div>
                <div className={style.techItemsNumber}>{techItems}{changedTextAttachment}</div>
            </div>
        );
    }
}