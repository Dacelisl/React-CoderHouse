import React, { createContext, useState, useEffect } from "react";

export const customContext = createContext();

export const CustomContext = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [checkOut, setCheckOut] = useState(false);
  const [billing, setBilling] = useState(false);
  const [detail, setDetail] = useState({ units: 0, price: 0 });
  const [userLocal, setUserLocal] = useState("");
  const [user, setUser] = useState({
    userName: "",
    mail: "",
    password: "",
    id: "",
  });

  useEffect(() => {
    const user_local = localStorage.getItem("user_local");
    setUserLocal(user_local ? user_local : "");
    function allInfo() {
      let newInfo = { units: 0, price: 0 };
      cart.forEach((item) => {
        newInfo.units += item.units;
        newInfo.price += item.units * item.price;
      });
      setDetail(newInfo);
    }
    allInfo();
  }, [cart]);

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

  const removeProduct = (id) => {
    const newcart = cart.filter((item) => item.id !== id);
    setCart(newcart);
  };

  const isInCart = (id) => {
    return cart.some((product) => product.id === id);
  };

  const reset = () => {
    setCart([]);
    setBilling(false);
    setCheckOut(false);
    setDetail({ units: 0, price: 0 });
  };

  return (
    <customContext.Provider
      value={{
        addProduct,
        cart,
        detail,
        removeProduct,
        checkOut,
        setCheckOut,
        billing,
        setBilling,
        reset,
        user,
        setUser,
        userLocal,
        setUserLocal,
      }}
    >
      {children}
    </customContext.Provider>
  );
};
