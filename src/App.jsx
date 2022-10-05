import React, { useState } from 'react'
import Header from './components/UI/header'
import Menu from './components/UI/food-menu'
import CartModal from './components/UI/cartModa'
import Cart from './components/UI/cart'
import Qantity from './components/UI/quantity'
import { useEffect } from 'react'
// import { cart } from './components/UI/button'
function App() {
  const [cartShow, setCartShow] = useState(false);
  const [counter, setCounter] = useState(JSON.parse(localStorage.getItem(1)) + JSON.parse(localStorage.getItem(2)) + JSON.parse(localStorage.getItem(3)) + JSON.parse(localStorage.getItem(4)));
  const menu = [{
    id: 1,
    name: 'Sushi',
    price: '$22.98',
    description: 'finnest fish and veggies',
    quantity: JSON.parse(localStorage.getItem(1)),
  }, {
    id: 2,
    name: 'Schnitzel',
    price: '$16.50',
    description: 'A german speciality',
    quantity: JSON.parse(localStorage.getItem(2)),
  }, {
    id: 3,
    name: 'Barbecue Burger',
    price: '$12.99',
    description: 'American raw and meaty',
    quantity: JSON.parse(localStorage.getItem(3)),
  }, {
    id: 4,
    name: 'Green Bowl',
    price: '$18.56',
    description: 'Healthy...green..',
    quantity: JSON.parse(localStorage.getItem(4)),
  }]

  const cartShowHandler = () => {
    console.log(cartShow)
    setCounter(JSON.parse(localStorage.getItem(1)) + JSON.parse(localStorage.getItem(2)) + JSON.parse(localStorage.getItem(3)) + JSON.parse(localStorage.getItem(4)));
    setCartShow(!cartShow);
  }

  const counterHandler = (count) => {
    setCounter(count);
  }

  return (
    <React.Fragment>
      <Qantity.Provider value={
        {
          quantity: counter
        }
      }>
        <Cart.Provider value={{
          openCart: cartShow
        }}>
          <CartModal cartShow={cartShowHandler} menu={menu} counter={counterHandler} />
          <Header cartShow={cartShowHandler} />
          <Menu menu={menu} reload={cartShow} counter={counterHandler} />
        </Cart.Provider>
      </Qantity.Provider>
    </React.Fragment>
  )
}

export default App
