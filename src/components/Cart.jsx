import { useContext, lazy } from "react";
import { useNavigate, Link } from "react-router-dom";
import { customContext } from "./context/CustomContext";
import car from "../assets/shopping-venture.jpg";
const CartDetail = lazy(() => import("./CartDetail"));
const ButtonIcon = lazy(() => import("./utils/ButtonIcon"));
const Buy = lazy(() => import("./Buy"));

const Cart = () => {
  const { cart, userLocal, detail, removeProduct, checkOut, setCheckOut } =
    useContext(customContext);
  const navigate = useNavigate();
  return (
    <>
      {cart.length > 0 ? (
        <div >
          <div className="table w-[80%] absolute left-[10%] overflow-auto">
            <div className="table-header-group h-11 bg-sky-100 ">
              <div className="table-row">
                <div className="table-cell text-center align-middle"></div>
                <div className="table-cell text-center align-middle ">PRODUCTO</div>
                <div className="table-cell text-center align-middle">CANTIDAD</div>
                <div className="table-cell text-center align-middle">PRECIO</div>
                <div className="table-cell text-center align-middle pr-2">TOTAL</div>
              </div>
            </div>
            <div className="table-row-group bg-blue-100 mr-4 mt-4 mb-4">
              {cart.map((product) => {
                return (
                  <CartDetail
                    key={product.id}
                    product={product}
                    removeProduct={removeProduct}
                  />
                );
              })}
              <div className="table-row bg-blue-200 mt-7">
                <div className="table-cell"></div>
                <div className="table-cell"></div>
                <div className="table-cell text-center align-middle">
                  <span className="inline-block font-semibold">
                    {detail.units}
                  </span>
                </div>
                <div className="table-cell"></div>
                <div className="table-cell text-center align-middle pr-1 p-2">
                  <span className="inline-block font-extralight text-2xl text-rose-600">
                    $ {detail.price}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-3 flex absolute right-0 text-2xl rounded-lg shadow-lg shadow-slate-600">
              <ButtonIcon
                title={userLocal ? "Purchase" : "Login To Purchase"}
                onClick={() => {
                  userLocal ? setCheckOut(true) : navigate("/login");
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <>
          <Link to={"/"}>
            <div className="relative">
              <div className="absolute left-1/2 top-1/2  -translate-x-1/2 translate-y-[10%] xl:translate-y-[30%]">
                <img src={car} alt="empty car " />
                <span className="absolute  tracking-widest  left-[40%] -top-[10%] my-0 mx-auto font-semibol cursor-pointer text-lg  md:text-2xl  lg:text-4xl xl:text-6xl">
                  Go Home
                </span>
              </div>
            </div>
          </Link>
        </>
      )}
      {checkOut ? (
        <>
          <Buy />
        </>
      ) : (
        <></>
      )}
    </>
  );
};
export default Cart;
