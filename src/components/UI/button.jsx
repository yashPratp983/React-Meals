import React, { useState, useEffect, useRef, useContext } from "react";
import CartIcon from "./cart-icon";
import Styles from './button-icon.module.css'
import CartContext from './cartContext';

const button = (props) => {
    const contex = useContext(CartContext);
    const clickHandler = () => {
        props.showCart();
    }
    return (
        <button className={Styles.button} onClick={clickHandler}>
            <span className={Styles.icon}><CartIcon /></span>
            <span>Cart </span>
            <span className={Styles.badge}>{contex.totalAmount}</span>
        </button>
    )
}

export default button;