import style from './BtnLoading.module.css';

import React from 'react';

export const BtnLoading = () => {
  return (
    <div className={style.loadingWrapper}>
      <div className={style.ldsEllipsis}>
        <div/>
        <div/>
        <div/>
        <div/>
      </div>
    </div>
  );
};