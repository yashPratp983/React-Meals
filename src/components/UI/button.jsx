import React, { useState, useEffect, useRef, useContext } from "react";
import CartIcon from "./cart-icon";
import Styles from './button-icon.module.css'
import Quantity from './quantity'




const button = (props) => {
    const ctx = useContext(Quantity);

    const clickHandler = () => {
        props.showCart();
    }
    return (

        <button className={Styles.button} onClick={clickHandler}>
            <span className={Styles.icon}><CartIcon /></span>
            <span>Cart </span>
            <span className={Styles.badge}>{ctx.quantity}</span>
        </button>
    )
}

export default button;