import React, { createContext, useState, useEffect } from "react";

export const customContext = createContext();

export const CustomContext = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [detail, setDetail] = useState({ units: 0, price: 0 });

  const addProduct = (product, count) => {
    if (isInCart(product.id)) {
      const filter = cart.filter((item) => item.id === product.id);
      setCart([
        ...cart.filter((item) => item.id !== product.id),
        { ...product, units: filter[0].units + count },
      ]);
    } else {
      setCart([...cart, { ...product, units: count }]);
    }
  };
  useEffect(() => {
    const allInfo = () => {
      let newInfo = { units: 0, price: 0 };
      const info = cart.map((item) => {
        newInfo.units += item.units;
        newInfo.price += item.units * item.price;
        return newInfo;
      });
      setDetail(info);
    };
    allInfo();
  }, [cart]);

  const removeProduct = (id) => {
    const newcart = cart.filter((item) => item.id !== id);
    setCart(newcart);
  };

  const isInCart = (id) => {
    return cart.some((product) => product.id === id);
  };
  return (
    <customContext.Provider value={{ addProduct, cart, detail, removeProduct }}>
      {children}
    </customContext.Provider>
  );
};
