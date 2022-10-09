import { useEffect } from 'react';
import { useState } from 'react';
import Styles from './food-menu.module.css'
const foodMenu = (props) => {
    const [counter1, setCounter1] = useState(JSON.parse(localStorage.getItem(1)));
    const [counter2, setCounter2] = useState(JSON.parse(localStorage.getItem(2)));
    const [counter3, setCounter3] = useState(JSON.parse(localStorage.getItem(3)));
    const [counter4, setCounter4] = useState(JSON.parse(localStorage.getItem(4)));
    console.log(props.menu)
    useEffect(() => {
        localStorage.setItem(1, counter1)
        localStorage.setItem(2, counter2)
        localStorage.setItem(3, counter3)
        localStorage.setItem(4, counter4)
    }, [counter1, counter2, counter3, counter4])

    useEffect(() => {
        setCounter1(JSON.parse(localStorage.getItem(1)));
        setCounter2(JSON.parse(localStorage.getItem(2)));
        setCounter3(JSON.parse(localStorage.getItem(3)));
        setCounter4(JSON.parse(localStorage.getItem(4)));
    }, [props.reload])

    const clickHandler = (event) => {
        console.log(event.target.value)
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
        props.counter(counter1 + counter2 + counter3 + counter4 + 1);
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
                                    <p className={Styles.amt}>{eval('counter' + item.id)}</p>
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