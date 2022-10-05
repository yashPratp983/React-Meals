import Styles from './overlay.module.css'
import { useEffect } from 'react';
import { useState } from 'react';

const overlay = (props) => {
    const [counter1, setCounter1] = useState(JSON.parse(localStorage.getItem(1)));
    const [counter2, setCounter2] = useState(JSON.parse(localStorage.getItem(2)));
    const [counter3, setCounter3] = useState(JSON.parse(localStorage.getItem(3)));
    const [counter4, setCounter4] = useState(JSON.parse(localStorage.getItem(4)));


    useEffect(() => {
        localStorage.setItem(1, counter1)
        localStorage.setItem(2, counter2)
        localStorage.setItem(3, counter3)
        localStorage.setItem(4, counter4)
    }, [counter1, counter2, counter3, counter4])

    const clickHandler = () => {
        props.cartShow();
    }

    const orderHandler = () => {
        console.log("Ordering");
    }

    const plusHandler = (event) => {
        if (event.target.value == 1) {
            setCounter1(counter1 + 1);
        }
        else if (event.target.value == 2) {
            setCounter2(counter2 + 1);
        }
        else if (event.target.value == 3) {
            setCounter3(counter3 + 1);
        }
        else if (event.target.value == 4) {
            setCounter4(counter4 + 1);
        }
        props.counter(counter1, counter2, counter3, counter4 + 1)
    }

    const minusHandler = (event) => {
        if (event.target.value == 1 && counter1 > 0) {
            setCounter1(counter1 - 1);
        }
        else if (event.target.value == 2 && counter2 > 0) {
            setCounter2(counter2 - 1);
        }
        else if (event.target.value == 3 && counter3 > 0) {
            setCounter3(counter3 - 1);
        }
        else if (event.target.value == 4 && counter4 > 0) {
            setCounter4(counter4 - 1);
        }
        props.counter(counter1, counter2, counter3, counter4 - 1)
    }

    return (
        <div className={Styles.overlay}>
            {props.menu.map((item) => {
                if (eval('counter' + item.id) > 0) {
                    return (
                        <div key={item.id} className={Styles.items}>
                            <div>
                                <h2>{item.name}</h2>
                            </div>
                            <div>
                                <p >{eval('counter' + item.id)}</p>
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
                <h2>Amount: ${counter1 * 22.98 + counter2 * 16.50 + counter3 * 12.99 + counter4 * 18.56}</h2>
                <button className={Styles.button} onClick={clickHandler}>Cancel</button>
                <button className={Styles.button} onClick={orderHandler}>Order</button>
            </div>
        </div>
    )
}

export default overlay;