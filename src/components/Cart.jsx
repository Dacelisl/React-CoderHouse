import React, { useContext } from "react";
import { customContext } from "./context/CustomContext";
import { Link } from "react-router-dom";
import car from "../img/shopping-venture.jpg";
import { CartDetail } from "./CartDetail";

export const Cart = () => {
  const { cart, detail, removeProduct } = useContext(customContext);
  
  return (
    <>
      {cart.length > 0 ? (
        <div className="table w-11/12 ml-10 mr-4 mt-20 mb-4">
          <div className="table-header-group h-11 ">
            <div className="table-row">
              <div className="table-cell text-center "></div>
              <div className="table-cell text-center ">PRODUCTO</div>
              <div className="table-cell text-left">CANTIDAD</div>
              <div className="table-cell text-left">PRECIO</div>
              <div className="table-cell text-left">TOTAL</div>
            </div>
          </div>
          <div className="table-row-group bg-blue-100 mr-4 mt-4 mb-4">
            {cart.map((product) => {
              return <CartDetail key={product.id} product={product} removeProduct={removeProduct}/>;
            })}
            <div className="table-row bg-blue-200 mt-7">
              <div className="table-cell"></div>
              <div className="table-cell"></div>
              <div className="table-cell align-middle">
                <span className="inline-block font-semibold">
                  {detail[0].units}
                </span>
              </div>
              <div className="table-cell"></div>
              <div className="table-cell align-middle">
                <span className="inline-block font-extralight text-2xl text-rose-600">
                  $ {detail[0].price}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <Link to={"/"}>
            <div className="flex relative left-1/4 w-2/5">
              <img src={car} alt="empty car " />
            </div>
            <span className="z-20 flex absolute left-1/3 bottom-1/2 top-3/4 text-7xl mt-20 font-extralight ">
              Go Home
            </span>
          </Link>
        </>
      )}
    </>
  );
};
