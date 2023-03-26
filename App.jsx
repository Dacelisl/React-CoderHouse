import { NavBar } from "./components/header/NavBar";
import { ItemListContainer } from "./components/ItemListContainer";
import { Cart } from "./components/Cart";
import { Login } from "../src/components/login/Login";
import { BrowserRouter, Route, Routes, } from "react-router-dom";
import { Banner } from "./components/utils/Banner";
import { ItemDetail } from "./components/ItemDetail";
import "./index.css";
import { NotFound } from "./components/404/NotFound";
import { CustomContext } from "./components/context/CustomContext";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <CustomContext>
          <NavBar />
          <Banner />
          <Routes>
            <Route
              path="/"
              element={<ItemListContainer />}
              errorElement={<NotFound />}
            />
            <Route
              path="/categories/:categoryId"
              loader={<NotFound />}
              element={<ItemListContainer />}
            />
            <Route path="/product/:id" element={<ItemDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </CustomContext>
      </BrowserRouter>
    </>
  );
};
