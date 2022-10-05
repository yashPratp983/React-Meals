import React, { useContext } from 'react'
import Styles from './cartModal.module.css'
import ReactDOM from 'react-dom';
import Cart from './cart'
import Overlay from './overlay'

const Backdrop = () => {
    return <div className={Styles.backdrop} />;
}

const cartModal = (props) => {
    const ctx = useContext(Cart);
    return (

        <React.Fragment>
            {ctx.openCart ?
                ReactDOM.createPortal(
                    <Backdrop />,
                    document.getElementById('backdrop-root')
                )
                : ''}

            {ctx.openCart ?
                ReactDOM.createPortal(
                    <Overlay cartShow={props.cartShow} menu={props.menu} counter={props.counter} />,
                    document.getElementById('overlay-root')
                )
                : ''}
        </React.Fragment>
    )
}

export default cartModal;