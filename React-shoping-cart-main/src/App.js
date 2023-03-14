import React, { useState, useEffect } from "react";
import Amazon from "./components/amazon";
import Navbar from "./components/navbar";
import Cart from "./components/cart";
import ReactGA from 'react-ga';



const App = () => {
  ReactGA.initialize('357974800');
  const [show, setShow] = useState(true);
  const [cart, setCart] = useState([]);

  const handleClick = (item) => {
  if (cart.indexOf(item) !== -1) return;
  setCart([...cart, item]);
  ReactGA.event({
    category: 'Item',
    action: 'Added to cart',
    label: item.name
  });
};


 const handleChange = (item, d) => {
  const ind = cart.indexOf(item);
  const arr = cart;
  arr[ind].amount += d;

  if (arr[ind].amount === 0) arr[ind].amount = 1;
  setCart([...arr]);

  ReactGA.event({
    category: 'Item',
    action: 'Quantity changed',
    label: item.name
  });
};


  return (
    <React.Fragment>
      <Navbar setShow={setShow} size={cart.length} />
      {show ? (
        <Amazon handleClick={handleClick} />
      ) : (
        <Cart cart={cart} setCart={setCart} handleChange={handleChange} />
      )}
    </React.Fragment>
  );
};


export default App;
