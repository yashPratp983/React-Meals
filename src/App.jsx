import React, { useState, useReducer } from 'react'
import Header from './components/UI/header'
import Menu from './components/UI/food-menu'
import CartModal from './components/UI/cartModa'
import Cart from './components/UI/cart'
import Qantity from './components/UI/quantity'
import { useEffect } from 'react'
import useApi from './hooks/useApi'
// import { cart } from './components/UI/button'
const reducer = (count, action) => {
  if (action.type === "count1" && action.operation === '+') {
    return { ...count, counter1: count.counter1 + 1 }
  }
  else if (action.type === "count2" && action.operation === '+') {
    return { ...count, counter2: count.counter2 + 1 }
  }
  else if (action.type === "count3" && action.operation === '+') {
    return { ...count, counter3: count.counter3 + 1 }
  }
  else if (action.type === "count4" && action.operation === '+') {
    return { ...count, counter4: count.counter4 + 1 }
  }
  if (action.type === "count1" && action.operation === '-') {
    return { ...count, counter1: count.counter1 - 1 }
  }
  else if (action.type === "count2" && action.operation === '-') {
    return { ...count, counter2: count.counter2 - 1 }
  }
  else if (action.type === "count3" && action.operation === '-') {
    return { ...count, counter3: count.counter3 - 1 }
  }
  else if (action.type === "count4" && action.operation === '-') {
    return { ...count, counter4: count.counter4 - 1 }
  }
}

export const countContext = React.createContext();

function App() {
  const [cartShow, setCartShow] = useState(false);
  const [counter, setCounter] = useState(JSON.parse(localStorage.getItem(1)) + JSON.parse(localStorage.getItem(2)) + JSON.parse(localStorage.getItem(3)) + JSON.parse(localStorage.getItem(4)));
  const [tasks, setTasks] = useState([]);

  const { isLoading, error, sendRequest: fetchTasks } = useApi();
  const [count, dispatch] = useReducer(reducer, { counter1: JSON.parse(localStorage.getItem(1)), counter2: JSON.parse(localStorage.getItem(2)), counter3: JSON.parse(localStorage.getItem(3)), counter4: JSON.parse(localStorage.getItem(4)) })


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
    setCounter(JSON.parse(localStorage.getItem(1)) + JSON.parse(localStorage.getItem(2)) + JSON.parse(localStorage.getItem(3)) + JSON.parse(localStorage.getItem(4)));
    setCartShow(!cartShow);
  }

  const counterHandler = (count) => {
    setCounter(count);
  }

  return (
    <React.Fragment>
      <countContext.Provider value={{ count: count, dispatch: dispatch }}>
        <Qantity.Provider value={
          {
            quantity: counter
          }
        }>
          <Cart.Provider value={{
            openCart: cartShow
          }}>
            <CartModal cartShow={cartShowHandler} menu={tasks} counter={counterHandler} />
            <Header cartShow={cartShowHandler} />
            <Menu error={error} isLoading={isLoading} menu={tasks} reload={cartShow} counter={counterHandler} />
          </Cart.Provider>
        </Qantity.Provider>
      </countContext.Provider>
    </React.Fragment>
  )
}

export default App
