import style from './Modal.module.css';

import React, { Component } from 'react';
import ReactDom from 'react-dom';

const modalRoot = document.getElementById('modal');

export class Modal extends Component {
    constructor(props) {
        super(props);

        this.element = document.createElement('div');
    }

    componentDidMount() {
        modalRoot.appendChild(this.element);
    }

    componentWillUnmount() {
        modalRoot.removeChild(this.element);
    }

    onClose = (event) => {
        const { onClose } = this.props;

        if (event.target.classList.contains('overlay')) {
            onClose();
        }
    };

    renderView = () => {
        const { children } = this.props;
        return (
            <div className={style.overlay} onClick={this.onClose}>
                <div className={style.modal}>
                    <div className={style.header} onClick={this.props.onClose}>
                        <svg className={style.svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
                            <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/>
                        </svg>
                    </div>
                    <div className={style.modalBody}>
                        {children}
                    </div>
                </div>
            </div>
        );
    };

    render() {
        return ReactDom.createPortal(
            this.renderView(),
            this.element,
        );
    }
}