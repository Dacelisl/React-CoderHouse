import { NavBar } from "./components/header/NavBar";
import { ItemListContainer } from "./components/ItemListContainer";
import { Cart } from "./components/Cart";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Banner } from "./components/Banner";
import { ItemDetail } from "./components/ItemDetail";
import "./style.css";

export const App = () => {
  const greeting = "Ofertas Imperdibles";
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Banner greeting={greeting} />
        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          <Route
            path="/categories/:categoryId"
            element={<ItemListContainer />}
          />
          <Route path="/product/:id" element={<ItemDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
