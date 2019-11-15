import style from './Aside.module.css';
import logo from '../../images/default_logo.png';

import React from 'react';


export const Aside = () => {

  return (
    <aside className={style.leftAside}>
        <div className={style.logoWrapper}>
            <img src={logo} alt=""/>
        </div>
        <button className={style.btn}>
            Изменить логотип
        </button>
    </aside>
  );
};