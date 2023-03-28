import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
const NavBar = lazy(() => import("./components/header/NavBar"));
const ItemListContainer = lazy(() => import("./components/ItemListContainer"));
const Cart = lazy(() => import("./components/Cart"));
const Login = lazy(() => import("./components/login/Login"));
const Banner = lazy(() => import("./components/utils/Banner"));
const Spinner = lazy(() => import("./components/utils/spinner/Spinner"));
const ItemDetail = lazy(() => import("./components/ItemDetail"));
const NotFound = lazy(() => import("./components/404/NotFound"));
const CustomContext = lazy(() => import("./components/context/CustomContext"));

export const App = () => {
  console.log('en app');
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<span className="flex relative top-[70] left-1/2 "><Spinner /></span>}>
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
        </Suspense>
      </BrowserRouter>
    </>
  );
};
