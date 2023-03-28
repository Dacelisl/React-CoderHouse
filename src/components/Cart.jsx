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
        <div className="table w-[80%] absolute left-[10%] overflow-auto">
          <div className="table-header-group h-11 bg-sky-100 ">
            <div className="table-row">
              <div className="table-cell text-center align-middle"></div>
              <div className="table-cell text-center align-middle ">
                PRODUCTO
              </div>
              <div className="table-cell text-center align-middle">
                CANTIDAD
              </div>
              <div className="table-cell text-center align-middle">PRECIO</div>
              <div className="table-cell text-center align-middle pr-2">
                TOTAL
              </div>
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
              <div className="table-cell align-middle text-center">
                <span className="inline-block font-semibold">
                  {detail.units}
                </span>
              </div>
              <div className="table-cell"></div>
              <div className="table-cell align-middle text-center pr-1 p-2">
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
      ) : (
        <>
          <Link to={"/"}>
            <div className="flex sticky left-1/4 w-2/5 overflow-auto">
              <img src={car} alt="empty car " />
            </div>
            <span className="z-20 flex absolute left-1/3 bottom-[10%] text-7xl mt-20 font-extralight">
              Go Home
            </span>
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
