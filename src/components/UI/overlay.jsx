import Styles from './overlay.module.css'
import OverlayForm from './overlay-form';
import { useEffect, useContext, useState } from 'react';
import CartContext from './cartContext';

const overlay = (props) => {
    const contex = useContext(CartContext);

    const clickHandler = () => {
        props.cartShow();
    }

    const plusHandler = (event) => {
        contex.addItem(event.target.value)
    }

    const minusHandler = (event) => {
        contex.removeItem(event.target.value);
    }

    return (
        <div className={Styles.overlay}>
            <OverlayForm amount={contex.totalPrice} cartShow={props.cartShow} />
            {props.menu.map((item) => {
                if (contex.items[item.id] > 0) {
                    return (
                        <div key={item.id} className={Styles.items}>
                            <div>
                                <h2>{item.name}</h2>
                            </div>
                            <div>
                                <p >{contex.items[item.id]}</p>
                                <div className={Styles.itemsButton}>
                                    <button className={Styles.button} value={item.id} onClick={plusHandler}>+</button>
                                    <button className={Styles.button} value={item.id} onClick={minusHandler}>-</button>
                                </div>
                            </div>
                        </div>
                    )
                }
            })}
            <div className={Styles.footerOverlay}>
                <button className={Styles.button} onClick={clickHandler}>Cancel</button>
            </div>
        </div>
    )
}

export default overlay;