import React, { useState, useReducer } from 'react'
import Header from './components/UI/header'
import Menu from './components/UI/food-menu'
import CartModal from './components/UI/cartModa'
import Cart from './components/UI/cart'
import { useEffect } from 'react'
import useApi from './hooks/useApi'
import CartContext from './components/UI/cartContextProvider'

function App() {
  const [cartShow, setCartShow] = useState(false);
  const [tasks, setTasks] = useState([]);

  const { isLoading, error, sendRequest: fetchTasks } = useApi();

  useEffect(() => {
    const transformTasks = (tasksObj) => {
      const loadedTasks = [];

      for (let taskKey = 1; taskKey <= 4; taskKey++) {
        loadedTasks.push({ id: taskKey, description: tasksObj[taskKey].description, name: tasksObj[taskKey].name, price: tasksObj[taskKey].price });
      }
      console.log(tasksObj)

      setTasks(loadedTasks);
    };

    fetchTasks(
      { url: 'https://food-order-app-51714-default-rtdb.firebaseio.com/menu.json' },
      transformTasks
    );
  }, [fetchTasks]);

  const cartShowHandler = () => {
    console.log(cartShow)
    setCartShow(!cartShow);
  }

  return (
    <React.Fragment>
      <CartContext>
        <Cart.Provider value={{
          openCart: cartShow
        }}>
          <CartModal cartShow={cartShowHandler} menu={tasks} />
          <Header cartShow={cartShowHandler} />
          <Menu error={error} isLoading={isLoading} menu={tasks} reload={cartShow} />
        </Cart.Provider>
      </CartContext>
    </React.Fragment>
  )
}

export default App
