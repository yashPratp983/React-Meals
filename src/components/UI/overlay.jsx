import Styles from './overlay.module.css'
import OverlayForm from './overlay-form';
import { useEffect, useContext, useState } from 'react';
import { countContext } from '../../App';

const overlay = (props) => {
    const counter = useContext(countContext);

    useEffect(() => {
        localStorage.setItem(1, counter.count.counter1)
        localStorage.setItem(2, counter.count.counter2)
        localStorage.setItem(3, counter.count.counter3)
        localStorage.setItem(4, counter.count.counter4)
    }, [counter.count.counter1, counter.count.counter2, counter.count.counter3, counter.count.counter4])

    const clickHandler = () => {
        props.cartShow();
    }

    const orderHandler = () => {
        console.log("Ordering");
    }

    const plusHandler = (event) => {
        if (event.target.value == 1) {
            counter.dispatch({ type: "count1", operation: '+' })
        }
        else if (event.target.value == 2) {
            counter.dispatch({ type: "count2", operation: '+' })
        }
        else if (event.target.value == 3) {
            counter.dispatch({ type: "count3", operation: '+' })
        }
        else if (event.target.value == 4) {
            counter.dispatch({ type: "count4", operation: '+' })
        }
        props.counter(counter.count.counter1, counter.count.counter2, counter.count.counter3, counter.count.counter4 + 1)
    }

    const minusHandler = (event) => {
        if (event.target.value == 1 && counter.count.counter1 > 0) {
            counter.dispatch({ type: "count1", operation: '-' })
        }
        else if (event.target.value == 2 && counter.count.counter2 > 0) {
            counter.dispatch({ type: "count2", operation: '-' })
        }
        else if (event.target.value == 3 && counter.count.counter3 > 0) {
            counter.dispatch({ type: "count3", operation: '-' })
        }
        else if (event.target.value == 4 && counter.count.counter4 > 0) {
            counter.dispatch({ type: "count4", operation: '-' })
        }
        props.counter(counter.count.counter1, counter.count.counter2, counter.count.counter3, counter.count.counter4 - 1)
    }

    return (
        <div className={Styles.overlay}>
            <OverlayForm amount={counter.count.counter1 * 22.98 + counter.count.counter2 * 16.50 + counter.count.counter3 * 12.99 + counter.count.counter4 * 18.56} counter1={counter.count.counter1counter1} counter2={counter.count.counter1counter2} counter3={counter.count.counter1counter3} counter4={counter.count.counter1counter4} />
            {props.menu.map((item) => {
                if (eval('counter.count.counter' + item.id) > 0) {
                    return (
                        <div key={item.id} className={Styles.items}>
                            <div>
                                <h2>{item.name}</h2>
                            </div>
                            <div>
                                <p >{eval('counter.count.counter' + item.id)}</p>
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