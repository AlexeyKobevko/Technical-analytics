import style from './Resources.module.css';

import React, { Component } from 'react';

export class Resources extends Component {
    render() {
        const { resources } = this.props;

        let textAttachment = "% ресурсов задействовано";

        return (
            <div className={style.resourcesContainer}>
                <div className={style.resourcesLogoOuter}><img src="src/images/statistic_images/Resources_Outer.svg"/>
                    <div className={style.resourcesLogoInner}><img src="src/images/statistic_images/Resources_Inner.svg"/></div>
                </div>
                <div className={style.resourcesNumber}>{resources}{textAttachment}</div>
            </div>
        );
    }
}