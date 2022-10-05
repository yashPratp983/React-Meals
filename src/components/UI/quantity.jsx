import React from "react";
const quantity = React.createContext({
    quantity: JSON.parse(localStorage.getItem(1)) + JSON.parse(localStorage.getItem(2)) + JSON.parse(localStorage.getItem(3)) + JSON.parse(localStorage.getItem(4))
});

export default quantity;