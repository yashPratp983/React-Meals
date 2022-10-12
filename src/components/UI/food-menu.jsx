import { useState, useContext, useEffect } from 'react';
import { countContext } from '../../App';
import Styles from './food-menu.module.css'
const foodMenu = (props) => {
    const counter = useContext(countContext);
    console.log(props.menu)
    useEffect(() => {
        localStorage.setItem(1, counter.count.counter1)
        localStorage.setItem(2, counter.count.counter2)
        localStorage.setItem(3, counter.count.counter3)
        localStorage.setItem(4, counter.count.counter4)
    }, [counter.count.counter1, counter.count.counter2, counter.count.counter3, counter.count.counter4])

    const clickHandler = (event) => {
        console.log(event.target.value)
        if (event.target.value == 1) {
            counter.dispatch({ type: "count1", operation: '+' });
        }
        else if (event.target.value == 2) {
            counter.dispatch({ type: "count2", operation: '+' });
        }
        else if (event.target.value == 3) {
            counter.dispatch({ type: "count3", operation: '+' });
        }
        else if (event.target.value == 4) {
            counter.dispatch({ type: "count4", operation: '+' });
        }
        props.counter(counter.count.counter1 + counter.count.counter2 + counter.count.counter3 + counter.count.counter4 + 1);
    }

    return (
        <div className={Styles.menu}>{props.error ? <h1 className={Styles.loading}>Something went wrong</h1> :
            props.isLoading ? <h1 className={Styles.loading}>Loading...</h1> :
                props.menu.map((item) => {
                    if (item != null) {
                        return (
                            <div className={`${Styles.item} ${item.id === 4 && Styles.disappear} `} key={item.id}>
                                <div>
                                    <h2>{item.name}</h2>
                                    <p>{item.description}</p>
                                    <h1>{item.price}</h1>
                                </div>
                                <div>
                                    <p className={Styles.amt}>{eval('counter.count.counter' + item.id)}</p>
                                    <button className={Styles.button} onClick={clickHandler} value={item.id}>+ Add</button>
                                </div>
                            </div>
                        )
                    }
                })
        }

        </div>
    )
}
export default foodMenu;