import { useState, useContext, useEffect } from 'react';
import CartContext from './cartContext';
import Styles from './food-menu.module.css'
const foodMenu = (props) => {
    const contex = useContext(CartContext);

    const clickHandler = (event) => {
        console.log(event.target.value)
        contex.addItem(event.target.value)
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
                                    <p className={Styles.amt}>{contex.items[item.id]}</p>
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