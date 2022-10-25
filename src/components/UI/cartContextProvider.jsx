import CartContext from "./cartContext";
import { useEffect, useReducer } from "react";
const reducer = (menu, action) => {
    let price = {
        1: 22.98,
        2: 16.5,
        3: 12.99,
        4: 18.56
    }
    if (action.type === '+') {
        menu.items[action.id] = menu.items[action.id] + 1;
        menu.totalAmount = menu.totalAmount + 1;
        menu.totalPrice = menu.totalPrice + price[action.id];
        return { ...menu }
    }
    else if (action.type === '-') {
        menu.items[action.id] = menu.items[action.id] - 1;
        menu.totalAmount = menu.totalAmount - 1;
        menu.totalPrice = menu.totalPrice - price[action.id];
        if (menu.totalPrice < 0 || menu.totalAmount === 0) {
            menu.totalPrice = 0;
        }
        return { ...menu }
    }
}
const cart = (props) => {
    let items = {
        1: JSON.parse(localStorage.getItem(1)),
        2: JSON.parse(localStorage.getItem(2)),
        3: JSON.parse(localStorage.getItem(3)),
        4: JSON.parse(localStorage.getItem(4))
    }


    const [menu, dispatch] = useReducer(reducer, { items: items, totalAmount: items['1'] + items['2'] + items['3'] + items['4'], totalPrice: items['1'] * 22.98 + items['2'] * 16.5 + items['3'] * 12.99 + items['4'] * 18.56 })

    const addItem = (id) => {
        dispatch({ id: id, type: '+' })
    }

    const removeItem = (id) => {

        dispatch({ id: id, type: '-' })

    }

    const cartContext = {
        items: menu.items,
        totalAmount: menu.totalAmount,
        totalPrice: menu.totalPrice,
        addItem,
        removeItem,
    }

    useEffect(() => {
        localStorage.setItem(1, menu.items[1])
        localStorage.setItem(2, menu.items[2])
        localStorage.setItem(3, menu.items[3])
        localStorage.setItem(4, menu.items[4])
    }, [menu.items[1], menu.items[2], menu.items[3], menu.items[4]])

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default cart;